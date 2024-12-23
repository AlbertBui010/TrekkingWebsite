import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { handleGetAllTours } from '../services/adminServices';

const DetailTour = ({ tour }) => {
	const { slug, tourId } = useParams();
	// const [tour, setTour] = useState([]);
	const navigate = useNavigate();
	console.log('IMAGE', tour?.image);

	// useEffect(() => {
	// 	const fetchTour = async () => {
	// 		try {
	// 			const response = await handleGetAllTours(tourId);
	// 			console.log('CHECK:', response);
	// 			if (response?.data?.errCode === 0) {
	// 				const tour = response?.data?.data || [];
	// 				setTour(tour);
	// 			}
	// 		} catch (err) {
	// 			console.error('Error fetching activity types:', err);
	// 		}
	// 	};

	// 	fetchTour();
	// }, []);

	if (!tour) {
		return (
			<div className="container mx-auto px-6 py-12">
				<h2 className="text-3xl font-bold text-center text-red-500">Tour không tồn tại!</h2>
			</div>
		);
	}

	const handleBooking = () => {
		navigate(`/payment/${slug}/${tourId}`);
	};

	return (
		// <div className="container mx-auto px-6 py-12">
		// 	<div className="flex flex-col">
		// 		<div className="flex items-center justify-center flex-col">
		// 			<h1 className="text-3xl font-bold text-lime-900 mb-4 uppercase text-center">{tour.tourName}</h1>
		// 			<h1 className="text-2xl font-bold text-lime-900 mb-4">{tour?.activityType?.name}</h1>
		// 			<p className="text-gray-900 text-lg leading-relaxed mb-4 w-full text-justify md:w-[40%] text-center">
		// 				{tour.tourDescription}
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row mx-7 md:w-[80%] mx-auto">
		// 			<img src={tour.image} alt={tour.tourName} className="w-full md:w-2/4 md:h-[450px] shadow-lg" />
		// 			<img
		// 				src={tour.image}
		// 				alt={tour.tourName}
		// 				className="hidden md:block md:w-1/4 md:h-[450px] shadow-lg md:ml-[10px]"
		// 			/>
		// 			<img
		// 				src={tour.image}
		// 				alt={tour.tourName}
		// 				className="hidden md:block md:w-1/4 md:h-[450px] shadow-lg md:ml-[10px]"
		// 			/>
		// 		</div>
		// 	</div>
		// </div>

		<div className="container mx-auto px-6 py-12">
			<div className="flex flex-col">
				<div className="flex items-center justify-center flex-col">
					<h1 className="text-3xl font-bold text-lime-900 mb-4 uppercase text-center">{tour.tourName}</h1>
					<h1 className="text-2xl font-bold text-lime-900 mb-4">{tour?.activityType?.name}</h1>
					<p className="text-gray-900 text-lg leading-relaxed mb-4 w-full text-justify md:w-[40%] text-center">
						{tour.tourDescription}
					</p>
				</div>

				{/* Load 3 ảnh đầu tiên */}
				<div className="flex flex-row mx-7 md:w-[80%] mx-auto">
					{tour.image &&
						tour.image
							.split(',') // Tách chuỗi thành mảng
							.map((img) => img.trim()) // Loại bỏ khoảng trắng thừa
							.filter((img) => img) // Loại bỏ URL rỗng
							.slice(0, 3) // Lấy 3 ảnh đầu tiên
							.map((img, index) => (
								<img
									key={index}
									src={img}
									alt={`${tour.tourName} - ảnh ${index + 1}`}
									className={`w-full md:h-[450px] shadow-lg ${
										index > 0 ? 'hidden md:block md:w-1/4 md:ml-[10px]' : 'md:w-2/4'
									}`}
									onError={(e) => {
										e.target.src = 'https://via.placeholder.com/450'; // Ảnh thay thế nếu ảnh bị lỗi
									}}
								/>
							))}
				</div>
			</div>
		</div>
	);
};

export default DetailTour;
