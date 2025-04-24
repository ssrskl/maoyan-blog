import { type BytemdPlugin } from "bytemd";
import { load } from "cheerio";

/**
 * 魔法注释插件，支持通过注释来高亮代码行
 * 支持的注释:
 * - highlight-next-line: 高亮下一行
 * - highlight-start: 开始高亮区域
 * - highlight-end: 结束高亮区域
 */
export function magicCommentsPlugin(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const codeBlocks = markdownBody.querySelectorAll("pre code");
      
      codeBlocks.forEach((codeBlock) => {
        const content = codeBlock.textContent || "";
        
        // 检查代码块是否包含魔法注释
        if (
          !content.includes("highlight-next-line") &&
          !content.includes("highlight-start") &&
          !content.includes("highlight-end")
        ) {
          return;
        }
        
        // 分析代码行和语言信息
        const language = Array.from(codeBlock.classList)
          .find((cls) => cls.startsWith("language-"))
          ?.substring(9);
        
        if (!language) return;
        
        // 根据语言确定注释格式
        const commentFormats = getCommentFormats(language);
        if (!commentFormats || commentFormats.length === 0) return;
        
        // 处理代码内容
        const lines = content.split("\n");
        const highlightedLines: number[] = [];
        let inHighlightBlock = false;
        
        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          
          // 检查是否是魔法注释行
          let isMagicComment = false;
          let isHighlightNextLine = false;
          let isHighlightStart = false;
          let isHighlightEnd = false;
          
          // 检查各种注释格式
          for (const format of commentFormats) {
            // 处理 highlight-next-line
            if (
              trimmedLine === `${format.start}highlight-next-line${format.end}` ||
              trimmedLine === `${format.start} highlight-next-line ${format.end}` ||
              trimmedLine === `${format.start} highlight-next-line${format.end}` ||
              trimmedLine === `${format.start}highlight-next-line ${format.end}`
            ) {
              isMagicComment = true;
              isHighlightNextLine = true;
              break;
            }
            
            // 处理 highlight-start
            if (
              trimmedLine === `${format.start}highlight-start${format.end}` ||
              trimmedLine === `${format.start} highlight-start ${format.end}` ||
              trimmedLine === `${format.start} highlight-start${format.end}` ||
              trimmedLine === `${format.start}highlight-start ${format.end}`
            ) {
              isMagicComment = true;
              isHighlightStart = true;
              break;
            }
            
            // 处理 highlight-end
            if (
              trimmedLine === `${format.start}highlight-end${format.end}` ||
              trimmedLine === `${format.start} highlight-end ${format.end}` ||
              trimmedLine === `${format.start} highlight-end${format.end}` ||
              trimmedLine === `${format.start}highlight-end ${format.end}`
            ) {
              isMagicComment = true;
              isHighlightEnd = true;
              break;
            }
          }
          
          // 如果是魔法注释，移除此行
          if (isMagicComment) {
            lines[index] = "";
            
            // 处理高亮逻辑
            if (isHighlightNextLine) {
              // 高亮下一行
              highlightedLines.push(index + 1);
            } else if (isHighlightStart) {
              // 开始高亮区域
              inHighlightBlock = true;
            } else if (isHighlightEnd) {
              // 结束高亮区域
              inHighlightBlock = false;
            }
          } else if (inHighlightBlock) {
            // 如果在高亮区域内，添加当前行到高亮行列表
            highlightedLines.push(index);
          }
        });
        
        // 应用高亮
        if (highlightedLines.length > 0) {
          // 移除空行（魔法注释）
          const cleanedLines = lines.filter((line) => line !== "");
          
          // 调整高亮行索引
          const adjustedHighlightedLines = highlightedLines.map((lineNum) => {
            // 计算有多少空行在当前行之前
            const emptyLinesBefore = lines
              .slice(0, lineNum)
              .filter((line) => line === "").length;
            return lineNum - emptyLinesBefore;
          });
          
          // 应用高亮样式
          const htmlLines = cleanedLines.map((line, index) => {
            if (adjustedHighlightedLines.includes(index)) {
              return `<span class="highlighted-line">${line}</span>`;
            }
            return line;
          });
          
          // 更新代码块内容
          codeBlock.innerHTML = htmlLines.join("\n");
          
          // 添加高亮样式
          if (!document.querySelector('style#magic-comments-style')) {
            const style = document.createElement('style');
            style.id = 'magic-comments-style';
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
            document.head.appendChild(style);
          }
        }
      });
    }
  };
}

/**
 * 根据语言获取注释格式
 */
function getCommentFormats(language: string): Array<{start: string; end: string}> {
  const formats: Record<string, Array<{start: string; end: string}>> = {
    // C-style 语言
    js: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    jsx: [{start: "//", end: ""}, {start: "/*", end: "*/"}, {start: "{/*", end: "*/}"}],
    ts: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    tsx: [{start: "//", end: ""}, {start: "/*", end: "*/"}, {start: "{/*", end: "*/}"}],
    java: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    c: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    cpp: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    csharp: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    
    // 脚本语言
    python: [{start: "#", end: ""}],
    ruby: [{start: "#", end: ""}],
    bash: [{start: "#", end: ""}],
    sh: [{start: "#", end: ""}],
    
    // HTML 风格
    html: [{start: "<!--", end: "-->"}],
    xml: [{start: "<!--", end: "-->"}],
    svg: [{start: "<!--", end: "-->"}],
    
    // 其他
    css: [{start: "/*", end: "*/"}],
    scss: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    less: [{start: "//", end: ""}, {start: "/*", end: "*/"}],
    php: [{start: "//", end: ""}, {start: "/*", end: "*/"}, {start: "#", end: ""}],
  };
  
  // 默认返回所有格式
  const defaultFormats = [
    {start: "//", end: ""},
    {start: "/*", end: "*/"},
    {start: "#", end: ""},
    {start: "<!--", end: "-->"},
    {start: "{/*", end: "*/}"},
  ];
  
  return formats[language] || defaultFormats;
} 