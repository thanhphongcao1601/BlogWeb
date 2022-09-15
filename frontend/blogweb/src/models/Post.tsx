import { Author } from "./Author";
import { Comment } from "./Comment";

export interface Post {
  genres: string[];
  _id?: string;
  imgLink?: string;
  title: string;
  content: string;
  author?: Author;
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
