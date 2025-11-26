import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../utils/constants.js";
import { addUser } from "../../utils/UserSlice.js";
import Card from "./../feed/card";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [showTost, setShowToest] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAbout(user.about || "");
      setGender(user.gender || "");
      setProfilePic("");
      setAge(user.age || "");
    }
  }, [user]);

  const updateData = async () => {
    setError("");

    try {
      const update = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          about,
          profilePic,
          age,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(update?.data?.data));
      setShowToest(true);
      setTimeout(() => {
        setShowToest(false);
      }, 2000);
    } catch (error) {
      setError("Male,Female,Others");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center  items-center gap-4  h-[calc(100vh-4rem)]">
      <div className="flex-col gap-4 w-96">
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender (e.g., Male, Female)"
          className="input input-bordered"
          value={gender}
          onChange={(e) => setGender(e.target.value.toLowerCase())}
        />
        <p className="text-red-600">{error}</p>
        <input
          type="text"
          placeholder=" Enter your age"
          className="input input-bordered"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Pic"
          className="input input-bordered"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input
          type="text"
          placeholder="About"
          className="input input-bordered"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <button className="btn btn-primary" onClick={updateData}>
          Update
        </button>
      </div>
      {showTost && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profiled save successfully.</span>
          </div>
        </div>
      )}
      {user && <Card user={user} />}
    </div>
  );
};

export default Profile;
