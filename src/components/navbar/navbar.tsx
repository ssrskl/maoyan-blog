import { cn } from "@/lib/utils";
import { useKeyPress, useScroll } from "ahooks";
import { FaCat, FaGithub, FaRegLightbulb } from "react-icons/fa";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
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
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useGetBlogs } from "@/actions/BlogRequest";

export const Navbar = () => {
  const { data: blogsData } = useGetBlogs();
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
            {"猫颜的数字花园"}
          </span>
        </Link>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-6 text-base font-medium mr-8">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  fontFamily: "霞鹜漫黑",
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
          {user?.avatar ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-6 h-6" src={user?.avatar} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    logout(dispatch);
                  }}
                >
                  登出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <FaRegUser
              className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/login")}
            />
          )}
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="搜索文章..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Blogs">
              {blogsData?.documents.slice(0, 5).map((blog) => (
                <CommandItem
                  key={blog.$id}
                  onSelect={() => {
                    setOpen(false);
                    navigate(`/blogdetail/${blog.$id}`);
                  }}
                >
                  <span onClick={() => redirect(`/blogdetail/${blog.$id}`)}>
                    {blog.title}
                  </span>
                </CommandItem>
              ))}
              {blogsData?.total > 5 && (
                <CommandItem onSelect={() => setOpen(false)}>
                  <span onClick={() => navigate("/blogs")}>...</span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
};
