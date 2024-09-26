import { Breadcrumb, Pagination } from "antd";
import { SiTailwindcss } from "react-icons/si";
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BlogQueryVO } from "@/apis/blog/BlogAPI";
import { BlogDTO } from "@/types/Blog";
import { toFromNow } from "@/lib/time";
import { useGetBlogDTOs } from "@/actions/BlogRequest";

export const BlogPage = () => {
  let delay = 0;
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);
  const blogQueryVO: BlogQueryVO = {
    pageNum: 1,
    pageSize: 10,
  };
  const navigate = useNavigate();
  const { data: responseResult } = useGetBlogDTOs(blogQueryVO);
  const BlogDTOs = responseResult?.data;
  return (
    <div className="flex justify-center pt-10">
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
            {BlogDTOs ? (
              BlogDTOs.map((blogDTO: BlogDTO) => (
                <li
                  key={blogDTO.id}
                  className="animate-fade-up animate-ease-in-out hover:shadow-lg rounded-lg"
                  style={{
                    animationDelay: `${getDelay()}ms`,
                  }}
                >
                  <div
                    className="flex flex-col rounded-lg bg-white hover:bg-stone-200 p-4 cursor-pointer"
                    onClick={() => {
                      navigate("/blogdetail/" + blogDTO.id);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-400 text-xs"># TailWind CSS</p>
                      <SiTailwindcss />
                    </div>
                    <h3 className="text-2xl mt-1">{blogDTO.title}</h3>
                    <p className="my-3">{blogDTO.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <MdOutlineDateRange />
                        {toFromNow(Date.parse(blogDTO.createTime))}
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
