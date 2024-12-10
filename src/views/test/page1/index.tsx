// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { LinearProgress } from "@/components/Progress";
import { Button } from "@/components/ui/button";
import { account, databases } from "@/lib/appwrite";
import { setUser } from "@/store/userStore";
import { useTest } from "@/views/test/actions";
import { message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkDownViewer from "@/components/MarkDownViewer";

export const TestPageOne = () => {
  const { data } = useTest();
  const [isVisible, setIsVisible] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const newuser = {
    id: 2,
    username: "user",
    email: "user@user.com",
    status: 1,
    avatar: "https://www.gravatar.com/avatar",
    intro: "I am a Full Developer",
    createTime: new Date().toLocaleString(),
    updateTime: new Date().toLocaleString(),
  };

  // 定义子控件动画
  const childVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  // 定义父容器动画
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  async function queryDocuments() {
    try {
      const documents = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "674ea93300318c2482e7"
      );
      console.log(documents);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={"flex flex-col justify-center items-center min-h-dvh"}>
      <h1>Test Page One</h1>
      <div>{data?.data.msg}</div>

      <Button>Happy Everyday!!!</Button>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>

      <motion.div
        className="flex space-x-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="px-3 py-1 rounded-lg border border-black"
          variants={childVariants}
        >
          Java
        </motion.div>
        <motion.div
          className="px-3 py-1 rounded-lg border border-black"
          variants={childVariants}
        >
          Java
        </motion.div>
        <motion.div
          className="px-3 py-1 rounded-lg border border-black"
          variants={childVariants}
        >
          Java
        </motion.div>
        <motion.div
          className="px-3 py-1 rounded-lg border border-black"
          variants={childVariants}
        >
          Java
        </motion.div>
        <motion.div
          className="px-3 py-1 rounded-lg border border-black"
          variants={childVariants}
        >
          Java
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5.5 }}
          >
            This is a fading component.
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <LinearProgress classes="w-full h-2 my-2" />
      </AnimatePresence>

      {user && (
        <div className="text-left">
          <p>用户名：{user.username}</p>
          <p>邮箱：{user.email}</p>
          <p>介绍：{user.intro}</p>
          <p>创建时间：{user.createTime.toLocaleString()}</p>
          <p>更新时间：{user.updateTime.toLocaleString()}</p>
        </div>
      )}

      <Button onClick={() => dispatch(setUser(newuser))}>change user</Button>

      <Button
        onClick={() => {
          message.info("This is a message");
        }}
      >
        Show Message
      </Button>
      <Button
        onClick={() => {
          account.deleteSession("current");
        }}
      >
        Log Out
      </Button>

      <Button onClick={queryDocuments}>Query Documents</Button>

      <MarkDownViewer
        content={
          "# This is a title\n\nThis is a paragraph with **bold** and *italic* text." +
          "\n\nAnd this is a [link](https://www.google.com)."
        }
      />
    </div>
  );
};
