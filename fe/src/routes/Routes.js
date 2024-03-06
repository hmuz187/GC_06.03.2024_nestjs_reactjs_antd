import {
  A_Dashboard,
  A_DefaultLayoutAdmin,
  C_About,
  C_Blog,
  C_CommingSoon,
  C_Contact,
  C_Page404,
  C_Page403,
  C_Shop,
} from "../containers";
import {
  C_DefaultLayoutClient,
  C_Home,
  C_Login,
  C_Signup,
  C_ForgotPassword,
} from "../containers";
import {isLogin} from '../auth/isLogin';
import {isAdmin} from '../auth/isAdmin';


export const AdminRoutes = [
  {
    path: "/admin/dashboard",
    component: isAdmin() ? A_Dashboard : C_Page403,
    layout: isAdmin() ? A_DefaultLayoutAdmin : null,
  },
  {
    path:'/admin/login',
    component: isAdmin() ? A_Dashboard : C_Login,
    layout: isAdmin() ? A_DefaultLayoutAdmin : null,
  }
];

export const ClientRoutes = [
  { path: "/", component: C_Home},
  { path: "/home", component: C_Home},
  { path: "/login", component: isLogin() ? C_Home : C_Login },
  { path: "/signup", component: isLogin() ? C_Home : C_Signup },
  { path: "/forgotpassword", component: C_ForgotPassword },
  { path: "/about", component: C_About, layout: C_DefaultLayoutClient },
  { path: "/contact", component: C_Contact, layout: C_DefaultLayoutClient },
  { path: "/shop", component: C_Shop, layout: C_DefaultLayoutClient },
  { path: "/blog", component: C_Blog, layout: C_DefaultLayoutClient },
  { path: "/baby-Products", component: C_CommingSoon},
  { path: "/mom-Products", component: C_CommingSoon},
  { path: "/women-Products", component: C_CommingSoon},
  { path: "/recent-Posts", component: C_CommingSoon},
  { path: "/recommend-Post", component: C_CommingSoon},
  { path:"/*", component: C_Page404}
];
