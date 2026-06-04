export interface FeedbackComment {
  id: string;
  author: string;
  avatar: string;
  comment: string;
  time: string;
  x: number; // percentage of canvas width (0-100)
  y: number; // percentage of canvas height (0-100)
  resolved?: boolean;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio' | 'document';
  size: string;
  thumbnail: string;
  status: 'approved' | 'in-progress' | 'needs-review';
  commentsCount: number;
  category: string;
  comments: FeedbackComment[];
}

export interface CreativeTask {
  id: string;
  title: string;
  assignee: string;
  avatarId: string; // seed for ui-avatars or Lucide
  role: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}
