import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { getPosts, seedInitialData } from '../storage';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            await seedInitialData();
            const data = await getPosts();
            setPosts(data);
        };
        loadPosts();
    }, []);

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-serif font-bold">Insights & Thoughts</h1>
                <p className="text-lg text-muted-foreground">Sharing my journey in engineering and tech.</p>
            </div>

            <div className="grid gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="group relative bg-card rounded-2xl border border-border p-5 sm:p-7 hover:shadow-2xl transition-all hover:border-primary/40 overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-8">
                            {post.imageUrl && (
                                <div className="w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            )}
                            <div className="flex-1 space-y-5">
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    <span className="flex items-center gap-2 bg-muted px-2.5 py-1 rounded-full">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex gap-2">
                                            {post.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold font-serif group-hover:text-primary transition-colors leading-tight">
                                    <Link to={`/blog/${post.id}`}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="inline-flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                                    Read story <ArrowRight className="w-5 h-5 ml-2" />
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
