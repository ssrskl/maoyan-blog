import { useGetTags } from "@/actions/TagRequest";
import { BlogEditVO, fetchUpdateBlog } from "@/apis/blog/BlogAPI";
import { ResponseResult } from "@/types/ResponseResult";
import { TTag } from "@/types/TTag";
import { useGetBlogDTOById } from "@/views/Blog/Detail/action/BlogDetailRequest";

import { Form, Input, Modal, Select, Switch, message } from "antd";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";

interface BlogOperatingElementProps {
  id: number;
}
export const BlogOperatingElement = ({ id }: BlogOperatingElementProps) => {
  const [form] = Form.useForm();
  const { data: BlogDTO } = useGetBlogDTOById(id);
  const { data: Tags } = useGetTags();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  const onCreate = (values: BlogEditVO) => {
    values.id = BlogDTO?.data.id;
    values.tags = undefined; // 清理tags数据 TODO
    console.log("表单数据为: ", values);
    const updateResult = fetchUpdateBlog(values);
    updateResult
      .then((res: AxiosResponse<ResponseResult<number>>) => {
        if (res.data.code === 200) {
          messageApi.open({
            type: "success",
            content: "更新成功",
          });
        } else {
          messageApi.open({
            type: "error",
            content: "更新失败" + res.data.msg,
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "更新失败" + err,
        });
      });
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {contextHolder}
      <FaPen
        className="w-8 h-8 p-2 border rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      />
      <FaEye
        className="w-8 h-8 p-2 border rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer"
        onClick={() => {
          window.open(`/blogdetail/${id}`);
        }}
      />
      <FaTrashCan
        className="text-red-500 w-8 h-8 p-2 border rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer"
        onClick={() => {
          messageApi.open({
            type: "error",
            content: "点击了删除按钮" + id,
          });
        }}
      />
      {/* TODO 页面加载与数据加载问题 */}
      {BlogDTO ? (
        <Modal
          title="编辑博客"
          open={open}
          okText="更新"
          cancelText="取消"
          okButtonProps={{ autoFocus: true, htmlType: "submit" }}
          onCancel={() => {
            setOpen(false);
          }}
          modalRender={(dom) => (
            <Form
              layout="vertical"
              form={form}
              name="edit_blog_form"
              initialValues={{ modifier: "public" }}
              clearOnDestroy
              onFinish={(values) => onCreate(values)}
            >
              {dom}
            </Form>
          )}
        >
          <Form.Item<BlogEditVO>
            label="标题"
            name={"title"}
            rules={[{ required: true, message: "请输入标题" }]}
            initialValue={BlogDTO?.data.title}
          >
            <Input />
          </Form.Item>

          <Form.Item<BlogEditVO>
            label="描述"
            name={"description"}
            rules={[{ required: true, message: "请输入描述" }]}
            initialValue={BlogDTO?.data.description}
          >
            <Input />
          </Form.Item>
          <Form.Item<BlogEditVO>
            label="内容"
            name={"content"}
            rules={[{ required: true, message: "请输入内容" }]}
            initialValue={BlogDTO?.data.content}
          >
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
          </Form.Item>

          <Form.Item<BlogEditVO>
            label="状态"
            name={"status"}
            rules={[{ required: true, message: "请选择状态" }]}
            initialValue={BlogDTO?.data.status}
          >
            <Switch checkedChildren={"启用"} unCheckedChildren={"禁用"} />
          </Form.Item>
          <Form.Item<BlogEditVO>
            label="标签"
            name={"tags"}
            rules={[{ required: true, message: "请选择标签" }]}
            initialValue={BlogDTO?.data.tags.map((item: TTag) => item.name)}
          >
            <Select
              mode="tags"
              options={Tags?.data.map((item: TTag) => ({
                value: item.name,
                label: item.name,
              }))}
              style={{ width: "100%" }}
              placeholder="请选择标签"
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
            ></Select>
          </Form.Item>
        </Modal>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
};
