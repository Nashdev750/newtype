export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: Date;
    likes: number;
    comments: Comment[];
    tags: string[];
  }
  
  export interface Comment {
    id: string;
    content: string;
    author: User;
    createdAt: Date;
    likes: number;
    replies?: Comment[];
  }
  
  export interface User {
    id: string;
    username: string;
    avatar: string;
  }