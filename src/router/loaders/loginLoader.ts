import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import { redirect } from "react-router-dom";

export const loginLoader = async () => {
  try {
    const user = await account.get();
    console.log(user);
    console.log(user.$id);
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error(error.message);
      return null;
    }
  }

  return redirect("/");
};
