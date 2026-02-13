import { Link, Outlet } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/blog" className="flex items-center gap-2 font-serif text-xl font-bold hover:text-primary transition-colors">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                        Nishan's Blog
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Home className="w-4 h-4" />
                                Portfolio
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
