import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center">
      <div className="h-screen w-full flex flex-col justify-center">
        <Result
          status={"404"}
          title="404"
          subTitle="页面未找到"
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              返回首页
            </Button>
          }
        />
      </div>
    </div>
  );
};
