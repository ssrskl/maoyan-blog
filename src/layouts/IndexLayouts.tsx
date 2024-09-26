import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/navbar";
import { Outlet } from "react-router-dom";

function IndexLayouts() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

export default IndexLayouts;
