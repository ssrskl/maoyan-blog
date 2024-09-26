import { useGetBlogDTOs } from "@/actions/BlogRequest";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { BlogQueryVO } from "@/apis/blog/BlogAPI";
import { Button, Form, Input, Table, Tag } from "antd";
import { TimeFormatter } from "@/lib/time";
import { useNavigate } from "react-router-dom";
import { BlogOperatingElement } from "./components/BlogOperatingElement";
import { User } from "@/types/User";
import { TTag } from "@/types/TTag";

export const AdminBlogPage = () => {
  // 查询博客详细信息列表
  const blogQueryVO: BlogQueryVO = {
    pageNum: 1,
    pageSize: 10,
  };
  const { data: BlogDTOs } = useGetBlogDTOs(blogQueryVO);

  console.log(BlogDTOs);

  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: (content: string) => {
        return <>{content.slice(0, 20)}</>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return (
          <>
            {status === 1 ? (
              <Tag color="green">启用</Tag>
            ) : (
              <Tag color="red">禁用</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (author: User) => {
        return <>{author.username}</>;
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: Array<TTag>) => {
        return (
          <>
            {tags.map((tag) => {
              return (
                <Tag key={tag.id} color="blue">
                  {tag.name}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (createTime: string) => {
        return <>{TimeFormatter(new Date(createTime))}</>;
      },
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (updateTime: string) => {
        return <>{TimeFormatter(new Date(updateTime))}</>;
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_: any, recoder: any) => {
        return <BlogOperatingElement id={recoder.id} />;
      },
    },
  ];

  return (
    <div className="flex flex-col w-full px-16 pt-20">
      <AdminPageHeader
        breadcrumb={[
          {
            title: "管理",
          },
          {
            title: "博客",
          },
        ]}
        title="博客"
        description="书写自己的想法"
      />
      <Form labelCol={{ span: 4 }} layout="inline" className="my-8">
        <Form.Item label="标题" name={"title"}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name={"title2"}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name={"title3"}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name={"title4"}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary">查询</Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              navigate("/admin/blogs/add");
            }}
          >
            新增
          </Button>
        </Form.Item>
      </Form>

      {BlogDTOs ? (
        <Table columns={columns} dataSource={BlogDTOs?.data} />
      ) : (
        <div>加载中</div>
      )}
    </div>
  );
};
