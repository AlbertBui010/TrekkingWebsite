import React, { useEffect, useState } from 'react';
import { handleGetAllGuides, handleGetAllTours } from '../services/adminServices';

const DetailExpertGuide = ({ guide }) => {
	return (
		<div className="container mx-auto px-6 py-6">
			<div className="flex flex-col items-center">
				<h2 className="text-3xl font-bold text-lime-900 mb-6 uppercase">Expert Guide</h2>
				<p className="text-justify md:w-[60%] text-lg mb-7 md:text-center">
					Là một trong những đơn vị tổ chức Hiking, Trekking hàng đầu Việt Nam với đội ngũ được đào tạo chuyên
					nghiệp, bài bản về kỹ năng leo núi, kỹ năng sinh tồn.
				</p>
			</div>

			<div className="md:w-[60%] mx-auto">
				<div className="flex flex-col md:flex-row items-center md:justify-between mb-6 w-full md:w-[80%] mx-auto text-lg">
					<img
						src={guide?.image}
						alt={guide?.fullName}
						className="w-[250px] h-[350px] object-cover rounded-lg shadow-md md:mr-6 mb-4"
					/>
					<div className="flex flex-col md:w-[60%] w-full">
						<h3 className="text-2xl font-semibold text-lime-700 mb-2 text-center md:text-left">
							{guide?.fullName}
						</h3>
						<p className="text-lg text-gray-800 text-justify">{guide?.expertGuideDescription}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailExpertGuide;
