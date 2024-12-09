import { cn } from "@/lib/utils";
import { TypeIntro } from "./components/TypeIntro";
import { IntroScrollMouse } from "./components/IntroScrollMouse";
import { useNavigate, useNavigation } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import { AnimatePresence } from "framer-motion";
import { LinearProgress } from "@/components/Progress";

export const HomePage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  let delay = 0;
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  return (
    <QueueAnim>
      <AnimatePresence>
        {navigation.state === "loading" && (
          <LinearProgress classes="w-full absolute top-0 left-0 right-0'" />
        )}
      </AnimatePresence>
      <div key={1} className="grid place-content-center">
        <div className="h-screen gap-5 flex flex-col justify-center px-6">
          <p className="text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out">
            你好，我是
          </p>

          <strong
            className={cn(
              `text-5xl md:text-8xl tracking-widest font-black  bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`,
              "animate-fade-up animate-ease-in-out"
            )}
            style={{
              WebkitTextFillColor: "transparent",
              animationDelay: `${getDelay()}ms`,
            }}
          >
            猫颜
          </strong>
          <div
            className={cn("animate-fade-up animate-ease-in-out")}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <TypeIntro />
          </div>
          <p
            className={cn(
              "text-2xl md:text-5xl tracking-widest",
              "animate-fade-up animate-ease-in-out"
            )}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            喜欢
            <span className={`font-semibold text-[#00d8ff]`}>React</span>、
            <span className={`font-semibold text-[#007acc]`}>TypeScript</span>和
            <span className={`font-semibold text-[#00b4e0]`}>Java</span>
            <span className="ml-4">\owo/ ~</span>
          </p>
          <p
            className={cn(
              "text-base md:text-2xl text-muted-foreground tracking-widest",
              "animate-fade-up animate-ease-in-out"
            )}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            我在这个网站记录我的成长，努力 💪 成为一个更好的程序员。
          </p>
          <div
            className={cn(
              "flex space-x-4",
              "animate-fade-up animate-ease-in-out"
            )}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            <div
              className="border-2 p-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/blog")}
            >
              我的博客
            </div>
            <div
              className="border-2 p-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/about")}
            >
              关于我
            </div>
          </div>

          <ul
            className={cn(
              "flex space-x-4",
              "animate-fade-up animate-ease-in-out"
            )}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          ></ul>
          <div className="grid place-content-center bottom-0 inset-x-0 animate-bounce mt-20">
            <IntroScrollMouse />
          </div>
        </div>
      </div>
    </QueueAnim>
  );
};
