import { account } from "@/lib/appwrite";
import { message } from "antd";
import { redirect } from "react-router-dom";
import { clearUser } from "@/store/userStore";

export const logout = async (dispatch) => {
  try {
    await account.deleteSession("current");
    // 清理Redux
    dispatch(clearUser());
    message.success("登出成功");
  } catch (error) {
    message.error("登出失败");
  } finally {
    redirect("/");
  }
};
