import React from "react";

const UsersPage = React.lazy(() => import("../cocmponents/userlist"));

const MainAdminPage = React.lazy(() => import("../cocmponents/admin"));
const RegisterProduct = React.lazy(() =>
  import("../cocmponents/admin/RegisterProduct")
);
const EditProduct = React.lazy(() =>
  import("../cocmponents/admin/EditProduct")
);
const EditRun = React.lazy(() => import("../cocmponents/admin/EditRun"));
const EditShow = React.lazy(() => import("../cocmponents/admin/EditShow"));
const OdersPage = React.lazy(() => import("../cocmponents/admin/Oders"));
const CactPage = React.lazy(() => import("../cocmponents/admin/Oders/cac"));
const CacibPage = React.lazy(() => import("../cocmponents/admin/Oders/cacib"));
const RunLine = React.lazy(() => import("../cocmponents/admin/RunLine"));
const RunLinePage = React.lazy(() =>
  import("../cocmponents/admin/RunLine/DataTableRunLine")
);
const OderItemsPage = React.lazy(() =>
  import("../cocmponents/admin/Oders/orderItems")
);

const adminRoutes = [
  {
    path: "/admin/oderlist",
    exact: true,
    name: "Замовленя",
    component: OdersPage,
  },
  {
    path: "/admin/RunLine",
    exact: true,
    name: "Бігуща строка",
    component: RunLine,
  },
  {
    path: "/admin/RunLine/DataTableRunLine",
    exact: true,
    name: "Бігуща строка",
    component: RunLinePage,
  },
  {
    path: "/admin/Oders/orderItems",
    exact: true,
    name: "Перелік замовлень",
    component: OderItemsPage,
  },
  {
    path: "/admin/Oders/cac",
    exact: true,
    name: "Перелік заявок CAC",
    component: CactPage,
  },
  {
    path: "/admin/Oders/cacib",
    exact: true,
    name: "Перелік заявок CACIB",
    component: CacibPage,
  },
  {
    path: "/admin/userlist",
    exact: true,
    name: "Користувачі",
    component: UsersPage,
  },

  {
    path: "/admin/RegisterProduct",
    exact: true,
    name: "Додати товар",
    component: RegisterProduct,
  },
  {
    path: "/admin/EditProduct",
    exact: true,
    name: "Редагувати товар",
    component: EditProduct,
  },
  {
    path: "/admin/EditRun",
    exact: true,
    name: "Редагувати товар",
    component: EditRun,
  },
  {
    path: "/admin/EditShow",
    exact: true,
    name: "Редагувати товар",
    component: EditShow,
  },
  { path: "/admin", exact: true, name: "Головна", component: MainAdminPage },
];
export default adminRoutes;
