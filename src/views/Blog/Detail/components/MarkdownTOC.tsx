import { useMount } from "ahooks";
import { Affix } from "antd";
import { load } from "cheerio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MarkdownTOC = () => {
  const navigate = useNavigate();
  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useMount(() => {
    const markdownBodyElement = document.querySelector(".markdown-body")!;
    const $ = load(markdownBodyElement.innerHTML);
    const h2Elems = $("h2");
    const ids = [];
    for (const h2 of h2Elems) {
      const id = h2.attribs.id;
      if (id) {
        ids.push(id);
      }
    }
    setHeaderIds(ids);
  });
  const scrollToAnchor = (anchorId: string) => {
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Affix offsetTop={100}>
      <div>
        <div className="text-xl my-10">目录</div>
        <ul className="flex flex-col space-y-3 text-zinc-500">
          {headerIds.length > 0 ? (
            headerIds.map((el) => (
              <li
                key={el}
                className="cursor-pointer hover:font-bold"
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
