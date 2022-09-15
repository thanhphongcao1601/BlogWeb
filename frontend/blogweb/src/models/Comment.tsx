import { Author } from "./Author";

export interface Comment {
  _id: string;
  author: Author;
  content: string;
  createdAt: string;
  updatedAt: string;
}
