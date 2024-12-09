import { useMount, useUpdateEffect } from "ahooks";
import { Affix } from "antd";
import { load } from "cheerio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MarkdownTOC = () => {
  const navigate = useNavigate();
  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const [activeHeader, setActiveHeader] = useState<string>(""); // 当前激活的header

  useMount(() => {
    const markdownBodyElement = document.querySelector(".markdown-content")!;
    const $ = load(markdownBodyElement.innerHTML);
    const h2Elems = $("h2");
    const ids = [];
    h2Elems.each((i, elem) => {
      const anchorId = $(elem).attr("id");
      ids.push(anchorId);
    });
    setHeaderIds(ids); // 更新目录的标题 ID
  });
  // 点击目录跳转到对应header
  const scrollToAnchor = (anchorId: string) => {
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      window.scrollTo({
        top: anchorElement.offsetTop - 80,
        behavior: "smooth",
      });
      // anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 处理滚动事件，更新activeHeader
  const handleScroll = () => {
    const h2Elems = document.querySelectorAll(".markdown-content h2");
    console.log(h2Elems);
    let currentHeader = "";
    // 遍历所有 h2 元素，找到当前视口中最接近顶部的 h2
    h2Elems.forEach((h2) => {
      const rect = h2.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        currentHeader = h2.textContent || "";
      }
    });
    // 更新高亮状态
    if (currentHeader !== activeHeader) {
      setActiveHeader(currentHeader);
      console.log("当前最近的" + currentHeader);
    }
  };

  useUpdateEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeHeader]);
  return (
    <Affix offsetTop={100}>
      <div>
        <div className="text-xl my-10">目录</div>
        <ul className="flex flex-col space-y-3 text-zinc-500">
          {headerIds.length > 0 ? (
            headerIds.map((el) => (
              <li
                key={el}
                className="cursor-pointer hover:font-bol"
                onClick={() => {
                  scrollToAnchor(el);
                  navigate(`#${el}`);
                }}
              >
                {el}
              </li>
            ))
          ) : (
            <li className="cursor-pointer">无目录</li>
          )}
        </ul>
      </div>
    </Affix>
  );
};
