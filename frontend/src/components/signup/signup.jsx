import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/UserSlice";
import BASE_URL from "../../utils/constants";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState("");
  const [profileurl, setProfileurl] = useState("");

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const req = await axios.post(
        BASE_URL + "/signup",
        {
          email: emailId,
          password,
          firstName,
          lastName,
          profileurl,
          gender,
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-neutral-content w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-zinc-800">Signup</h2>

          <div>
            <legend className="fieldset-legend text-zinc-800">
              First Name
            </legend>
            <input
              type="text"
              value={firstName}
              className="input"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">
                Last Name
              </legend>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">Gender</legend>
              <input
                type="text"
                value={gender}
                className="input"
                placeholder="Gender ex(male,female,other)"
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">
                Profile Url
              </legend>
              <input
                type="text"
                value={profileurl}
                className="input"
                placeholder="Enter your profile url"
                onChange={(e) => setProfileurl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">
                Email Id
              </legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">
                Password
              </legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-zinc-800">
                {" "}
                Confirm Password
              </legend>
              <input
                type="password"
                value={confirmPassword}
                className="input"
                placeholder="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </fieldset>
          </div>

          <p className="text-red-600">{error}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary " onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-2">
            already have account Log in?{" "}
            <Link to="/Login" className="underline text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
