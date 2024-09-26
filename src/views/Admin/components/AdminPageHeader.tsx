import { Breadcrumb } from "antd";

type Item = {
  title: string;
  onClick?: () => void;
  className?: string;
};
interface AdminPageHeaderProps {
  breadcrumb: Item[];
  title: string;
  description: string;
}

export const AdminPageHeader = ({
  breadcrumb,
  title,
  description,
}: AdminPageHeaderProps) => {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <h1 className="text-3xl font-bold mt-10 mb-8">{title}</h1>
      <p className="text-zinc-500">{description}</p>
    </>
  );
};
