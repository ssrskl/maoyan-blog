import { createBrowserRouter } from "react-router-dom";
import { TestPageOne } from "@/views/test/page1";
import RootLayouts from "@/layouts/RootLayouts";
import { HomePage } from "@/views/Home/HomePage";
import IndexLayouts from "@/layouts/IndexLayouts";
import { AboutPage } from "@/views/About/AboutPage";
import { NotFoundPage } from "@/views/Error/404NotFoundPage";
import { NotAuthorizedPage } from "@/views/Error/403NotAuthorizedPage";
import { BlogPage } from "@/views/Blog/BlogPage";
import { BlogDetailPage } from "@/views/Blog/Detail/BlogDetailPage";
import { LoginPage } from "@/views/Auth/LoginPage";
import { RegisterPage } from "@/views/Auth/RegisterPage";
import { AdminHomePage } from "@/views/Admin/Home/AdminHomePage";
import { AdminStatisticsPage } from "@/views/Admin/Statistics/AdminStatisticsPage";
import AdminLayouts from "@/layouts/AdminLayouts";
import { AdminTagsPage } from "@/views/Admin/Tags/AdminTagsPage";
import { AdminBlogPage } from "@/views/Admin/Blogs/AdminBlogPage";
import { AdminAddBlogPage } from "@/views/Admin/Blogs/EditBlog/AdminAddBlogPage";
import { loginLoader } from "./loaders/loginLoader";
import { loginAction } from "./actions/loginAction";
import { registerLoader } from "./loaders/registerLoader";
import { registerAction } from "./actions/registerAction";
import { blogLoader } from "./loaders/blogLoader";
import { blogDetailLoader } from "./loaders/blogDetailLoader";
import { TestPage2 } from "@/views/test/page1/TestPage2";
import { BlogPublish } from "@/views/Blog/Publish/BlogPublish";
import CodeHighlightPage from "@/app/code-highlight/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <IndexLayouts />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/blog",
            loader: blogLoader,
            element: <BlogPage />,
          },
          {
            path: "/about",
            element: <AboutPage />,
          },
          {
            path: "/test1",
            element: <TestPageOne />,
          },
          {
            path: "/test2",
            element: <TestPage2 />,
          },
          {
            path: "/code-highlight",
            element: <CodeHighlightPage/>
          },
          {
            path: "/blogdetail/:id",
            loader: blogDetailLoader,
            element: <BlogDetailPage />,
          },
          {
            path: "/blogpublish",
            element: <BlogPublish/>,
          }
        ],
      },
      {
        path: "admin",
        element: <AdminLayouts />,
        children: [
          {
            index: true,
            element: <AdminHomePage />,
          },
          {
            path: "statistics",
            element: <AdminStatisticsPage />,
          },
          {
            path: "tags",
            element: <AdminTagsPage />,
          },
          {
            path: "blogs",
            element: <AdminBlogPage />,
          },
          {
            path: "blogs/add",
            element: <AdminAddBlogPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    loader: loginLoader,
    action: loginAction,
    element: <LoginPage />,
  },
  {
    path: "/register",
    loader: registerLoader,
    action: registerAction,
    element: <RegisterPage />,
  },
  {
    path: "/403",
    element: <NotAuthorizedPage />,
  },
]);

export default router;
