import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../utils/constants.js";
import { addFeed } from "../../utils/feedSlice.js";
import Card from "./card.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (feed && feed.data && feed.data.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data);

    } catch (error) {
      console.error(error);
    }
  };
  
  const requestUser = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {
          
        },
        {
          withCredentials: true,
        }
      );
      
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

   if (!feed || !feed.data) {
    return <div>Loading...</div>;
  }
  if (currentIndex >= feed.data.length) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      No more profiles
    </div>;
  }

  const currentUser = feed.data[currentIndex];

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <Card
        user={currentUser}
        onIgnore={() => requestUser("ignored", currentUser._id)}
        onInterested={() => requestUser("interested", currentUser._id)}
      />
    </div>
  );
};

export default Feed;
