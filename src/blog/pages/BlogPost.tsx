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
        const fetchPost = async () => {
            if (id) {
                const foundPost = await getPostById(id);
                if (foundPost) {
                    setPost(foundPost);
                }
            }
        };
        fetchPost();
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

            <header className="mb-12">
                {post.imageUrl ? (
                    <div className="relative h-[40vh] md:h-[50vh] w-full rounded-2xl overflow-hidden mb-8 shadow-2xl group">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                            <h1 className="text-3xl md:text-6xl font-bold font-serif text-foreground mb-6 leading-tight max-w-4xl">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                <span className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm text-foreground">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </span>
                                <span className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm text-foreground">
                                    <User className="w-4 h-4 text-primary" />
                                    {post.author}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 pt-8 pb-12 border-b border-border">
                        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                            </span>
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                {post.author}
                            </span>
                        </div>
                    </div>
                )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
