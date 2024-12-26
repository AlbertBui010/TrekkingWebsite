import React from 'react';

const DetailTour = ({ tour }) => {
	if (!tour) {
		return (
			<div className="container mx-auto px-6 py-12">
				<h2 className="text-3xl font-bold text-center text-red-500">Tour không tồn tại!</h2>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-6 py-12">
			<div className="flex flex-col">
				<div className="flex items-center justify-center flex-col">
					<h1 className="text-3xl font-bold text-lime-900 mb-4 uppercase text-center">{tour.tourName}</h1>
					<h1 className="text-2xl font-bold text-lime-900 mb-4">Loại hình - {tour?.activityType?.name}</h1>
					<p className="text-gray-900 text-lg leading-relaxed mb-4 w-full text-justify md:w-[40%] text-center">
						{tour.tourDescription}
					</p>
				</div>

				{/* Load 3 ảnh đầu tiên */}
				<div className="flex flex-row mx-7 md:w-[80%] mx-auto">
					{tour.image &&
						tour.image
							.split(',')
							.map((img) => img.trim())
							.filter((img) => img)
							.slice(0, 3)
							.map((img, index) => (
								<img
									key={index}
									src={img}
									alt={`${tour.tourName} - ảnh ${index + 1}`}
									className={`w-full md:h-[450px] shadow-lg ${
										index > 0 ? 'hidden md:block md:w-1/4 md:ml-[10px]' : 'md:w-2/4'
									}`}
									onError={(e) => {
										e.target.src = 'https://via.placeholder.com/450';
									}}
								/>
							))}
				</div>
			</div>
		</div>
	);
};

export default DetailTour;
