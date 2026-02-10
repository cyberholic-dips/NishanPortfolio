import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LayoutDashboard, Lock, User, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate a slight delay for better UX
        setTimeout(() => {
            if (login(username, password)) {
                navigate('/blog/admin');
            } else {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-300">
                        <LayoutDashboard className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">Admin Portal</h1>
                    <p className="text-muted-foreground mt-2">Sign in to manage your content</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center animate-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Sign In <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    &copy; {new Date().getFullYear()} Nishan Parajuli. All rights reserved.
                </p>
            </div>
        </div>
    );
}
