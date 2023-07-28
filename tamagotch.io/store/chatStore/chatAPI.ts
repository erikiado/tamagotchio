
import axiosApi, { parseFiberResponse } from '../../services/AxiosInstance';
import axios from 'axios';

export const currentEnv = process.env.NODE_ENV === "production" ? "dev" : "local"
import { CHAT_SERVICE } from '../../constants';

export async function chatRequest(prompt:string): Promise<{ answer: any }> {
  console.log({CHAT_SERVICE},"chatservice", process.env.CHAT_SERVICE, process.env, process.env.NODE_ENV, 'NEXT_PUBLIC_CHAT_SERVICE',process.env.NEXT_PUBLIC_CHAT_SERVICE)
  console.log("requesting chat...")
  const response = await axiosApi.post(CHAT_SERVICE, {prompt});
  console.log({response});
  return response.data;
}
