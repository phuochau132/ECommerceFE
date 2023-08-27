import {
  Cart,
  Profile,
  Product,
  Recruitment,
  Home,
  Contact,
  Register,
  Login,
  Checkout,
  Detail,
} from "../pages";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/product/:idPage", component: Product },
  { path: "/recruitment", component: Recruitment },
  { path: "/contact", component: Contact },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/detail/:id", component: Detail },
];

const authRoutes = [];
const privateRoutes = [{ path: "/profile", component: Profile }];

export { publicRoutes, privateRoutes, authRoutes };
