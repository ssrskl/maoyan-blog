import { TTag } from "./TTag";
import { User } from "./User";

export type Blog = {
  id: number;
  key: string; // 唯一标识
  title: string;
  content: string;
  firstPicture: string;
  description: string;
  status: boolean;
  createTime: string;
  updateTime: string;
  typeId: number;
  authorId: number;
};

export type BlogDTO = {
  id: number;
  key: string; // 唯一标识
  title: string;
  content: string;
  firstPicture: string;
  description: string;
  status: boolean;
  createTime: string;
  updateTime: string;
  typeId: number;
  authorId: number;
  author: User;
  tags: Array<TTag>;
};
