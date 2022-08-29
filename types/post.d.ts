import { User } from './user';

export type Post = {
  id: string;
  imageUrl: string;
  title: string;
  text: string;
  tags: string[];
  author: User;
};
