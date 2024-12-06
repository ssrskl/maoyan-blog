import React from "react";
import ReactDOM from "react-dom/client";
import "../app/globals.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Provider } from "react-redux";
import userStore from "@/store/userStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={userStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
