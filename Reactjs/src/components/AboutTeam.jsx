import React from 'react';
import img1 from '/img/qt.jpg';
import img2 from '/img/qq.jpg';

const AboutTeam = () => {
  const images = [
    { src: img1, name: 'Phạm Quốc Thái', role: 'Co-Founder' },
    { src: img2, name: 'Bùi Quang Quý', role: 'Co-Founder' },
  ];

  return (
    <div className="bg-[#f9f3e9] py-16">
      <h2 className="text-center text-4xl font-bold text-[#222] mb-12">
        ĐỘI NGŨ NHÂN SỰ <span className="text-red-500">CỐT LÕI</span>
      </h2>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {images.map((member, index) => (
          <div
            key={index}
            className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div
              className="h-[546px] bg-center bg-cover"
              style={{ backgroundImage: `url(${member.src})` }}
            ></div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold text-center">
                {member.name} <br /> {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
