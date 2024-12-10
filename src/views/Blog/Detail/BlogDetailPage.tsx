// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Avatar } from "antd";
import { FaLink, FaLongArrowAltLeft } from "react-icons/fa";
import {
  SiFacebook,
  SiGmail,
  SiSinaweibo,
  SiTencentqq,
  SiTwitter,
  SiWechat,
  SiZhihu,
} from "react-icons/si";
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
// import { BytemdViewer } from "@/components/bytemd";
import { MarkdownTOC } from "./components/MarkdownTOC";
import { ArticleTag } from "./components/ArticleTag";
import { AnimatePresence } from "framer-motion";
import { LinearProgress } from "@/components/Progress";
import { Icon } from "@iconify/react";
import MarkDownViewer from "@/components/MarkDownViewer";

export const BlogDetailPage = () => {
  // 获得博客信息
  const { blog } = useLoaderData();
  // 获得博客ID
  const { id } = useParams();
  const blogId = Number(id);
  const navigate = useNavigate();
  const navigation = useNavigation();
  // 获得博客详细信息
  // const { data: blogDTO, isLoading } = useGetBlogDTOById(
  //   !isNaN(blogId) ? blogId : 0
  // );
  // 博客标签信息
  // const { data: Tags } = useGetTagsByBlogId(!isNaN(blogId) ? blogId : 0);
  return (
    <div className="flex justify-center pt-10">
      <AnimatePresence>
        {navigation.state === "loading" && (
          <LinearProgress classes="w-full absolute top-0 left-0 right-0'" />
        )}
      </AnimatePresence>
      {/* {!blog ? (
        <div className="fle items-center justify-center w-full h-full">
          <Spin tip="加载中..." size="large">
            加载中...
          </Spin>
        </div>
      ) : ( */}
      <div className="grid w-2/3">
        <div
          className="flex items-center gap-2 text-zinc-400 cursor-pointer"
          onClick={() => navigate("/blog")}
        >
          <FaLongArrowAltLeft />
          返回博客
        </div>
        <div className="text-zinc-400 mt-8">
          发布于 星期一，六月 04 2024 71 人浏览过
        </div>
        <h1 className="text-3xl font-bold text-zinc-800 my-8">{blog.title}</h1>
        <p className="text-zinc-400">{blog.description}</p>
        {/**文章正文 */}
        <div className="flex">
          <article className="w-3/4 border-r-2 border-gray-200 pt-16 pr-6">
            {/* <BytemdViewer body={blog.content} /> */}
            <MarkDownViewer content={blog.content} />
          </article>
          <div className="flex flex-col pl-8 pt-8">
            <div className="text-xl my-10">作者</div>
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar
                size={"large"}
                src={"https://avatars.githubusercontent.com/u/18780761?v=4"}
              />
              <div className="flex flex-col space-y-3 ">
                <div className="font-bold text-sm">猫颜</div>
                <div className="text-sm text-zinc-500">
                  一花一世界，一叶一追寻
                </div>
              </div>
            </div>
            <div className="text-xl my-10">分享至</div>
            <ul className="grid grid-cols-4 gap-2">
              <FaLink className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiTencentqq className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiWechat className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiSinaweibo className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />

              <SiTwitter className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiFacebook className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiGmail className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
              <SiZhihu className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
            </ul>
            <MarkdownTOC />
          </div>
        </div>
        {/**标签 */}
        <div className="flex mt-16 space-x-3">
          {blog.tags?.map((tag) => (
            <ArticleTag
              key={tag.$id}
              icon={<Icon icon={tag.tag_icon} className="w-5 h-5" />}
              tagName={tag.tag_name}
            />
          ))}
        </div>
      </div>
      ){/* } */}
    </div>
  );
};
