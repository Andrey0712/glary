import React from "react";

const HomePage = React.lazy(() => import("../cocmponents/home"));
const CartDialog = React.lazy(() => import("../cocmponents/home/cartDialog"));
const CheckOut = React.lazy(() => import("../cocmponents/home/CheckOut"));
const LoginPage = React.lazy(() => import("../cocmponents/auth/Login"));
const RegisterPage = React.lazy(() => import("../cocmponents/auth/Register"));
const NoMatch = React.lazy(() => import("../cocmponents/NoMatch"));
const About = React.lazy(() => import("../cocmponents/about"));
const News = React.lazy(() => import("../cocmponents/news"));
const RegisterShow = React.lazy(() => import("../cocmponents/show"));
const ProfilePage = React.lazy(() => import("../cocmponents/profile"));

const defaultRoutes = [
  { path: "/noMatch", exact: true, component: NoMatch },
  { path: "/about", exact: true, component: About },
  { path: "/news", exact: true, component: News },

  {
    path: "/RegisterShow",
    exact: true,
    name: "Реєстрація на виставку",
    component: RegisterShow,
  },
  { path: "/", exact: true, name: "Головна", component: HomePage },
  //{ path: '/cart', exact: true, component: CartDialog  },
  { path: "/login", exact: true, name: "Вхід", component: LoginPage },
  {
    path: "/register",
    exact: true,
    name: "Реєстрація",
    component: RegisterPage,
  },
  {
    path: "/profile",
    exact: true,
    name: "Профаил",
    component: ProfilePage,
  },
  //{ path: '/сheckOut', exact: true,name: 'Замовленя', component: CheckOut  }
];
export default defaultRoutes;
