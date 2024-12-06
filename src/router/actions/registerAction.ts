import { account } from "@/lib/appwrite";
import { generateID } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { redirect } from "react-router-dom";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    await account.create(
      generateID(),
      formData.get("email"),
      formData.get("password")
    );
  } catch (e) {
    if (e instanceof AppwriteException) {
      return {
        message: e.message,
      };
    }
  }
  // 注册成功自动登录
  try {
    await account.createSession(
      formData.get("email"),
      formData.get("password")
    );
  } catch (e) {
    if (e instanceof AppwriteException) {
      return redirect("/login");
    }
  }

  return redirect("/");
};
