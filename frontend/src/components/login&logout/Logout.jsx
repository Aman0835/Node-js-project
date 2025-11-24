import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/UserSlice";
import BASE_URL from "../../utils/constants";
import Button from "./button.jsx";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelclick = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center mt-80">
      <Button name1="Logout" name2="Sure" onclick={handelclick} />
    </div>
  );
};

export default Logout;
