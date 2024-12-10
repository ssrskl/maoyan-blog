// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cn } from "@/lib/utils";
import { useKeyPress, useScroll } from "ahooks";
import { FaCat, FaGithub, FaRegLightbulb } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, ConfigProvider, Menu, Modal } from "antd";
import { FaRegUser } from "react-icons/fa6";
import { SiSearxng } from "react-icons/si";
import { useState } from "react";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/LogoutAction";

export const Navbar = () => {
  // 用户信息
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // 控制搜索对话框的开关
  // 键盘监听
  useKeyPress(["ctrl.k"], (event) => {
    event.preventDefault(); // 阻止默认事件
    setOpen(true);
  });
  const scroll = useScroll(() => document);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const items = [
    {
      key: "",
      label: "首页",
      onClick: () => {
        navigate("/");
        console.log("home");
      },
    },
    {
      key: "blog",
      label: "博客",
      onClick: () => {
        navigate("/blog");
      },
    },
    {
      key: "about",
      label: "关于",
      onClick: () => {
        navigate("/about");
      },
    },
    {
      key: "manage",
      label: "管理",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "test1",
      label: "测试1",
      onClick: () => {
        navigate("/test1");
      },
    },
  ];

  return (
    <header
      className={cn(
        "w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10",
        (scroll?.top ?? 0) > 60 && "bg-background/50 border-b border-border/70"
      )}
    >
      <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        <FaCat className={"text-3xl"} />
        <Link
          to={"/"}
          className={cn("mr-4 hidden sm:flex")}
          aria-label={"猫颜"}
        >
          <span className="ml-2 font-semibold text-primary text-base">
            {"猫颜的博客"}
          </span>
        </Link>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-6 text-base font-medium mr-8">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemActiveBg: "#e6f4ff",
                  itemColor: "black",
                },
              },
            }}
          >
            <Menu
              items={items}
              style={{ display: "flex", justifyContent: "end" }}
              selectedKeys={[pathname.split("/")[1]]}
              className="bg-background/0"
            />
          </ConfigProvider>
        </div>

        <div className="flex sm:flex-none justify-end items-center space-x-2">
          <FaGithub
            className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 "
            onClick={() => window.open("https://github.com/ssrskl")}
          />
          <FaRegLightbulb className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer " />
          <SiSearxng
            className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer "
            onClick={() => {
              setOpen(true);
            }}
          />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-6 h-6" src={user?.avatar} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>{logout(dispatch)}}>登出</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <FaRegUser
              className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
        <Modal
          title="搜索"
          open={open}
          footer={null}
          onCancel={() => setOpen(false)}
        >
          <div className="flex flex-col">
            <Search
              placeholder="请输入搜索内容"
              allowClear
              enterButton
              size="large"
            />
          </div>
        </Modal>
      </div>
    </header>
  );
};
