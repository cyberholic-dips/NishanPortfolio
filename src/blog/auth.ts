const AUTH_KEY = 'nishan_blog_auth';

// Simple mock authentication for frontend-only requirement
// In a real app, this would verify against a backend.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123'; // Simple password as requested

export const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        return true;
    }
    return false;
};

export const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
};
