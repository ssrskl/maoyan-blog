import { Button, Divider, Input, Typography } from "antd";
import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useNavigate } from "react-router-dom";
import { doRegister, RegisterForm } from "@/apis/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  async function register_fun(data: RegisterForm) {
    const resp = await doRegister(data);
    if (!resp.status) {
    }
  }
  return (
    <div className="grid place-content-center">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border rounded-2xl py-8 px-8 border-zinc-200 shadow-lg">
          <div className="text-2xl font-bold my-6">用户注册</div>
          <div className="w-72 flex flex-col space-y-3 my-6">
            <div>
              <Typography.Title level={5}>邮箱</Typography.Title>
              <Input placeholder="邮箱" prefix={<MdEmail />} />
            </div>
            <div>
              <Typography.Title level={5}>密码</Typography.Title>
              <Input.Password placeholder="密码" prefix={<FaKey />} />
            </div>
            <div>
              <Typography.Title level={5}>再输入一次密码</Typography.Title>
              <Input.Password placeholder="密码" prefix={<FaKey />} />
            </div>
          </div>
          <HappyProvider>
            <Button type="primary" className="w-full">
              注册
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
            className="w-full mb-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            登陆
          </Button>
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
