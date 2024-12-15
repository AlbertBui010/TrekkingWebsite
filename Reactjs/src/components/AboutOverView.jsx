import React from "react";
import vietnam from "/img/vietnam.png";
import coop from "/img/coop.png";
import together from "/img/together.png";
import growth from "/img/growth.png";
import us from "/img/us.png";

const AboutOverView = () => {
  return (
    <div className="bg-[#f9f3e9] py-16 px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold uppercase">
        <span className="text-lime-700">Q&T</span><span className="text-green-500">TREKKING</span>
        </h1>
        <p className="mt-4 text-gray-700 text-lg">
          Chúng tôi lan tỏa đam mê chinh phục giá trị bản thân bằng các hoạt động khám phá tự nhiên một cách an toàn, chuyên nghiệp và bền vững.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="flex justify-center">
          <img
            src={us}
            alt="Adventure Team"
            className="w-full max-w-lg rounded-lg shadow-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black uppercase">
            <span className="text-amber-600">Our Team</span> Chinh phục, khám phá, tận hưởng thiên nhiên kỳ vĩ cùng đội ngũ Q&TTREKKING
          </h2>
        
          <ul className="mt-8 space-y-12">
            <li className="flex items-start">
              <img src={vietnam} alt="Vietnam" className="w-[80px] h-[80px] mr-8" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Ưu tiên bảo tồn các giá trị văn hóa địa phương
                </h3>
                <p className="text-gray-600">
                  Chúng tôi đề cao hoạt động khám phá, trải nghiệm văn hóa bản địa trên tinh thần tiếp thu, thấu hiểu và bảo tồn giá trị nguyên bản.
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <img src={coop} alt="Expertise" className="w-[80px] h-[80px] mr-8" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Chuyên gia trong lĩnh vực du lịch mạo hiểm
                </h3>
                <p className="text-gray-600">
                  Chúng tôi tự hào tập hợp đội ngũ guide chuyên nghiệp, được đào tạo bài bản và kỹ năng sinh tồn.
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <img src={together} alt="Community" className="w-[80px] h-[80px] mr-8" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Kết nối cộng đồng yêu du lịch mạo hiểm
                </h3>
                <p className="text-gray-600">
                  Tạo cơ hội kết nối cộng đồng đam mê chinh phục và khám phá thông qua các hoạt động ý nghĩa.
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <img src={growth} alt="Growth" className="w-[80px] h-[80px] mr-8" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Phát triển du lịch bền vững
                </h3>
                <p className="text-gray-600">
                  Tạo điều kiện bảo tồn tài nguyên thiên nhiên, góp phần bảo vệ môi trường và xây dựng cộng đồng địa phương.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-bold">
        <div className="w-full h-full bg-gray-50 p-8 rounded-lg">
          <h3 className="text-4xl text-lime-700">2</h3>
          <p className="text-gray-700 mt-2 font-bold">Tháng thành lập</p>
        </div>
        <div className="w-full h-full bg-gray-50 p-8 rounded-lg">
          <h3 className="text-4xl font-bold text-lime-700">20+</h3>
          <p className="text-gray-700 mt-2">Cung đường chinh phục</p>
        </div>
        <div className="w-full h-full bg-gray-50 p-8 rounded-lg">
          <h3 className="text-4xl font-bold text-lime-700">35</h3>
          <p className="text-gray-700 mt-2">Hướng dẫn chuyên leo núi</p>
        </div>
        <div className="w-full h-full bg-gray-50 p-8 rounded-lg">
          <h3 className="text-4xl font-bold text-lime-700">350+</h3>
          <p className="text-gray-700 mt-2">Công việc cung cấp cho địa phương</p>
        </div>
      </div>
    </div>
  );
};

export default AboutOverView;
