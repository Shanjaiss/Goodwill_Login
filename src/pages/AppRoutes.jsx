// AppRoutes.jsx
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { App } from "../App";

const QuickAuthController = lazy(() =>
  import("./login/QuickAuth/QuickAuthController")
);
const ChangePasswordController = lazy(() =>
  import("./login/ChangePassword/ChangePasswordController")
);

const AppRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <QuickAuthController />,
      },
      {
        path: "changepassword",
        element: <ChangePasswordController />,
      },
    ],
  },
];

export default AppRoutes;
