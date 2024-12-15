import React from 'react';
import img1 from '../assets/img/support.png';
import img2 from '../assets/img/human.png';
import img3 from '../assets/img/networking.png';
import img4 from '../assets/img/jigsaw.png';
import img5 from '../assets/img/route.png';
import img6 from '../assets/img/growing.png';

const Policy = () => {
	const policies = [
		{
			title: 'Tỉ lệ hỗ trợ 1:2 hoặc 1:4',
			icon: img1,
			description: 'Adventure guide quan sát, hướng dẫn, hỗ trợ nhanh chóng, kịp thời.',
		},
		{
			title: 'Số lượng tối đa 20 người',
			icon: img2,
			description: 'Tạo sự kết nối sâu sắc trong đoàn, đảm bảo an toàn cho chuyến đi.',
		},
		{
			title: 'Đội ngũ chuyên nghiệp',
			icon: img3,
			description: 'Đội ngũ guide thông thạo mọi địa hình, giàu kinh nghiệm được đào tạo bài bản.',
		},
		{
			title: 'Trải nghiệm đa dạng',
			icon: img4,
			description: 'Nhiều hoạt động trải nghiệm, được thiết kế phù hợp với thể lực của bạn.',
		},
		{
			title: 'Lộ trình thiết kế hợp lý',
			icon: img5,
			description: 'Lộ trình được nghiên cứu và phát triển bởi các chuyên gia hàng đầu của Tổ Ong Adventure.',
		},
		{
			title: 'Phát triển du lịch bền vững',
			icon: img6,
			description: 'Đặt thiên nhiên làm nền tảng. Tôn trọng sự nguyên bản của tự nhiên và văn hóa.',
		},
	];

	return (
		<section className="py-12 bg-gray-100">
			<div className="container mx-auto px-6">
				{/* Tiêu đề và mô tả */}
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-bold text-amber-700">
						<span className="text-lime-700">Q&T</span>
						<span className="text-green-500">TREKKING</span>
						<br />
						LÀ CHUYÊN GIA ĐỒNG HÀNH CÙNG CÁC NHÀ CHINH PHỤC
					</h2>
					<p className="text-base md:text-lg text-justify md:text-center text-gray-700 max-w-3xl mx-auto mt-4">
						Không chỉ dừng lại ở việc lắng nghe tiếng gọi từ thiên nhiên hoang dã, chúng tôi đưa bạn đến với
						những hành trình chinh phục bản thân, chứng minh được sức mạnh và sự bền bỉ của tinh thần, thể
						lực cùng chuyên gia leo núi thực thụ.
					</p>
				</div>

				{/* Danh sách chính sách */}
				<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
					{policies.map((policy, index) => (
						<div
							key={index}
							className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
						>
							<div className="flex justify-center mb-4">
								<img src={policy.icon} alt={policy.title} className="w-12 md:w-16 h-12 md:h-16" />
							</div>
							<h3 className="text-base md:text-lg font-semibold text-center text-blue-800">
								{policy.title}
							</h3>
							<p className="text-gray-600 text-sm md:text-base text-center mt-2">{policy.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Policy;
