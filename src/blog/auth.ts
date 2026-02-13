const AUTH_KEY = 'nishan_blog_auth';
const SESSION_KEY = 'nishan_blog_session';

// Simple mock authentication for frontend-only requirement
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

async function hashPassword(password: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const login = async (username: string, password: string): Promise<boolean> => {
    const hashedPassword = await hashPassword(password);
    if (username === ADMIN_USERNAME && hashedPassword === ADMIN_PASSWORD_HASH) {
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
