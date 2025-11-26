import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/UserSlice";
import Navbar from "./navbar/Navbar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (userData && userData._id) return;

    try {
      const req = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(req.data));
    } catch (error) {
      if (error.response?.status === 401) {
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          navigate("/login");
        }
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const publicRoutes = ["/login", "/signup"];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }
    fetchUser();
  }, [location.pathname]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
