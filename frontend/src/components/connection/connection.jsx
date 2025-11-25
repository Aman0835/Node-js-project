import axios from "axios";
import { useEffect, useState} from "react";
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
  const [loading, setLoading] = useState(true);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (loading) {
    return (
        <h1 className="flex justify-center items-center h-[calc(100vh-4rem)] text-3xl font-bold text-gray-500">
            Loading requests...
        </h1>
    );
  }
  if (userConnection.length === 0) {
    return (
      <h1 className="flex justify-center items-center h-[calc(100vh-4rem)] text-4xl font-bold">
        No connection found !!!!
      </h1>
    );
  }

  return (
    <div className="text-center  gap-2  h-[calc(100vh-4rem)]">
      <div className="text-3xl font-bold pt-4 underline">Connnection</div>
      <div className="">
        {userConnection.map((userConnection) => {
          const { firstName, lastName, profilePic, _id, about } =
            userConnection;

          return (
            <div
              key={_id}
              className="flex  gap-4 mt-10 bg-base-200 rounded-4xl  p-6 w-2/3 mx-auto  ">
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
