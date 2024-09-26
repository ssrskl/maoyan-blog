import { SideNav } from "@/components/navbar/sidenav";
import { Outlet } from "react-router-dom";

function AdminLayouts() {
  return (
    <div className="flex bg-black">
      <SideNav />
      <section className="flex-1 bg-background lg:rounded-tl-[2.5em] overflow-clip">
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayouts;
