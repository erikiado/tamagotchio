export interface User {
  id: string
  name: string
  email: string
  created_at: string
}


export interface UserSession {
  email: string
  token: string
  role: string
  loggedIn: boolean
  // access_token:
  access_token: string
  refresh_token: string
}

export interface UserAccessPayload {
  email: string
  token: string
}

export interface UserLoginPayload {
  email: string
  password: string
}

export interface UserVerificationPayload {
  email: string
  code: string
}