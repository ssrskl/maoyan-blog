import { useNavigate } from "react-router-dom";
import { AdminPageHeader } from "../../components/AdminPageHeader";
import { Button, Form, Input } from "antd";
import { BytemdEditor } from "@/components/bytemd";
import { useState } from "react";

export const AdminAddBlogPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  return (
    <div className="flex flex-col w-full px-16 pt-20">
      <AdminPageHeader
        breadcrumb={[
          {
            title: "管理",
            onClick: () => {
              navigate("/admin");
            },
            className: "hover:font-bold cursor-pointer",
          },
          {
            title: "博客",
            onClick: () => {
              navigate("/admin/blogs");
            },
            className: "hover:font-bold cursor-pointer",
          },
          {
            title: "添加博客",
            className: "cursor-pointer",
          },
        ]}
        title="添加博客"
        description="书写自己的想法"
      />

      <div className="pt-10 pr-20">
        <Form layout="vertical">
          <Form.Item label="标题">
            <Input placeholder="标题" />
          </Form.Item>

          <Form.Item label="摘要">
            <Input placeholder="摘要" />
          </Form.Item>

          <Form.Item label="封面">
            <Input placeholder="封面链接" />
          </Form.Item>

          {/* 标签 */}

          <Form.Item label="标签">
            <Input placeholder="标签" />
          </Form.Item>

          <Form.Item label="内容">
            <BytemdEditor setContent={setContent} body={content}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary">发布</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
