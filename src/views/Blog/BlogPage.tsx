// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Breadcrumb, Pagination } from "antd";
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from "react-icons/md";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { toFromNow } from "@/lib/time";
import { AnimatePresence } from "framer-motion";
import { LinearProgress } from "@/components/Progress";
import { Icon } from "@iconify/react/dist/iconify.js";

export const BlogPage = () => {
  const { blogs } = useLoaderData();
  let delay = 0;
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);
  // const blogQueryVO: BlogQueryVO = {
  //   pageNum: 1,
  //   pageSize: 10,
  // };
  const navigate = useNavigate();
  const navigation = useNavigation();
  // const { data: responseResult } = useGetBlogDTOs(blogQueryVO);
  // const BlogDTOs = responseResult?.data;
  return (
    <div className="flex justify-center pt-10">
      <AnimatePresence>
        {navigation.state === "loading" && (
          <LinearProgress classes="w-full absolute top-0 left-0 right-0'" />
        )}
      </AnimatePresence>
      <div className="flex w-2/3">
        <div className="gap-5 flex flex-col justify-center px-6 w-full">
          <Breadcrumb
            items={[
              {
                title: "首页",
              },
              {
                title: "博客",
              },
            ]}
          />
          <h1 className="text-4xl font-bold my-4">博客</h1>
          <p>这里是写的一些博客文章</p>

          {/* 博客文章列表 */}

          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 w-full">
            {blogs ? (
              blogs.documents.map((blog) => (
                <li
                  key={blog.$id}
                  className="animate-fade-up animate-ease-in-out hover:shadow-lg rounded-lg"
                  style={{
                    animationDelay: `${getDelay()}ms`,
                  }}
                >
                  <div
                    className="flex flex-col rounded-lg bg-white h-full hover:bg-stone-200 p-4 cursor-pointer"
                    onClick={() => {
                      navigate("/blogdetail/" + blog.$id);
                    }}
                  >
                    <div className="flex items-center h-6 space-x-2">
                      {blog.tags &&
                        blog.tags.map((tag) => (
                          <div className="text-gray-400 text-sm flex gap-1">
                            <p className="text-gray-400 text-sm">
                              # {tag.tag_name}
                            </p>
                            <Icon icon={tag.tag_icon} className="w-4 h-4" />
                          </div>
                        ))}
                    </div>

                    <h3 className="text-2xl mt-1">{blog.title}</h3>
                    <p className="my-3">{blog.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <MdOutlineDateRange />
                        {toFromNow(Date.parse(blog.$createdAt))}
                      </div>
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <MdOutlineRemoveRedEye />
                        71
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>暂无数据</div>
            )}
          </ul>

          {/**分页器 */}
          <div className="flex justify-center mt-16">
            <Pagination total={2} showSizeChanger={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
