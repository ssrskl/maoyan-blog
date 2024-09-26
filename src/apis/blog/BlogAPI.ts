import request from "@/lib/request.ts";
import { BlogDTO } from "@/types/Blog";
import { ResponseResult } from "@/types/ResponseResult";

export type BlogQueryVO = {
  pageNum: number;
  pageSize: number;
  id?: number;
  title?: string;
  status?: number;
  createTime?: string;
  updateTime?: string;
  typeId?: number;
  authorId?: number;
  content?: string;
};

export type BlogEditVO = {
  id: number;
  title?: string;
  description?: string;
  status?: number;
  typeId?: number;
  content?: string;
  tags?: string[];
};

export const fetchUpdateBlog = (blogEditVO: BlogEditVO) => {
  return request({
    url: "/blog/update",
    method: "POST",
    data: blogEditVO,
  });
};

export const fetchBlogDTOById = (url: string) => {
  return request({
    url: url,
    method: "GET",
  });
};

export const fetchQueryBlogs = (blogQueryVO: BlogQueryVO) => {
  return request({
    url: "blog",
    method: "GET",
    params: blogQueryVO,
  });
};
export const fetchQueryBlogDTOs = (
  blogQueryVO: BlogQueryVO
): Promise<ResponseResult<BlogDTO[]>> => {
  return request({
    url: "blog-detail",
    method: "GET",
    params: blogQueryVO,
  });
};

export const fetchQueryBlogById = (url: string) => {
  return request({
    url: url,
    method: "GET",
  });
};
