import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./../../utils/connection";
import BASE_URL from "./../../utils/constants";

function capitalizeFirst(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const Connection = () => {
  const userConnection = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userConnection) return;

  if (userConnection.length < 0) {
    return (
      <h1 className="flex justify-center items-center h-[calc(100vh-4rem)] text-4xl font-bold">
        No connection found !!!!
      </h1>
    );
  }

  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <div className="text-center  gap-2  h-[calc(100vh-4rem)]">
      <div className="text-3xl font-bold pt-4 underline">Connnection</div>
      <div className="">
        {userConnection.map((userConnection, index) => {
          const { firstName, lastName, profilePic, age, about } =
            userConnection;
          const num = index + 1;

          return (
            <div
              key={index}
              className="flex  gap-4 mt-10 bg-base-200 rounded-4xl  p-6 w-1/2 mx-auto  ">
              <div className="text-[4rem] text-[#A29E9A] font-bold  w-1/10">
                {num}
              </div>
              <div className="avatar avatar-placeholder ">
                <div className="bg-neutral  w-24 rounded-full">
                  <img src={profilePic} alt="profile pic" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2  justify-center w-full ">
                <p className="text-2xl font-bold  ">
                  {capitalizeFirst(firstName) + " " + capitalizeFirst(lastName)}
                </p>
                <p className="text-neutral-content">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
