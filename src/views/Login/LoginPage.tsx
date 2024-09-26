import { Button, Divider, Input, Typography } from "antd";
import { FaKey, FaUser } from "react-icons/fa6";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border rounded-2xl py-8 px-8 border-zinc-200 shadow-lg">
          <div className="text-2xl font-bold my-6">用户登录</div>
          <div className="w-72 flex flex-col space-y-3 my-6">
            <div>
              <Typography.Title level={5}>用户名</Typography.Title>
              <Input placeholder="用户名" prefix={<FaUser />} />
            </div>
            <div>
              <Typography.Title level={5}>密码</Typography.Title>
              <Input.Password placeholder="密码" prefix={<FaKey />} />
            </div>
          </div>
          <HappyProvider>
            <Button type="primary" className="w-full">
              登录
            </Button>
          </HappyProvider>

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
