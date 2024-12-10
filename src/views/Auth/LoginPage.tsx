// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button, Divider, Input, message, Typography } from "antd";
import { FaKey } from "react-icons/fa6";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { LinearProgress } from "@/components/Progress";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userStore";
import { User } from "@/types/User";

export const LoginPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const dispatch = useDispatch();
  let user: User = {};
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "success") {
        message.success("登录成功");
        user.id = actionData.data.$id;
        user.email = actionData.data.email;
        user.username = actionData.data.name;
        user.avatar = actionData.data.prefs.avatar;
        user.intro = actionData.data.prefs.intro;
        dispatch(setUser(user));
        redirect("/");
      } else if (actionData.status === "error") {
        message.error(`登录失败,${actionData.message}`);
      }
    }
  }, [actionData]);
  return (
    <div className="relative grid place-content-center">
      <AnimatePresence>
        {navigation.state === "loading" && (
          <LinearProgress classes="w-full  absolute top-0 left-0 right-0'" />
        )}
      </AnimatePresence>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border rounded-2xl py-8 px-8 border-zinc-200 shadow-lg">
          <div className="text-2xl font-bold my-6">用户登录</div>
          <Form method="post" action="/login" className="w-full">
            <div className="w-72 flex flex-col space-y-3 my-6">
              <div>
                <Typography.Title level={5}>邮箱</Typography.Title>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="邮箱"
                  prefix={<MdEmail />}
                />
              </div>
              <div>
                <Typography.Title level={5}>密码</Typography.Title>
                <Input.Password
                  id="password"
                  name="password"
                  placeholder="密码"
                  prefix={<FaKey />}
                />
              </div>
            </div>
            <HappyProvider>
              <Button type="primary" className="w-full" htmlType="submit">
                登录
              </Button>
            </HappyProvider>
          </Form>

          <p className="text-center mt-4">
            没有账户？
            <Link to="/register" className="hover:underline">
              创建一个账户
            </Link>
          </p>
          <div className="relative w-full my-8">
            <Divider />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-500">
              或者
            </p>
          </div>
          <Button
            type="primary"
            className="w-full"
            onClick={() => {
              navigate("/");
            }}
          >
            回首页
          </Button>
        </div>
      </div>
    </div>
  );
};
