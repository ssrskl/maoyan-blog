import { FaBlog, FaCode, FaNoteSticky, FaTag } from "react-icons/fa6";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { Statistic } from "antd";
import { motion } from "framer-motion";
export const AdminStatisticsPage = () => {
  // 定义父容器的动画 variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // 定义子容器的动画 variants
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col w-full px-16 pt-20">
      <AdminPageHeader
        breadcrumb={[
          {
            title: "管理",
          },
          {
            title: "统计",
          },
        ]}
        title="统计"
        description="统计网站的各项信息"
      />

      <motion.section
        className="grid grid-cols-4 gap-4 pt-8 pr-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col p-6 border rounded-2xl bg-stone-100 shadow-md"
          variants={childVariants}
        >
          <div className="flex items-center justify-between">
            <p>博客</p>
            <FaBlog />
          </div>
          <Statistic value={18} />
        </motion.div>

        <motion.div
          className="flex flex-col p-6 border rounded-2xl bg-stone-100 shadow-md"
          variants={childVariants}
        >
          <div className="flex items-center justify-between">
            <p>片段</p>
            <FaCode />
          </div>
          <Statistic value={18} />
        </motion.div>

        <motion.div
          className="flex flex-col p-6 border rounded-2xl bg-stone-100 shadow-md"
          variants={childVariants}
        >
          <div className="flex items-center justify-between">
            <p>标签</p>
            <FaTag />
          </div>
          <Statistic value={18} />
        </motion.div>

        <motion.div
          className="flex flex-col p-6 border rounded-2xl bg-stone-100 shadow-md"
          variants={childVariants}
        >
          <div className="flex items-center justify-between">
            <p>笔记</p>
            <FaNoteSticky />
          </div>
          <Statistic value={18} />
        </motion.div>
      </motion.section>
    </div>
  );
};
