import {createBrowserRouter} from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Todo from "../pages/Todo/Todo";
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
      element:<Todo></Todo>
    },
  ]);

export default router;
