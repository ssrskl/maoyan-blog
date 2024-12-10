import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { hopscotch, coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect, useCallback } from "react";
import { getIcon, toTitleCase } from "../lib/utils";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";
import React from "react";
import { visit } from "unist-util-visit";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";

const MarkDownViewer = ({ content }) => {
  const [codeTheme, setCodeTheme] = useState("");

  // 监听系统主题切换，自动切换代码高亮主题
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setCodeTheme(mediaQuery.matches ? hopscotch : coy);
    const themeListener = mediaQuery.addEventListener("change", (event) => {
      setCodeTheme(event.matches ? hopscotch : coy);
    });
    return () => mediaQuery.removeEventListener("change", themeListener);
  }, []);

  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("拷贝成功！");
    } catch (err) {
      message.error("拷贝失败！");
      if (err instanceof Error) {
        console.log(`Error copying text to clipboard: ${err.message}`);
      }
    }
  }, []);

  const code = (props) => {
    const { children, className, ...rest } = props;
    const match = className?.match(/language-(\w+)/);
    return match ? (
      <>
        <div className="code-block">
          <div className="flex w-full items-end justify-between">
            <div className="flex items-center space-x-2 pl-4">
              <Icon icon={getIcon(match[1])} className="w-4 h-4" />
              <div className=" font-sans text-sm">{toTitleCase(match[1])}</div>
            </div>
            <Button
              onClick={handleCopy.bind(null, children)}
              variant={"ghost"}
              className="text-bodyMedium pb-0 items-center flex space-x-2 rounded-lg h-8 px-2"
            >
              <Icon icon="ph:copy" className="w-4 h-4" />
              <p>Copy Code</p>
            </Button>
          </div>

          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={codeTheme}
            customStyle={{
              marginBlock: "0",
              padding: "2px",
            }}
            codeTagProps={{
              style: {
                padding: "14px",
                fontWeight: "600",
              },
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  // 自定义 Markdown 渲染器
  const renderers = {
    h1: ({ children }: { children: React.ReactNode }) => {
      // const id = children!.toString().toLowerCase().replace(/\s+/g, "-");
      return (
        <h1
          className="hover:underline hover:cursor-pointer"
          //  id={id}
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
      // const id = children!.toString().toLowerCase().replace(/\s+/g, "-");
      return (
        <h2
          className="hover:underline hover:cursor-pointer flex items-center space-x-2"
          // id={id}
        >
          <p>{children}</p>
        </h2>
      );
    },
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="list-none flex items-center space-x-2">
        <Icon icon="ph:dot-duotone" className="w-6 h-6 text-light-primary" />
        <span className="">{children}</span>
      </li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="flex-col my-2">
        <div className="flex items-center space-x-2">
          <Icon
            icon="ic:outline-lightbulb"
            className="w-6 h-6 text-light-primary"
          />
          <div className="text-label font-extrabold text-light-primary">
            Tips
          </div>
        </div>
        {children}
      </blockquote>
    ),
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className: string;
    }) => {
      if (className === "warning-block") {
        return (
          <div className="flex-col border-l-4 border-[#e4aa2a] p-4 pb-1 bg-[#fef8e7] rounded-lg my-2">
            <div className="flex items-center space-x-2">
              <Icon icon="ic:warning" className="w-6 h-6 text-[#4c3907]" />
              <div className="text-label font-extrabold text-[#4c3907]">
                Warning
              </div>
            </div>
            {children}
          </div>
        );
      }
      if (className === "success-block") {
        return (
          <div className="flex-col border-l-4 border-[#009318] p-4 pb-1 bg-[#e6f6e7] rounded-lg my-2">
            <div className="flex items-center space-x-2">
              <Icon
                icon="icon-park-solid:success"
                className="w-6 h-6 text-light-primary"
              />
              <div className="text-label font-extrabold text-light-primary">
                Success
              </div>
            </div>
            {children}
          </div>
        );
      }
      if (className === "info-block") {
        return (
          <div className="flex-col border-l-4 border-[#52b1d2] p-4 pb-1 bg-[#eef9fd] rounded-lg my-2">
            <div className="flex items-center space-x-2">
              <Icon icon="ic:info" className="w-6 h-6 text-[#24434e]" />
              <div className="text-label font-extrabold text-[#24434e]">
                Info
              </div>
            </div>
            {children}
          </div>
        );
      }
      if (className === "danger-block") {
        return (
          <div className="flex-col border-l-4 border-[#e03e3e] p-4 pb-1 bg-[#ffebec] rounded-lg my-2">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:fire" className="w-6 h-6 text-[#4b1415]" />
              <div className="text-label font-extrabold text-[#4b1415]">
                danger
              </div>
            </div>
            {children}
          </div>
        );
      }
      return <div className={className}>{children}</div>;
    },
    code,
  };

  function remarkCustomBlock() {
    return (tree) => {
      visit(tree, (node) => {
        if (
          node.type === "textDirective" ||
          node.type === "containerDirective" ||
          node.type === "leafDirective"
        ) {
          console.log(node.type);
          console.log(node.name);
          if (node.name === "info") {
            const data = node.data || (node.data = {});
            data.hName = "div"; // 渲染为 `div`
            data.hProperties = { className: "info-block" }; // 添加自定义类名
          }
          if (node.name === "warning") {
            const data = node.data || (node.data = {});
            data.hName = "div"; // 渲染为 `div`
            data.hProperties = { className: "warning-block" }; // 添加自定义类名
          }
          if (node.name === "success") {
            const data = node.data || (node.data = {});
            data.hName = "div"; // 渲染为 `div`
            data.hProperties = { className: "success-block" }; // 添加自定义类名
          }
          if (node.name === "danger") {
            const data = node.data || (node.data = {});
            data.hName = "div"; // 渲染为 `div`
            data.hProperties = { className: "danger-block" }; // 添加自定义类名
          }
        }
      });
    };
  }

  return (
    <div className="markdown-content">
      <Markdown
        remarkPlugins={[
          remarkParse,
          remarkGfm,
          remarkDirective,
          remarkCustomBlock,
        ]}
        components={renderers}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkDownViewer;
