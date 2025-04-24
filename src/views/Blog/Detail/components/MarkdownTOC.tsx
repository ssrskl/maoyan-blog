// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMount, useUnmount } from "ahooks";
import { Affix } from "antd";
import { load } from "cheerio";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./markdownTOC.css"; // 引入CSS文件

export const MarkdownTOC = () => {
  const navigate = useNavigate();
  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const [headerTexts, setHeaderTexts] = useState<string[]>([]); // 保存标题文本
  const [activeHeader, setActiveHeader] = useState<string>(""); // 当前激活的header
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<{ id: string; text: string }[]>([]);

  // 点击目录跳转到对应header
  const scrollToAnchor = useCallback((anchorId: string) => {
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      window.scrollTo({
        top: anchorElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  // 设置IntersectionObserver
  const setupIntersectionObserver = useCallback(() => {
    // 断开之前的观察器
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建新的观察器
    const options = {
      rootMargin: "-80px 0px -80% 0px", // 头部偏移80px，底部偏移80%视口高度
      threshold: [0, 0.2, 0.5, 0.8, 1] // 多个阈值以获得更精确的交叉信息
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target.id);

      if (visibleHeadings.length > 0) {
        // 找到当前视口中最靠前的标题
        const firstVisibleHeadingId = visibleHeadings[0];
        const headerIndex = headerIds.findIndex(id => id === firstVisibleHeadingId);
        if (headerIndex !== -1) {
          const text = headerTexts[headerIndex];
          setActiveHeader(text);
        }
      } else if (entries.length > 0) {
        // 如果没有可见标题，查看最后一个离开视口的标题的方向
        const latestEntry = entries[entries.length - 1];
        if (latestEntry) {
          const headerIndex = headerIds.findIndex(id => id === latestEntry.target.id);
          // 如果向下滚动超过了最后一个标题，将最后一个标题设为活动状态
          if (headerIndex !== -1 && !latestEntry.isIntersecting && latestEntry.boundingClientRect.top < 0) {
            setActiveHeader(headerTexts[headerIndex]);
          }
          // 如果向上滚动超过了第一个标题，将第一个标题设为活动状态
          else if (headerIndex === 0 && !latestEntry.isIntersecting && latestEntry.boundingClientRect.top > 0) {
            setActiveHeader(headerTexts[0]);
          }
        }
      }
    }, options);

    // 观察所有标题元素
    const headingElements = document.querySelectorAll(".markdown-content h2");
    headingElements.forEach(element => {
      if (element.id) {
        observerRef.current?.observe(element);
      }
    });
  }, [headerIds, headerTexts]);

  // 每当headerIds或headerTexts更新时，重新设置观察器
  useEffect(() => {
    if (headerIds.length > 0 && headerTexts.length > 0) {
      setupIntersectionObserver();
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headerIds, headerTexts, setupIntersectionObserver]);

  useMount(() => {
    const markdownBodyElement = document.querySelector(".markdown-content")!;
    if (!markdownBodyElement) return;
    
    const $ = load(markdownBodyElement.innerHTML);
    const h2Elems = $("h2");
    const ids = [];
    const texts = [];
    h2Elems.each((i, elem) => {
      const anchorId = $(elem).attr("id");
      const text = $(elem).text();
      if (anchorId) {
        ids.push(anchorId);
        texts.push(text);
      }
    });
    
    if (ids.length > 0) {
      setHeaderIds(ids); // 更新目录的标题 ID
      setHeaderTexts(texts); // 更新目录的标题文本
      
      // 初始化标题元素引用数组
      headingElementsRef.current = ids.map((id, index) => ({
        id,
        text: texts[index]
      }));
    }
  });

  // 组件卸载时断开观察器
  useUnmount(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  });

  // 添加滚动到顶部的功能
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Affix offsetTop={100}>
      <div className="toc-container px-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm max-h-[80vh] overflow-y-auto">
        <div className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex justify-between items-center">
          <span>目录</span>
          <button 
            onClick={scrollToTop}
            className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
            title="回到顶部"
          >
            ↑ 顶部
          </button>
        </div>
        <ul className="flex flex-col space-y-2 text-zinc-500 dark:text-zinc-400 relative">
          {headerIds.length > 0 ? (
            headerIds.map((el, index) => (
              <li
                key={el}
                className={`cursor-pointer pl-4 py-1 border-l-2 hover:text-blue-500 transition-all duration-300 ease-in-out font-[霞鹜漫黑] text-sm relative ${
                  headerTexts[index] === activeHeader 
                    ? "text-blue-500 font-bold border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 rounded-r-md" 
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => {
                  scrollToAnchor(el);
                  navigate(`#${el}`);
                }}
              >
                <div className="transition-all duration-300 ease-in-out hover:translate-x-1">
                  {headerTexts[index]}
                </div>
              </li>
            ))
          ) : (
            <li className="cursor-pointer pl-4 py-1">无目录</li>
          )}
        </ul>
      </div>
    </Affix>
  );
};
