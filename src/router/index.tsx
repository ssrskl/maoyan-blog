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
import { LoginPage } from "@/views/Login/LoginPage";
import { AdminHomePage } from "@/views/Admin/Home/AdminHomePage";
import { AdminStatisticsPage } from "@/views/Admin/Statistics/AdminStatisticsPage";
import AdminLayouts from "@/layouts/AdminLayouts";
import { AdminTagsPage } from "@/views/Admin/Tags/AdminTagsPage";
import { AdminBlogPage } from "@/views/Admin/Blogs/AdminBlogPage";
import { AdminEditBlogPage } from "@/views/Admin/Blogs/EditBlog/AdminEditBlogPage";
import { AdminAddBlogPage } from "@/views/Admin/Blogs/EditBlog/AdminAddBlogPage";

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
            path: "/blogdetail/:id",
            element: <BlogDetailPage />,
          },
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
    element: <LoginPage />,
  },
  {
    path: "/403",
    element: <NotAuthorizedPage />,
  },
]);

export default router;
