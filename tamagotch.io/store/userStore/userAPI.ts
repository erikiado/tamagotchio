
import axiosApi, { parseFiberResponse } from '../../services/AxiosInstance';
import axios from 'axios';

import {
  User, UserLoginPayload, UserSession, UserVerificationPayload
} from '../types';
// import { AUTH_SERVICE } from '../../constants';
const AUTH_SERVICE = "http://localhost:3000/"

// "/auth"
// "/signup"
// "/login"
// "/verify"
// "/mail"
// "/password-reset"
// "/refresh-token"
// "/user"
// "/get-password-reset-code"
// "/update-username"
// "/reset-password"


export async function loginUserRequest(userData: UserLoginPayload): Promise<UserSession> {
  const response = await axiosApi.post(AUTH_SERVICE + "/auth/login", userData)
  const userLoginResponse = parseFiberResponse(response, 200);
  return userLoginResponse.data;
}

export async function signUpUserRequest(userData: UserLoginPayload): Promise<UserSession> {
  const response = await axiosApi.post(AUTH_SERVICE + "/auth/signup", userData)//, {timeout:3000})
  const userLoginResponse = parseFiberResponse(response, 201);
  return userLoginResponse.data;
}

export async function verifyUserRequest(verifyData: UserVerificationPayload): Promise<{data: any}> {
  const response = await axiosApi.post(AUTH_SERVICE + "/verify/mail", verifyData)//, {timeout:3000})
  const userLoginResponse = parseFiberResponse(response, 202);
  return userLoginResponse.data;
}


export async function refreshUserRequest(): Promise<UserSession> {
  const response = await axiosApi.get(AUTH_SERVICE + "/user")
  const userLoginResponse = parseFiberResponse(response, 200);
  return userLoginResponse.data;
}


export async function getUsersRequest(): Promise<{ users:User[] }> {
  const response = await axiosApi.get(AUTH_SERVICE + "/users");
  const usersResponse = await parseFiberResponse(response, 200);
  return usersResponse.data;
}
