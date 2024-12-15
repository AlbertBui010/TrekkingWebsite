import React, { useState, useEffect } from 'react';
import { handleGetAllActivityType } from '../services/adminServices';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';

const SignatureTour = () => {
	const [activeItem, setActiveItem] = useState(null);
	const [types, setTypes] = useState([]);

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await handleGetAllActivityType('ALL');
				if (response?.data?.errCode === 0) {
					const fetchedTypes = response?.data?.type || [];
					setTypes(fetchedTypes);
					if (fetchedTypes.length > 0) {
						setActiveItem(fetchedTypes[0]);
					}
				}
			} catch (err) {
				console.error('Error fetching activity types:', err);
			}
		};

		fetchTypes();
	}, []);

	return (
		<section className="py-12 bg-white z-0 mb-[50px]">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-16 uppercase">
					Những Tour Nổi Bật Của Chúng Tôi
				</h2>

				{/* Filter Buttons */}
				<div className="w-full h-[80px] md:h-[50px] flex flex-row mb-[50px] text-lg md:text-xl font-semibold rounded-xl overflow-hidden">
					<div className="w-full h-full flex justify-between">
						{types.map((type, index) => (
							<button
								onClick={() => setActiveItem(type)}
								key={index}
								className={`text-black w-1/3 transition duration-300 hover:bg-lime-700 hover:text-white ${
									activeItem?.name === type.name ? 'bg-lime-900 text-white' : 'bg-gray-100 text-black'
								}`}
							>
								{type.name}
							</button>
						))}
					</div>
				</div>

				{/* Tour Cards */}
				<div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{activeItem?.tours?.length > 0 ? (
						activeItem?.tours.map((tour, index) => (
							<Link
								to={`/tour/${tour.tourName}/${tour.id}`}
								key={index}
								className="bg-white shadow-md rounded-xl group transform transition duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
							>
								<img src={tour.image} alt={tour.tourName} className="w-full h-[400px] object-cover" />
								<div className="p-4">
									<h3 className="text-2xl font-semibold text-gray-800 group-hover:text-lime-700 transition">
										{tour.tourName}
									</h3>
									<p className="text-gray-600 text-x mt-2">{tour.tourDescription}</p>
									<p className="text-black text-xl font-bold mt-[20px] group-hover:text-red-800">
										{tour.price}
									</p>
								</div>
							</Link>
						))
					) : (
						<p className="text-center text-gray-500">Không có tour nào được tìm thấy.</p>
					)}
				</div>

				<div className="block md:hidden bg-gray-100">
					<Swiper
						loop={true}
						modules={[Pagination]}
						spaceBetween={20}
						slidesPerView={1}
						pagination={{ clickable: true }}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
						}}
						className="" // Chỉ hiển thị trên mobile
					>
						{activeItem?.tours.map((tour, index) => (
							<SwiperSlide key={index}>
								<Link
									to={`/tour/${tour.tourName}/${tour.id}`}
									className="bg-white shadow-md rounded-xl group transform transition duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
								>
									<img
										src={tour.image}
										alt={tour.tourName}
										className="w-full h-[300px] object-cover"
									/>
									<div className="p-4">
										<h3 className="text-xl font-semibold text-gray-800 group-hover:text-lime-700 transition h-12 md:h-0">
											{tour.tourName}
										</h3>
										<p className="text-gray-600 text-sm mt-2 h-32  ">{tour.tourDescription}</p>
										<p className="text-black text-lg font-bold mt-[20px] group-hover:text-red-800 mb-4 ">
											{tour.price}
										</p>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default SignatureTour;
