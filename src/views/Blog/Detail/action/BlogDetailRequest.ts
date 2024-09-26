import useSWR from "swr";
import { fetchBlogDTOById } from "@/apis/blog/BlogAPI";
import { fetchTagsByBlogId } from "@/apis/blog/TagAPI";

export function useGetBlogDTOById(id: number) {
  const { data, error, isLoading } = useSWR(
    `/blog-detail/${id}`,
    fetchBlogDTOById
  );
  return { data, error, isLoading };
}

export function useGetTagsByBlogId(id: number) {
  const { data, error, isLoading } = useSWR(`/tag/blog/${id}`, fetchTagsByBlogId);
  return { data, error, isLoading };
}
