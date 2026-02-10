const AUTH_KEY = 'nishan_blog_auth';
const SESSION_KEY = 'nishan_blog_session';

// Simple mock authentication for frontend-only requirement
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(SESSION_KEY, Date.now().toString());
        return true;
    }
    return false;
};

export const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
    const auth = localStorage.getItem(AUTH_KEY) === 'true';
    const session = localStorage.getItem(SESSION_KEY);

    // Auto-logout after 24 hours of inactivity
    if (auth && session) {
        const sessionTime = parseInt(session);
        if (Date.now() - sessionTime > 24 * 60 * 60 * 1000) {
            logout();
            return false;
        }
    }

    return auth;
};
