import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const authRequests = {
  get: (url: string) => instance.get<UserRespone>(url).then(responseBody),
  post: (url: string, body: UserInput) =>
    instance.post<UserRespone>(url, body).then(responseBody),
};

interface UserInput {
  name?: string;
  email: string;
  password: string;
}

interface UserRespone {
  data: { userName: string; userId: string; token: string };
  status: string;
}

export const Auths = {
  login: (userInput: UserInput): Promise<UserRespone> =>
    authRequests.post(`/auth/login`, userInput),
  register: (userInput: UserInput): Promise<UserRespone> =>
    authRequests.post(`/auth/register`, userInput),
};
