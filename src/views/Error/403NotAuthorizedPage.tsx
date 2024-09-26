import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotAuthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center">
      <div className="h-screen w-full flex flex-col justify-center">
        <Result
          status={"403"}
          title="403"
          subTitle="权限不足，请联系管理员"
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
