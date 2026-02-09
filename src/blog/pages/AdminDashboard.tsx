import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, isAuthenticated } from '../auth';
import { getPosts, savePost, deletePost } from '../storage';
import type { BlogPost } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, LogOut, LayoutDashboard, FileText, Calendar, User, Tag, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Login State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Dashboard State
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newPost, setNewPost] = useState<Partial<BlogPost>>({
        title: '',
        excerpt: '',
        content: '',
        tags: []
    });

    useEffect(() => {
        if (isAuthenticated()) {
            setIsLoggedIn(true);
            setPosts(getPosts());
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(username, password)) {
            setIsLoggedIn(true);
            setError('');
            setPosts(getPosts());
        } else {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/blog');
    };

    const handleSavePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) return;

        const post: BlogPost = {
            id: newPost.title!.toLowerCase().replace(/\s+/g, '-'),
            title: newPost.title!,
            excerpt: newPost.excerpt || '',
            content: newPost.content!,
            author: 'Nishan Parajuli',
            date: new Date().toISOString(),
            tags: typeof newPost.tags === 'string' ? (newPost.tags as string).split(',').map((t: string) => t.trim()) : newPost.tags
        };

        savePost(post);
        setPosts(getPosts());
        setIsCreating(false);
        setNewPost({ title: '', excerpt: '', content: '', tags: [] });
    };

    const handleDeletePost = (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(id);
            setPosts(getPosts());
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

                <div className="w-full max-w-md space-y-8 p-8 border border-border rounded-xl bg-card shadow-2xl relative z-10">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <LayoutDashboard className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif">Admin Portal</h2>
                        <p className="text-muted-foreground mt-2">Sign in to manage your blog</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin"
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-background/50"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" size="lg">
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 font-bold text-xl font-serif">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        Dashboard
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                            <User className="w-4 h-4" />
                            Admin
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl mx-auto px-4 py-8">
                {isCreating ? (
                    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)}>
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold font-serif">Create New Post</h1>
                                <p className="text-muted-foreground">Share your thoughts with the world</p>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                            <form onSubmit={handleSavePost} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        placeholder="Enter a descriptive title"
                                        className="text-lg font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Excerpt</Label>
                                    <Input
                                        value={newPost.excerpt}
                                        onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                        placeholder="Brief summary for list view"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            value={newPost.tags}
                                            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                                            placeholder="Engineering, Design, Personal (comma separated)"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex justify-between">
                                        <span>Content</span>
                                        <span className="text-xs text-muted-foreground font-normal">Markdown Supported</span>
                                    </Label>
                                    <div className="relative">
                                        <Textarea
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            placeholder="# Your Story Starts Here..."
                                            className="min-h-[400px] font-mono text-sm leading-relaxed p-4"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                    <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="lg" className="min-w-[120px]">
                                        Publish
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold font-serif mb-1">Overview</h1>
                                <p className="text-muted-foreground">Manage your blog posts and content.</p>
                            </div>
                            <Button onClick={() => setIsCreating(true)} size="lg" className="shadow-lg hover:shadow-primary/20">
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        </div>

                        {/* Stats Logic (Placeholder for now) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                                <div className="text-sm text-muted-foreground font-medium mb-1">Total Posts</div>
                                <div className="text-2xl font-bold">{posts.length}</div>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                                <div className="text-sm text-muted-foreground font-medium mb-1">Latest Post</div>
                                <div className="text-sm font-medium truncate">{posts[0]?.date ? new Date(posts[0].date).toLocaleDateString() : 'N/A'}</div>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                                <div className="text-sm text-muted-foreground font-medium mb-1">Status</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-green-500">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    System Active
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4 px-1">Recent Posts</h2>
                            <div className="grid gap-4">
                                {posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
                                    >
                                        <div className="space-y-1 mb-4 sm:mb-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg">{post.title}</h3>
                                                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                                                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                                        {post.tags[0]}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5" />
                                                    {post.author}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => window.open(`/blog/${post.id}`, '_blank')}>
                                                <FileText className="w-4 h-4 mr-2" />
                                                View
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {posts.length === 0 && (
                                    <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-medium font-serif mb-1">No posts yet</h3>
                                        <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
                                        <Button onClick={() => setIsCreating(true)}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Post
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
