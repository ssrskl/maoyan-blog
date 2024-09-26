import { Breadcrumb } from "antd";
import { motion } from "framer-motion";
import {
  FaCss3,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiApachehadoop,
  SiApachehive,
  SiApachekafka,
  SiApachespark,
  SiBilibili,
  SiGmail,
  SiJuejin,
  SiMysql,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export const AboutPage = () => {
  let delay = 0;
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  const items = [
    {
      title: "首页",
    },
    {
      title: "关于",
    },
  ];
  return (
    <div className="flex justify-center pt-10">
      <div className="grid w-2/3">
        <div className="gap-5 flex flex-col justify-center px-6">
          <motion.div
            className="gap-5 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Breadcrumb items={items} />
            <h1 className="text-4xl font-bold my-4">关于</h1>
            <p>叮~您有一份关于猫颜的简介，请查收</p>
          </motion.div>
          <h2
            className="text-2xl font-bold my-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            我是谁
          </h2>
          <p
            className="animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            Hi~ 我是猫颜，一个全栈工程师
          </p>
          <h2
            className="text-2xl font-bold my-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            我的技能
          </h2>
          <h3
            className="text-xl font-bold animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            前端
          </h3>
          <ul
            className="flex flex-col space-y-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <FaHtml5 />
              HTML +
              <FaCss3 />
              CSS +
              <FaJs />
              JS
            </li>
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <FaReact />
              React +
              <SiVite />
              Vite +
              <SiTailwindcss />
              Tailwind +
              <SiTypescript />
              TypeScript
            </li>
          </ul>

          <h3
            className="text-xl font-bold animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            后端
          </h3>
          <ul
            className="flex flex-col space-y-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <FaJava />
              Java
            </li>
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <SiSpring />
              Spring +
              <SiSpringboot />
              SpringBoot +
              <SiMysql />
              MySQL +
              <FaDatabase />
              Mybatis +
              <SiSpringsecurity />
              Satoken
            </li>
          </ul>

          <h3
            className="text-xl font-bold animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            大数据
          </h3>
          <ul
            className="flex flex-col space-y-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <FaJava />
              Java +
              <FaPython />
              Python
            </li>
            <li className="flex items-center gap-2 text-md">
              <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
              <SiApachehadoop />
              Hadoop +
              <SiApachehive />
              Hive +
              <SiApachespark />
              Spark +
              <SiApachekafka />
              Kafka
            </li>
          </ul>

          <h2
            className="text-2xl font-bold my-2 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            联系我
          </h2>
          <ul
            className="flex items-center space-x-3 animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <FaGithub className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
            <SiGmail className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
            <SiBilibili className="w-10 h-10 border-2 rounded-lg p-1  cursor-pointer" />
            <SiJuejin className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
          </ul>
        </div>
      </div>
    </div>
  );
};
