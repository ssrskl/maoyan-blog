import { account } from "@/lib/appwrite";
import { AppwriteException, ID, Models } from "appwrite";

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean;
  error: string;
  token: string;
};

export type RegisterForm = {
  email: string;
  password: string;
  repassword: string;
};

export type RegisterResponse = {
  status: boolean;
  data?: object;
  error?: string;
};

export async function doLogin(data: LoginForm): Promise<Models.Session> {
  const response = await account.createEmailPasswordSession(
    data.email,
    data.password
  );
  return response;
}

export async function doRegister(
  data: RegisterForm
): Promise<RegisterResponse> {
  try {
    const response = await account.create(
      ID.unique(),
      data.email,
      data.password
    );
    return {
      status: true,
      data: response,
    };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      return {
        status: false,
        error: error.message,
      };
    }
    return {
      status: false,
      error: "错误",
    };
  }
}
