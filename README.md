# React开发模板
## 架构设计
Vite+React+TypeScript+Antd+Shadcn/UI+React-Router
## 插件
- axios：网络请求
- react-router-dom：路由
- dayjs：时间处理
- lodash：工具库
- swr：数据请求
- antd：UI组件
- ahooks：React Hooks库
- react-icons 图标库
- cheerio 解析HTML


## 问题解决
### Antd与TailwindCSS冲突
[Antd兼容三方样式库](https://ant-design.antgroup.com/docs/react/compatible-style-cn#%E5%85%BC%E5%AE%B9%E4%B8%89%E6%96%B9%E6%A0%B7%E5%BC%8F%E5%BA%93)
```css
@layer tailwind-base, antd;

@layer tailwind-base {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
```
