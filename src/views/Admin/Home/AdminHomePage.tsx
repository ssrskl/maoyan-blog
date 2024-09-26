import { AdminPageHeader } from "../components/AdminPageHeader";

export const AdminHomePage = () => {
  return (
    <div className="flex flex-col w-full px-16 pt-20">
      <AdminPageHeader
        breadcrumb={[
          {
            title: "管理",
          },
          {
            title: "首页",
          },
        ]}
        title="首页"
        description="欢迎回来，Good good study，Day day up！！！"
      />
    </div>
  );
};
