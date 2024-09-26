import { Button } from "@/components/ui/button";
import { useTest } from "@/views/test/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const TestPageOne = () => {
  const { data } = useTest();
  const [isVisible, setIsVisible] = useState(true);

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
          >
            This is a fading component.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
