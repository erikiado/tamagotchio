
import axiosApi, { parseFiberResponse } from '../../services/AxiosInstance';
import axios from 'axios';

export const currentEnv = process.env.NODE_ENV === "production" ? "dev" : "local"

const CHAT_SERVICE = process.env.CHAT_SERVICE || "http://127.0.0.1:5000/";

export async function chatRequest(prompt:string): Promise<{ answer: any }> {
  console.log({CHAT_SERVICE})
  console.log("requesting chat...")
  const response = await axiosApi.post(CHAT_SERVICE, {prompt});
  console.log({response});
  return response.data;
}
