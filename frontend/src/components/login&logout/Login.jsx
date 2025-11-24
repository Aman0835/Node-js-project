import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import { addUser } from "../../utils/UserSlice";
import BASE_URL from "../../utils/constants";


const Login = () => {
  const [emailId, setEmailId] = useState("4ad@mon.com");
  const [password, setPassword] = useState("Aman9029!");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const req = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(req.data));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.error(error);
    }
  };


  const handleSignup = () => {
    navigate("/signup");
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          <p className="text-red-600">{error}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-2">
            No account?{" "}
            <Link to="/signup" className="underline text-blue-600" onClick={handleSignup}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
