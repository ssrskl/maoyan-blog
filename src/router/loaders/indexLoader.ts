import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

export const indexLoader = async () => {
  try {
    await account.get();
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("用户未登录");
      return null;
    }
  }
};
