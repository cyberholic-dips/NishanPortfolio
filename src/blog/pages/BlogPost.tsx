import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../storage';
import type { BlogPost } from '../types';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // We might need to install this, but let's try rendering raw or simple implementation first if lib not available. 
// Actually, user said NO backend, but frontend libraries are fine. React Markdown is standard.
// If not installed, I should probably handle plain text or simple HTML.
// Let's assume for now we render simple text or dangerouslySetInnerHTML if we trust the admin (myself/user).
// Given requirements "Blog posts should be created from an admin panel", likely means rich text or markdown.
// I'll stick to simple whitespace pre-wrap for now to avoid extra dependencies unless requested.

export default function BlogPostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (id) {
            const foundPost = getPostById(id);
            if (foundPost) {
                setPost(foundPost);
            }
        }
    }, [id]);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                <Link to="/blog" className="text-primary hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>

            <header className="mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold font-serif">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                    </span>
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
