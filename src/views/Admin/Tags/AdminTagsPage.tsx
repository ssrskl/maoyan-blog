import { AdminPageHeader } from "../components/AdminPageHeader";

export const AdminTagsPage = () => {
  return (
    <div className="flex flex-col w-full px-16 pt-20">
      <AdminPageHeader
        breadcrumb={[
          {
            title: "管理",
          },
          {
            title: "标签",
          },
        ]}
        title="标签"
        description="管理标签"
      />
    </div>
  );
};
