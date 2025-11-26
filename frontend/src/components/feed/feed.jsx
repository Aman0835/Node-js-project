import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../utils/constants.js";
import { addFeed } from "../../utils/feedSlice.js";
import Card from "./card.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

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

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || !feed.data) {
    return <div>Loading...</div>;
  }

  if (feed.data.length <= 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        No more profiles
      </div>
    );
  }

  const currentUser = feed.data[currentIndex];

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <Card user={feed.data[0]} />
    </div>
  );
};

export default Feed;
