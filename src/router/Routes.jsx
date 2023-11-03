import {createBrowserRouter} from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Todo from "../pages/Todo/Todo";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Form from "../components/Form";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
  const router = createBrowserRouter([
    {
      path: "/signup",
      element:<Signup></Signup>
    },
    {
      path: "/",
      element:<Login></Login>
    },
    {
      path: "/todo",
      element:<PrivateRoute><Todo></Todo></PrivateRoute>
    },
    {
      path: "/form",
      element:<Form></Form>
    },
    {
      path: "/profile",
      element:<Profile></Profile>
    },
    {
      path: "/settings",
      element:<Settings></Settings>
    },
  ]);

export default router;
