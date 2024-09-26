import { Outlet } from "react-router-dom";

function RootLayouts() {
  return (
    <div className="overflow-x-clip">
      <Outlet />
    </div>
  );
}

export default RootLayouts;
