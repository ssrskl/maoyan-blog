import useSWR from "swr";
import {
  BlogEditVO,
  BlogQueryVO,
  fetchQueryBlogById,
  fetchQueryBlogDTOs,
  fetchQueryBlogs,
  fetchUpdateBlog,
} from "@/apis/blog/BlogAPI";

export function useUpdateBlog(blogEditVO: BlogEditVO) {
  const { data, error, isLoading } = useSWR(blogEditVO, fetchUpdateBlog);
  return { data, error, isLoading };
}
/**
 * 查询博客列表
 * @param blogQueryVO
 * @returns
 */
export function useGetBlogs(blogQueryVO: BlogQueryVO) {
  const { data, error, isLoading } = useSWR(blogQueryVO, fetchQueryBlogs);
  return { data, error, isLoading };
}
export function useGetBlogDTOs(blogQueryVO: BlogQueryVO) {
  const { data, error, isLoading } = useSWR(blogQueryVO, fetchQueryBlogDTOs);
  return { data, error, isLoading };
}

export function useGetBlogById(blogId: number) {
  const { data, error, isLoading } = useSWR(
    `/blog/${blogId}`,
    fetchQueryBlogById
  );
  return { data, error, isLoading };
}
