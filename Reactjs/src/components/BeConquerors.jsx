import React from 'react';
import { features } from '../constant';

const BeConquerors = () => {
	return (
		<section className="py-12 bg-gray-100 ">
			<div className="container mx-auto px-6">
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-bold text-amber-700">
						KÝ DANH TRỞ THÀNH NHÀ CHINH PHỤC CÙNG <span className="text-lime-700">Q&T</span>
						<span className="text-green-500">TREKKING</span>
					</h2>
					<p className="text-base md:text-lg text-justify md:text-center text-gray-700 max-w-2xl mx-auto mt-4">
						Không chỉ đi theo tiếng gọi từ thiên nhiên hoang dã, Q&T TREKKING đưa bạn đến với những hành
						trình chinh phục bản thân, chứng minh sức mạnh và sự bền bỉ của tinh thần, thể lực cùng chuyên
						gia leo núi thực thụ.
					</p>
					<button className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition duration-300 hover:translate-x-1">
						Tìm tour ngay →
					</button>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-x-2"
						>
							<div className="flex justify-center mb-4">
								<img src={feature.icon} alt={feature.title} className="w-16 h-16" />
							</div>
							<h3 className="text-xl font-semibold text-center text-lime-800">{feature.title}</h3>
							<p className="text-gray-600 text-center mt-2">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BeConquerors;
