import useSWR from "swr";
import { BlogQueryVO, fetchQueryBlogs } from "@/apis/blog/BlogAPI";

export function useGetBlogs(blogQueryVO: BlogQueryVO) {
  const { data, error, isLoading } = useSWR(blogQueryVO, fetchQueryBlogs);
  return { data, error, isLoading };
}


