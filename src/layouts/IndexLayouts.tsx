import { useGetCurrentUser } from "@/actions/AuthRequest";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/navbar";
import { setUser } from "@/store/userStore";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function IndexLayouts() {
  const { data: user } = useGetCurrentUser();
  const dispatch = useDispatch();
  let user_info: User = {};
  user_info.id = user?.$id;
  user_info.email = user?.email;
  user_info.username = user?.name;
  user_info.avatar = user?.prefs.avatar;
  user_info.intro = user?.prefs.intro;
  dispatch(setUser(user_info));
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default IndexLayouts;
