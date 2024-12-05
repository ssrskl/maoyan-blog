import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import { redirect } from "react-router-dom";

export const loginAction = async ({ request }) => {
  console.log("loginAction");
  console.log(request);
  const formData = await request.formData();
  console.log(formData);
  console.log(formData.get("email"));
  console.log(formData.get("password"));
  try {
    await account.createEmailPasswordSession(
      formData.get("email"),
      formData.get("password")
    );
    return redirect("/");
  } catch (e) {
    if (e instanceof AppwriteException) {
      return {
        message: e.message,
      };
    }
  }
  return null;
};
