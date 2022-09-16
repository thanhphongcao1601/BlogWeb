import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { Post } from "../models/Post";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const postRequests = {
  get: (url: string) => instance.get<Post>(url).then(responseBody),
  post: (url: string, body: Post, header?: AxiosRequestHeaders) =>
    instance.post<Post>(url, body, { headers: header }).then(responseBody),
  delete: (url: string, header?: AxiosRequestHeaders) =>
    instance.delete<Post>(url, { headers: header }).then(responseBody),
  put: (url: string, body: Object, header?: AxiosRequestHeaders) =>
    instance.put<Post>(url, body, { headers: header }).then(responseBody),
  patch: (url: string, body: Object, header?: AxiosRequestHeaders) =>
    instance.patch<Post>(url, body, { headers: header }).then(responseBody),
};

const searchRequest = {
  post: (url: string, title: string) =>
    instance.post<Post>(url, { title: title }).then(responseBody),
};

interface PostsRespone {
  data: Post[];
  result: number;
  status: string;
}

interface PostRespone {
  data: Post;
  status: string;
}

export const Posts = {
  getAllPosts: (): Promise<PostsRespone> => postRequests.get("/posts"),
  getPost: (postId: string): Promise<PostRespone> =>
    postRequests.get(`/posts/${postId}`),
  addPost: (post: Post, header?: AxiosRequestHeaders): Promise<PostRespone> =>
    postRequests.post(`/posts`, post, header),
  deletePost: (postId: string): Promise<PostRespone> =>
    postRequests.delete(`/posts/${postId}`),
  updatePost: (
    postId: string,
    fields: Object,
    header: AxiosRequestHeaders
  ): Promise<PostRespone> =>
    postRequests.patch(`/posts/${postId}`, fields, header),
  searchPost: (title: string): Promise<PostsRespone> =>
    searchRequest.post(`/posts/search`, title),
  filterPost: (genre: string): Promise<PostsRespone> =>
    searchRequest.post(`/posts/filter`, genre),
};
