export interface SignInErrorResponse {
  message: string;
  error: string;
}

export interface SignInSuccessResponse {
  accessToken: string;
  name: string;
  image: string;
}
