export interface BlogPost {
    id: string;
    title: string;
    content: string; // Markdown content
    author: string;
    date: string;
    excerpt: string;
    imageUrl?: string;
    tags?: string[];
}
