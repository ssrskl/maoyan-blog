import React, { useEffect, useState } from 'react';
import { BytemdViewer } from '../bytemd/viewer';

const CodeHighlightDemo: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    // 加载示例 Markdown 文件
    fetch('/src/components/bytemd/examples/code-highlight-example.md')
      .then(response => response.text())
      .then(text => {
        setMarkdown(text);
      })
      .catch(error => {
        console.error('加载示例文件失败:', error);
        setMarkdown('# 加载失败\n\n示例文件加载失败，请检查路径和网络连接。');
      });
  }, []);

  return (
    <div className="code-highlight-demo">
      <h1>ByteMD 代码高亮演示</h1>
      <div className="description">
        <p>
          这个演示展示了在 ByteMD 中实现类似 Docusaurus 的代码行高亮功能。
          支持两种高亮方式：
        </p>
        <ul>
          <li>
            <strong>元数据语法</strong>：在代码块语言后添加 <code>{'{1,3-5}'}</code> 格式的行号
          </li>
          <li>
            <strong>魔法注释</strong>：在代码中使用特殊注释如 <code>highlight-next-line</code>,
            <code>highlight-start</code>, <code>highlight-end</code>
          </li>
        </ul>
      </div>
      
      <div className="preview">
        <BytemdViewer body={markdown} />
      </div>

      <style>
        {`
        .code-highlight-demo {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .description {
          margin: 2rem 0;
          padding: 1rem;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        
        .preview {
          border: 1px solid #eaeaea;
          border-radius: 5px;
          padding: 1rem;
        }
        
        code {
          background-color: #f0f0f0;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: monospace;
        }
        
        @media (prefers-color-scheme: dark) {
          .description {
            background-color: #1a1a1a;
            border-color: #333;
          }
          
          code {
            background-color: #333;
          }
          
          .preview {
            border-color: #333;
          }
        }
        `}
      </style>
    </div>
  );
};

export default CodeHighlightDemo; 