import React from 'react';
import summary from '/img/summary.png';
import health from '/img/healthcare.png';
import mountain from '/img/mountains.png';
import length from '/img/length.png';
import altitude from '/img/altitude.png';
import time from '/img/time.png';

const DetailSummary = ({ tour }) => {
	return (
		<div className="container mx-auto p-6 bg-gray-100 rounded-xl">
			{/* Tour Summary Section */}
			<div className="w-full mx-auto p-6">
				<h2 className="text-4xl font-bold text-center mb-[80px] mt-[100px] text-lime-900">TOUR SUMMARY</h2>
				<div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
					{/* Radar Chart */}
					<div className="flex-1 flex justify-center">
						<img src={summary} alt="Radar Chart" className="w-full max-w-xs" />
					</div>

					{/* Tour Details */}
					<div className="flex-1">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<strong>Tháng đẹp trong năm:</strong> <br />
								{tour?.best_month}
							</div>
							<div>
								<strong>Số khách tối đa mỗi đoàn:</strong> <br />
								{tour?.max_guests}
							</div>
							<div>
								<strong>Thời gian đón khách:</strong> <br />
								{tour?.pickup_time}
							</div>
							<div>
								<strong>Địa điểm đón khách:</strong> <br />
								{tour?.pickup_location}
							</div>
							<div>
								<strong>Khu vực tập kết đoàn:</strong> <br />
								{tour?.group_assembly_area}
							</div>
							<div>
								<strong>Thời gian chinh phục:</strong> <br />
								{tour?.conquest_duration}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className="w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6 text-center">
				{/* Thời gian tiếp cận y tế */}
				<div className="p-4">
					<img src={health} alt="Healthcare Icon" className="w-12 mx-auto mb-2" />
					<p className="font-bold">Thời gian tiếp cận y tế:</p>
					<p className="text-lg">{tour?.medical_access_time}</p>
				</div>

				{/* Độ dài quãng đường */}
				<div className="p-4">
					<img src={length} alt="Length Icon" className="w-12 mx-auto mb-2" />
					<p className="font-bold">Độ dài quãng đường:</p>
					<p className="text-lg">{tour?.distance}km</p>
				</div>

				{/* Độ cao đỉnh */}
				<div className="p-4">
					<img src={mountain} alt="Mountain Icon" className="w-12 mx-auto mb-2" />
					<p className="font-bold">Độ cao đỉnh:</p>
					<p className="text-lg">{tour?.peak_altitude}m</p>
				</div>

				{/* Tăng độ cao tích lũy */}
				<div className="p-4">
					<img src={altitude} alt="Altitude Icon" className="w-12 mx-auto mb-2" />
					<p className="font-bold">Tăng độ cao tích lũy:</p>
					<p className="text-lg">{tour?.peak_altitude}m</p>
				</div>

				{/* Thời gian hoạt động trong ngày */}
				<div className="p-4">
					<img src={time} alt="Time Icon" className="w-12 mx-auto mb-2" />
					<p className="font-bold">Thời gian hoạt động trong ngày:</p>
					<p className="text-lg">{tour?.activity_duration}</p>
				</div>
			</div>
		</div>
	);
};

export default DetailSummary;
