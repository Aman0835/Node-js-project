import React, { useEffect } from "react";
import BASE_URL from "./../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addRequest } from "./../../utils/requestsSlice";

function capitalizeFirst(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const Requests = () => {
  const request = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const userRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userRequest();
  }, []);

  if (!userRequest) return;

  if (userRequest.length < 0) {
    return (
      <h1 className="flex justify-center items-center h-[calc(100vh-4rem)] text-4xl font-bold">
        You have no requests pending !!!!
      </h1>
    );
  }

  return (
    <div className="text-center  gap-2  h-[calc(100vh-4rem)]">
      <div className="text-3xl font-bold pt-4 underline">
        Connnection Requests
      </div>
      <div className="">
        {request.map((request) => {
          const { firstName, lastName, profilePic, about, _id } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex  gap-4 mt-10 bg-base-200 rounded-4xl  p-6 w-1/2 mx-auto  ">
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
              <div className="flex gap-2 p-6">
                <button className="btn btn-outline btn-secondary">Accept</button>
                <button className="btn btn-outline btn-primary">Reject </button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
