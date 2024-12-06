import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import { redirect } from "react-router-dom";

export const appLoader = async () => {
  try {
    await account.get();
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error(error.message);
      return null;
    }
  }

  return redirect("/");
};
