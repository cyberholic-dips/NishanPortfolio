import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../auth';
import { getPosts, savePost, deletePost, getQuote, saveQuote, type DailyQuote } from '../storage';
import type { BlogPost } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, LogOut, LayoutDashboard, FileText, Calendar, User, Tag, ArrowLeft, ExternalLink, Quote } from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();

    // Dashboard State
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [newPost, setNewPost] = useState<Partial<BlogPost>>({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        tags: []
    });

    const [dailyQuote, setDailyQuote] = useState<DailyQuote>({ text: '', author: '' });
    const [isEditingQuote, setIsEditingQuote] = useState(false);

    useEffect(() => {
        // Double check authentication on mount
        if (!isAuthenticated()) {
            navigate('/blog/login');
            return;
        }
        const loadData = async () => {
            const [postsData, quoteData] = await Promise.all([getPosts(), getQuote()]);
            setPosts(postsData);
            setDailyQuote(quoteData);
        };
        loadData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/blog/login');
    };

    const handleEditPost = (post: BlogPost) => {
        setEditingPostId(post.id);
        setNewPost({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            imageUrl: post.imageUrl || '',
            tags: post.tags || []
        });
        setIsCreating(true);
    };

    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) return;

        const post: BlogPost = {
            id: editingPostId || newPost.title!.toLowerCase().replace(/\s+/g, '-'),
            title: newPost.title!,
            excerpt: newPost.excerpt || '',
            content: newPost.content!,
            imageUrl: newPost.imageUrl || '',
            author: 'Nishan Parajuli',
            date: editingPostId ? posts.find(p => p.id === editingPostId)?.date || new Date().toISOString() : new Date().toISOString(),
            tags: typeof newPost.tags === 'string' ? (newPost.tags as string).split(',').map((t: string) => t.trim()) : newPost.tags || []
        };

        try {
            await savePost(post);
            const updatedPosts = await getPosts();
            setPosts(updatedPosts);
            setIsCreating(false);
            setEditingPostId(null);
            setNewPost({ title: '', excerpt: '', content: '', imageUrl: '', tags: [] });
        } catch (error) {
            alert('Failed to save post. Please check your connection.');
        }
    };

    const handleDeletePost = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id);
                const updatedPosts = await getPosts();
                setPosts(updatedPosts);
            } catch (error) {
                alert('Failed to delete post.');
            }
        }
    };

    const handleSaveQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveQuote(dailyQuote);
            setIsEditingQuote(false);
            alert('Quote updated successfully!');
        } catch (error) {
            alert('Failed to update quote.');
        }
    };

    return (
        <div className="min-h-screen bg-background/50">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
                    <div className="flex items-center gap-2.5 font-bold text-xl font-serif">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                            <LayoutDashboard className="w-5 h-5 text-primary" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Admin Center
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                            <User className="w-3.5 h-3.5" />
                            Nishan Parajuli
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                            <LogOut className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl mx-auto px-4 py-6 sm:py-10">
                {isCreating ? (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => { setIsCreating(false); setEditingPostId(null); setNewPost({ title: '', excerpt: '', content: '', imageUrl: '', tags: [] }); }} className="rounded-full">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold font-serif">{editingPostId ? 'Edit Story' : 'Write New Story'}</h1>
                                    <p className="text-muted-foreground text-sm">{editingPostId ? 'Refine your existing content' : 'Share your latest thoughts with the world'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-xl ring-1 ring-border/50">
                            <form onSubmit={handleSavePost} className="space-y-8">
                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Title</Label>
                                        <Input
                                            id="title"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            placeholder="A Catchy and Meaningful Title"
                                            className="text-xl font-medium bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary h-12"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Short Excerpt</Label>
                                        <Input
                                            id="excerpt"
                                            value={newPost.excerpt}
                                            onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                            placeholder="What is this story about? (Summarize in one sentence)"
                                            className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="imageUrl" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured Image Link</Label>
                                            <div className="relative">
                                                <ExternalLink className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="imageUrl"
                                                    value={newPost.imageUrl}
                                                    onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="pl-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tags" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Classification / Tags</Label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="tags"
                                                    value={Array.isArray(newPost.tags) ? newPost.tags.join(', ') : ''}
                                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                                                    placeholder="Ideas, Development, Lifestyle (comma separated)"
                                                    className="pl-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <Label htmlFor="content" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Content (Markdown)</Label>
                                            <div className="flex items-center gap-1 text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                <FileText className="w-2.5 h-2.5" /> MD Ready
                                            </div>
                                        </div>
                                        <Textarea
                                            id="content"
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            placeholder="## Start your journey here... Use markdown for headers, lists, and links."
                                            className="min-h-[450px] font-mono text-sm leading-relaxed p-6 bg-muted/20 border-dashed border-2 border-border focus-visible:ring-primary rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
                                    <Button type="button" variant="ghost" onClick={() => { setIsCreating(false); setEditingPostId(null); setNewPost({ title: '', excerpt: '', content: '', imageUrl: '', tags: [] }); }} className="px-6">
                                        Discard
                                    </Button>
                                    <Button type="submit" size="lg" className="px-8 font-bold shadow-lg shadow-primary/20">
                                        {editingPostId ? 'Update Story' : 'Confirm & Publish'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10 animate-in fade-in duration-700">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">Content Management</h1>
                                <p className="text-muted-foreground mt-1">Hello Nishan, here's what's happening with your blog.</p>
                            </div>
                            <Button onClick={() => { setIsCreating(true); setEditingPostId(null); setNewPost({ title: '', excerpt: '', content: '', imageUrl: '', tags: [] }); }} size="lg" className="rounded-full shadow-xl hover:shadow-primary/30 transition-all group px-6">
                                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                                Create New Story
                            </Button>
                        </div>

                        {/* Responsive Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <FileText className="w-12 h-12" />
                                </div>
                                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Published Stories</div>
                                <div className="text-4xl font-bold font-serif">{posts.length}</div>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <Calendar className="w-12 h-12" />
                                </div>
                                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Latest Entry</div>
                                <div className="text-lg font-bold truncate">
                                    {posts[0]?.title ? posts[0].title : 'No entries yet'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {posts[0]?.date ? new Date(posts[0].date).toLocaleDateString(undefined, { dateStyle: 'long' }) : '---'}
                                </div>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm text-primary font-bold uppercase tracking-wider">System Pulse</div>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase ring-1 ring-green-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    The administration portal is fully operational. All local storage buffers are synced.
                                </p>
                            </div>
                        </div>

                        {/* Quote of the Day Management */}
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Quote className="w-16 h-16" />
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Quote className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-serif">Quote of the Day</h2>
                                        <p className="text-xs text-muted-foreground">This quote appears on your portfolio's home page.</p>
                                    </div>
                                </div>
                                {!isEditingQuote && (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditingQuote(true)} className="rounded-xl font-bold">
                                        Edit Quote
                                    </Button>
                                )}
                            </div>

                            {isEditingQuote ? (
                                <form onSubmit={handleSaveQuote} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="quoteText" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quote Text</Label>
                                        <Textarea
                                            id="quoteText"
                                            value={dailyQuote.text}
                                            onChange={(e) => setDailyQuote({ ...dailyQuote, text: e.target.value })}
                                            placeholder="Enter an inspiring quote..."
                                            className="min-h-[100px] bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quoteAuthor" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Author</Label>
                                        <Input
                                            id="quoteAuthor"
                                            value={dailyQuote.author}
                                            onChange={(e) => setDailyQuote({ ...dailyQuote, author: e.target.value })}
                                            placeholder="Author Name"
                                            className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-2 pt-2">
                                        <Button type="button" variant="ghost" onClick={async () => {
                                            setIsEditingQuote(false);
                                            const currentQuote = await getQuote();
                                            setDailyQuote(currentQuote);
                                        }} size="sm">
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm" className="font-bold rounded-xl px-6">
                                            Update Quote
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-muted/20 p-5 rounded-2xl border border-border/50 relative">
                                    <p className="text-lg font-serif italic text-foreground/80 mb-3 leading-relaxed">
                                        "{dailyQuote.text}"
                                    </p>
                                    <p className="text-sm font-bold text-primary">— {dailyQuote.author}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-xl font-bold font-serif">Library</h2>
                                <span className="text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">{posts.length} Items</span>
                            </div>

                            <div className="grid gap-4">
                                {posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="flex-1 min-w-0 space-y-3 mb-5 md:mb-0 md:pr-8">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors truncate max-w-full">
                                                    {post.title}
                                                </h3>
                                                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                                                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                                        {post.tags[0]}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5" />
                                                    {post.author}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 md:flex-none h-10 px-4 rounded-xl font-bold border-primary/20 hover:bg-primary/5 text-primary"
                                                onClick={() => handleEditPost(post)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1 md:flex-none h-10 px-4 rounded-xl font-bold bg-muted/50 hover:bg-muted"
                                                onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live View
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeletePost(post.id)}
                                                className="w-10 h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {posts.length === 0 && (
                                    <div className="text-center py-20 bg-muted/20 border-2 border-dashed border-border rounded-3xl">
                                        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                            <FileText className="w-10 h-10 text-muted-foreground/30" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-serif mb-2">Your library is empty</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto mb-8 px-6">
                                            It looks like you haven't published anything yet. Start your blogging journey today!
                                        </p>
                                        <Button onClick={() => setIsCreating(true)} size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Write My First Story
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
