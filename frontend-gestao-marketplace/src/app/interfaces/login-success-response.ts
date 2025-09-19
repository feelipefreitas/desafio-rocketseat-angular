export interface ILoginSuccessResponse {
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      email: string;
    }
  };
}