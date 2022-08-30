import { User } from './user';

export type Post = {
  id: string;
  imageFile: any;
  title: string;
  text: string;
  tags: string[];
  author: User;
};
