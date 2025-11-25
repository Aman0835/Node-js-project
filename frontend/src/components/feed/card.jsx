function capitalizeFirst(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const Card = ({ user = {}, onIgnore, onInterested }) => {
  const { firstName, lastName, age, about, profilePic } = user;

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      {user && (
        <div
          className="relative w-[600px] h-[780px] flex flex-col items-center 
                     rounded-3xl bg-white shadow-2xl font-sans">
          <div className="w-full h-[345px]">
            <img
              src={profilePic}
              alt="Card Background"
              className="h-full w-full object-cover rounded-t-3xl"
            />
          </div>

          <div
            className="absolute w-[210px] h-[210px] bg-white rounded-full flex justify-center items-center 
                       shadow-lg border-6 border-white top-[250px]">
            <img
              src={profilePic}
              alt="user profile"
              className="object-cover rounded-full w-[195px] h-[195px]"
            />
          </div>

          <div className="font-semibold text-3xl text-gray-800 mt-[120px]">
            {capitalizeFirst(firstName)} {capitalizeFirst(lastName)}
            <span className="ml-4 font-normal text-gray-500 text-2xl">
              ({age} yr)
            </span>
          </div>

          {about && (
            <div className="text-center text-gray-700 px-10 mt-5 text-lg italic leading-relaxed line-clamp-4">
              {about}
            </div>
          )}

          <div className="flex justify-center mt-auto pb-8">
            <button
              className="w-[135px] h-[60px] border-3 rounded-xl font-bold text-lg uppercase transition-all duration-300 mx-4
                         text-black border-black bg-white hover:bg-black hover:text-white"
              onClick={onIgnore}>
              Ignore
            </button>

            <button
              className="w-[135px] h-[60px] border-3 rounded-xl font-bold text-lg uppercase transition-all duration-300 mx-4
                         text-white border-black bg-black hover:bg-white hover:text-black"
              onClick={onInterested}>
              Interested
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
