// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    await account.createEmailPasswordSession(
      formData.get("email"),
      formData.get("password")
    );
    const user = await account.get();
    return {
      status: "success",
      data: user,
    };
  } catch (e) {
    if (e instanceof AppwriteException) {
      return {
        status: "error",
        message: e.message,
      };
    }
  }
  return null;
};
