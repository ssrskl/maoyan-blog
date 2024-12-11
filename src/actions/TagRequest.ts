import { fetchTags, fetchTagsByBlogId } from "@/apis/blog/TagAPI";
import { databases } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import useSWR from "swr";

export function useGetTagsByBlogId(blogId: number) {
  const { data, error, isLoading } = useSWR(
    `/tag/blog/${blogId}}`,
    fetchTagsByBlogId
  );
  return { data, error, isLoading };
}

const fetchGetTags = () => {
  try {
    const tags = databases.listDocuments("674ea924002fc5b22567", "t_tag");
    return tags;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.log(error.message);
    }
  }
};

export function useGetTags() {
  const { data, error, isLoading } = useSWR("getTags", fetchGetTags);
  return { data, error, isLoading };
}
