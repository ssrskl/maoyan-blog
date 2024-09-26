import { fetchTags, fetchTagsByBlogId } from "@/apis/blog/TagAPI";
import useSWR from "swr";

export function useGetTagsByBlogId(blogId: number) {
  const { data, error, isLoading } = useSWR(
    `/tag/blog/${blogId}}`,
    fetchTagsByBlogId
  );
  return { data, error, isLoading };
}

export function useGetTags() {
  const { data, error, isLoading } = useSWR("/tag", fetchTags);
  return { data, error, isLoading };
}
