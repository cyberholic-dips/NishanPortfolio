import type { BlogPost } from './types';

const STORAGE_KEY = 'nishan_blog_posts';

export const getPosts = (): BlogPost[] => {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id: string): BlogPost | undefined => {
    const posts = getPosts();
    return posts.find((post) => post.id === id);
};

export const savePost = (post: BlogPost): void => {
    const posts = getPosts();
    const index = posts.findIndex((p) => p.id === post.id);

    if (index >= 0) {
        posts[index] = post;
    } else {
        posts.unshift(post); // Add new posts to the beginning
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deletePost = (id: string): void => {
    const posts = getPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
};

// Seed initial data if empty
export const seedInitialData = () => {
    if (getPosts().length === 0) {
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
        savePost(initialPost);
    }
}
