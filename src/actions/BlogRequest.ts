import useSWR from "swr";
import {
  BlogEditVO,
  BlogQueryVO,
  fetchQueryBlogById,
  fetchQueryBlogDTOs,
  fetchUpdateBlog,
} from "@/apis/blog/BlogAPI";
import { databases } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

export function useUpdateBlog(blogEditVO: BlogEditVO) {
  const { data, error, isLoading } = useSWR(blogEditVO, fetchUpdateBlog);
  return { data, error, isLoading };}


const fetchGetBlogs = () => {
  try{
    const data =  databases.listDocuments(
      '674ea924002fc5b22567',
      '674ea93300318c2482e7'
    );
    return data;
  }catch(error){
    if(error instanceof AppwriteException){
      console.error(error.message);
    }
  }
}
export function useGetBlogs() {
  const { data, error, isLoading } = useSWR('get-blogs', fetchGetBlogs);
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
