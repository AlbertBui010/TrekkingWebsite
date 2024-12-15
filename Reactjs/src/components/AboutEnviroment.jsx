import React from "react";
import img1 from "/img/env1.png";
import img2 from "/img/env2.png";
import img3 from "/img/env3.png";
import img4 from "/img/env4.png";
import img5 from "/img/env5.png";
import img6 from "/img/env6.png";
import img7 from "/img/env7.png";
import img8 from "/img/env8.png";
import img9 from "/img/env9.png";
import img10 from "/img/env11.png";


const AboutEnviroment = () => {
  return (
    <div className="w-full h-[1200px] bg-black p-8 flex items-center justify-center flex-col">
      <h1 className="w-[70%] text-white text-4xl font-bold text-center mb-[100px] ">
      <span className="text-lime-700">Q&T</span><span className="text-green-500">TREKKING</span> ĐỀ CAO MÔI TRƯỜNG LÀM VIỆC SÁNG TẠO, NĂNG ĐỘNG, HƯỚNG ĐẾN PHÁT TRIỂN CÁC TÀI NĂNG VÀ CHUYÊN MÔN TRONG MỖI VỊ TRÍ
      </h1>

      <div className="grid grid-cols-5 gap-4 items-center w-[70%]">
        {/* Hình 1 */}
        <img
          src={img1}
          alt="Environment 1"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
        {/* Hình 2 */}
        <img
          src={img2}
          alt="Environment 2"
          className="rounded-lg shadow-lg object-cover"
        />
        {/* Hình 3 */}
        <img
          src={img3}
          alt="Environment 3"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
        {/* Hình 4 */}
        <img
          src={img4}
          alt="Environment 4"
          className="rounded-lg shadow-lg object-cover"
        />
        {/* Hình 5 */}
        <img
          src={img5}
          alt="Environment 5"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
      </div>
      <div className="w-[70%] grid grid-cols-5 gap-4 items-center">
        {/* Hình 1 */}
        <img
          src={img6}
          alt="Environment 1"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
        {/* Hình 2 */}
        <img
          src={img7}
          alt="Environment 2"
          className="rounded-lg shadow-lg object-cover"
        />
        {/* Hình 3 */}
        <img
          src={img8}
          alt="Environment 3"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
        {/* Hình 4 */}
        <img
          src={img9}
          alt="Environment 4"
          className="rounded-lg shadow-lg object-cover"
        />
        {/* Hình 5 */}
        <img
          src={img10}
          alt="Environment 5"
          className="rounded-lg shadow-lg object-cover row-span-2"
        />
      </div>
      
    </div>
  );
};

export default AboutEnviroment;
