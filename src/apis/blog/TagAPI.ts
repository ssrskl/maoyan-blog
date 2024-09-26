import request from "@/lib/request";

export type Tag = {
  id: number;
  name: string;
  icon: string;
  status: boolean;
  createTime: string;
  updateTime: string;
};

/**
 * 获取标签列表
 */
export const fetchTags = () => {
  return request({
    url: "/tag",
    method: "get",
  });
};

export const fetchTagById = (url: string) => {
  return request({
    url: url,
    method: "get",
  });
};

export const fetchTagsByBlogId = (url: string) => {
  return request({
    url: url,
    method: "get",
  });
};
