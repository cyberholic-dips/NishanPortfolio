import type { BlogPost } from './types';
import { supabase } from '../lib/supabase';

export const getPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return data as BlogPost[];
};

export const getPostById = async (id: string): Promise<BlogPost | undefined> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post by id:', error);
        return undefined;
    }
    return data as BlogPost;
};

export const savePost = async (post: BlogPost): Promise<void> => {
    const { error } = await supabase
        .from('posts')
        .upsert(post);

    if (error) {
        console.error('Error saving post:', error);
        throw error;
    }
};

export const deletePost = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export interface DailyQuote {
    text: string;
    author: string;
}

export const getQuote = async (): Promise<DailyQuote> => {
    const { data, error } = await supabase
        .from('quotes')
        .select('text, author')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        // Only log if it's not a "no rows found" error
        if (error.code !== 'PGRST116') {
            console.error('Error fetching quote:', error);
        }
        return { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" };
    }
    return data as DailyQuote;
};

export const saveQuote = async (quote: DailyQuote): Promise<void> => {
    const { error } = await supabase
        .from('quotes')
        .insert(quote); // We insert a new record for every quote change to keep history, but getQuote fetches the latest

    if (error) {
        console.error('Error saving quote:', error);
        throw error;
    }
};

// Seed initial data if empty
export const seedInitialData = async () => {
    const posts = await getPosts();
    if (posts.length === 0) {
        const initialPost: BlogPost = {
            id: 'welcome-to-my-blog',
            title: 'Welcome to My Blog',
            content: `
# Welcome!

This is the first post on my new blog. I'll be sharing updates about my projects, thoughts on engineering, and more.

Stay tuned!
            `,
            author: 'Nishan Parajuli',
            date: new Date().toISOString(),
            excerpt: 'Introduction to my new blog section.',
            tags: ['General', 'Update']
        };
        await savePost(initialPost);
    }
}
