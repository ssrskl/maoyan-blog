import { account } from "@/lib/appwrite";
import { message } from "antd";
import { redirect } from "react-router-dom";
import { clearUser } from "@/store/userStore";
import { Dispatch } from "@reduxjs/toolkit";

export const logout = async (dispatch:Dispatch) => {
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
