import { Avatar, Popover } from "antd";
import { FaHome } from "react-icons/fa";
import {
  FaBlog,
  FaChartPie,
  FaCircleArrowLeft,
  FaCode,
  FaNoteSticky,
  FaRightToBracket,
  FaTag,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

export const SideNav = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const items = [
    {
      label: "首页",
      icon: <FaHome />,
      link: "/admin",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      label: "统计",
      icon: <FaChartPie className="text-white w-7 h-7" />,
      link: "/admin/statistics",
      onClick: () => {
        navigate("/admin/statistics");
      },
    },
    {
      label: "标签",
      icon: <FaTag className="text-white w-7 h-7" />,
      link: "/admin/tags",
      onClick: () => {
        navigate("/admin/tags");
      },
    },
    {
      label: "博客",
      icon: <FaBlog className="text-white w-7 h-7" />,
      link: "/admin/blogs",
      onClick: () => {
        navigate("/admin/blogs");
      },
    },
    {
      label: "片段",
      icon: <FaCode className="text-white w-7 h-7" />,
      link: "/admin/snippets",
      onClick: () => {
        navigate("/admin/snippets");
      },
    },
    {
      label: "笔记",
      icon: <FaNoteSticky className="text-white w-7 h-7" />,
      link: "/admin/notes",
      onClick: () => {
        navigate("/admin/notes");
      },
    },
  ];

  return (
    <aside className="w-16 lg:w-[256px] transition-all h-screen flex-col flex items-center justify-between pt-6 pb-2 bg-foreground">
      <Popover
        content={
          <div className="flex flex-col px-1">
            <p className="hover:bg-stone-200 px-2 py-1 rounded-lg cursor-pointer">
              设置
            </p>
            <p className="hover:bg-stone-200 px-2 py-1 rounded-lg cursor-pointer">
              帮助
            </p>
            <div className="w-full border border-stone-200 my-1" />
            <div className="hover:bg-stone-200 px-2 py-1 rounded-lg cursor-pointer">
              退出登录
            </div>
          </div>
        }
        placement="right"
        trigger={"click"}
        title={"我的账号"}
      >
        <div className="flex flex-col items-center cursor-pointer">
          <Avatar
            className="w-14 h-14 border border-muted-foreground/10 items-center justify-center bg-white"
            src={"https://avatars.githubusercontent.com/u/18780761?v=4"}
          />
          {/*用户名*/}
          <h4 className="hidden lg:block text-lg font-semibold tracking-tight mt-2 text-primary-foreground">
            {"猫颜"}
          </h4>
        </div>
      </Popover>

      {/*侧边栏*/}
      <motion.div
        className="w-full flex-col flex items-center  space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item) =>
          pathname === item.link ? (
            <Link key={item.label} to={item.link}>
              <div className="flex items-center space-x-4 px-6 py-2 bg-white rounded-lg">
                {React.cloneElement(item.icon, {
                  className: "w-7 h-7",
                })}
                <p className=" hover:font-bold font-bold">{item.label}</p>
              </div>
            </Link>
          ) : (
            <Link key={item.label} to={item.link}>
              <div className="flex items-center space-x-4 px-6 py-2 rounded-lg hover:bg-background/20">
                {React.cloneElement(item.icon, {
                  className: "w-7 h-7 text-white",
                })}
                <p className="text-white hover:font-bold">{item.label}</p>
              </div>
            </Link>
          )
        )}
      </motion.div>
      <motion.div
        className="flex flex-col space-y-3 justify-center lg:grid w-full "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div
          className="flex items-center space-x-4 cursor-pointer rounded-lg py-2 px-8 hover:bg-white/10 "
          onClick={() => {
            navigate("/");
          }}
        >
          <FaCircleArrowLeft className="text-white w-7 h-7 hover:font-bold" />
          <p className="text-white hover:font-bold">返回主页</p>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer rounded-lg py-2 px-8 hover:bg-white/10 ">
          <FaRightToBracket className="text-white w-7 h-7 hover:font-bold" />
          <p className="text-white hover:font-bold">退出登录</p>
        </div>
      </motion.div>
    </aside>
  );
};
