/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { type BytemdPlugin } from "bytemd";
import { load } from "cheerio";
import { isNil } from "lodash-es";
// 支持大部分语言高亮，体积更大
import { bundledLanguages, codeToHtml } from "shiki/bundle-full.mjs";

// 仅支持部分语言高亮，体积更小
// import { codeToHtml } from 'shiki/bundle-full.mjs';

/**
 * 代码灵感来源：https://github.com/bytedance/bytemd/issues/34
 */
/**
 * ByteMD plugin to show the code block with shiki
 * @param options The options for shiki
 */
export function shikiPlugin(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const els = markdownBody.querySelectorAll<HTMLElement>("pre>code");
      if (els.length === 0) return;
      
      els.forEach(async (el) => {
        // 分析语言和高亮行信息
        const classNameMatch = el.className.match(/language-(\w+)(?:\s+{([^}]+)})?/);
        if (!classNameMatch) return;
        
        const lang = classNameMatch[1];
        const highlightLines = classNameMatch[2] ? parseHighlightLines(classNameMatch[2]) : [];
        
        // 当没有匹配到语言时，使用文本文件（txt也可以上plain或者text）兜底
        // 参考：https://shiki.style/languages#special-languages
        const langToUse = Object.keys(bundledLanguages)
          .map((name) => name.toLowerCase())
          .includes(lang.toLowerCase())
          ? lang
          : "txt";
        
        el.className = `${el.className.replace(/\s+{([^}]+)}/, '')} shiki-code`;
        const codeGet = el.textContent || "";

        // codeToHtml生成的字符串 => <pre class="shiki xxx"><code>xxxx</code></pre>
        // 需要再次解析，拿到其中的 class style等属性和里面的code内容
        // 然后全部复制给当前代码块的pre标签
        const code = await codeToHtml(codeGet, {
          lang: langToUse,
          themes: {
            light: "vitesse-light",
            dark: "vitesse-black",
          },
          // transformer 有啥用看这个链接：https://shiki.style/packages/transformers#install
          transformers: [
            // diff 高亮
            transformerNotationDiff(),
            transformerNotationDiff(),

            // 单词高亮
            transformerNotationWordHighlight(),
            transformerMetaWordHighlight(),

            // 代码行高亮
            transformerNotationHighlight(),
            transformerMetaHighlight(),
          ],
        });

        // 用cheerio解析codeToHtml生成的html字符串
        const $ = load(code);
        
        if (!isNil(el.parentElement)) {
          // 把解析后的属性及内容全部复制给当前匹配到的代码块的pre标签
          const obj = $("pre").attr();
          if (obj) {
            Object.entries(obj).forEach(([k, v]) => {
              el.parentElement!.setAttribute(k, v);
            });
          }
          
          // 获取代码内容的HTML
          const codeHtml = $("pre>code").html() || "";
          
          // 应用行高亮
          if (highlightLines.length > 0) {
            const codeLines = codeHtml.split('\n');
            const highlightedLines = codeLines.map((line, index) => {
              // 行号从1开始，但数组索引从0开始
              if (highlightLines.includes(index + 1)) {
                return `<span class="highlighted-line">${line}</span>`;
              }
              return line;
            });
            
            el.parentElement.innerHTML = highlightedLines.join('\n');
            
            // 添加自定义CSS
            const style = document.createElement('style');
            style.textContent = `
              .highlighted-line {
                display: block;
                background-color: rgba(255, 255, 200, 0.2);
                margin: 0 -1rem;
                padding: 0 1rem;
                border-left: 3px solid #f8c555;
              }
              [data-theme='dark'] .highlighted-line {
                background-color: rgba(255, 255, 100, 0.1);
              }
            `;
            
            if (!document.querySelector('style#shiki-highlight-style')) {
              style.id = 'shiki-highlight-style';
              document.head.appendChild(style);
            }
          } else {
            el.parentElement.innerHTML = codeHtml;
          }
        }
      });
    }
  };
}

/**
 * 解析高亮行信息的助手函数
 * 支持格式: {1,4-6,11}
 * @param highlightInfo 高亮行信息字符串
 * @returns 高亮行号数组
 */
function parseHighlightLines(highlightInfo: string): number[] {
  const lines: number[] = [];
  
  // 按逗号分割不同部分
  const parts = highlightInfo.split(',');
  
  for (const part of parts) {
    if (part.includes('-')) {
      // 处理范围，如 "4-6"
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      // 处理单行，如 "1"
      lines.push(Number(part));
    }
  }
  
  return lines;
}
