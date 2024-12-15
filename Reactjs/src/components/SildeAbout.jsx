import React from "react";

const SlideAbout = () => {
  return (
    <div className="relative w-full h-[750px] bg-black bg-about-bg bg-contain bg-right bg-no-repeat">
      {/* Văn bản chính */}
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <h1 className="text-white text-5xl font-bold leading-snu bg-opacity-90 px-6 py-4 rounded-md shadow-lg">
          Our mission is to provide an adventure activities through trekking, hiking for nature lovers and experience hunters
        </h1>
      </div>
    </div>
  );
};

export default SlideAbout;
