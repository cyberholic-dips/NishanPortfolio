import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { getPosts, seedInitialData } from '../storage';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        seedInitialData();
        setPosts(getPosts());
    }, []);

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-serif font-bold">Insights & Thoughts</h1>
                <p className="text-lg text-muted-foreground">Sharing my journey in engineering and tech.</p>
            </div>

            <div className="grid gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="group relative bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </span>
                                    {post.tags && post.tags.length > 0 && (
                                        <>
                                            <span>•</span>
                                            <span className="text-primary">{post.tags.join(', ')}</span>
                                        </>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                    <Link to={`/blog/${post.id}`}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </div>
                    </article>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No posts found.
                    </div>
                )}
            </div>
        </div>
    );
}
