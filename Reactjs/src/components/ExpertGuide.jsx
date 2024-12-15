import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { experts } from '../constant';
import { handleGetAllGuides } from '../services/adminServices';

const ExpertGuide = () => {
	const [experts, setExperts] = useState([]);

	useState(() => {
		const fetchGuides = async () => {
			try {
				const res = await handleGetAllGuides('ALL');
				if (res?.data?.errCode === 0) {
					setExperts(res?.data?.data || []);
				}
			} catch (err) {
				console.error('Error fetching guides:', err);
			}
		};

		fetchGuides();
	}, []);

	return (
		<div className="bg-gray-50 py-10">
			<div className="max-w-5xl mx-auto px-6">
				{/* Header Section */}
				<div className="text-center mb-10">
					<h1 className="text-3xl md:text-4xl font-bold text-amber-700 uppercase">Expert Guide</h1>
					<p className="text-gray-600 mt-2">
						Get personalized guidance from industry-leading experts to achieve your goals.
					</p>
				</div>

				{/* Swiper Section */}
				<Swiper
					loop={true}
					modules={[Pagination, Navigation]}
					spaceBetween={20}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="mySwiper"
				>
					{experts.map((expert, index) => (
						<SwiperSlide key={index}>
							<div className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col justify-between h-full">
								<div>
									<div className="mb-4">
										<img
											src={expert.image}
											alt={expert.fullName}
											className="w-20 h-20 mx-auto rounded-full"
										/>
									</div>
									<h3 className="text-xl font-semibold text-gray-800">{expert.fullName}</h3>
									<p className="text-gray-500 text-sm mt-4 line-clamp-2">
										{expert.expertGuideDescription}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default ExpertGuide;
