import Login from '../Component/Login/login';
import Admin from "../Component/AdminModules/AdminHeader/AdminHeader";
import SignUp from "../Component/Signup/Signup";



var indexRoutes = [
  { path: "/login", name: "Login", component: Login, isPrivate: false },
  { path: "/signUp", name: "Sign Up", component: SignUp, isPrivate: false },

  { path: "/admin", name: "Admin", component: Admin, isPrivate: true, exact: false },
];

export default indexRoutes;
// ^1.0.0-beta.5