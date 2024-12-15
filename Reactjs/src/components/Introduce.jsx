import React from 'react';

export const Introduce = () => {
	return (
		<div className="container mx-auto  py-4 z-0">
			<div className="py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8  md:h-[800px] items-center">
					{/* Cột văn bản */}
					<div className="flex flex-col w-[80%] md:w-full mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-amber-700 text-center mb-4">
							WELCOME TO <span className="text-lime-700">Q&T</span>
							<span className="text-green-500">TREKKING</span>
						</h2>
						<p className="text-base md:text-lg text-gray-800 mb-6 text-justify md:text-justify">
							Chúng tôi tin rằng du lịch không chỉ đơn thuần là khám phá những địa điểm mới, mà còn là
							hành trình tạo nên những kỷ niệm khó quên, khám phá các nền văn hóa đa dạng, và xây dựng
							những mối quan hệ bền lâu. Đội ngũ chuyên gia du lịch giàu kinh nghiệm của chúng tôi luôn
							sẵn sàng thiết kế những trải nghiệm độc đáo, được cá nhân hóa theo sở thích của bạn. Dù bạn
							là người yêu thích cảm giác mạnh và phiêu lưu mạo hiểm, hay chỉ đơn giản muốn thư giãn giữa
							cảnh sắc thiên nhiên yên bình, chúng tôi đều có lựa chọn phù hợp dành cho bạn.{' '}
						</p>
						<p className="hidden md:block md:text-lg  text-gray-800 mb-6">
							Chúng tôi chuyên cung cấp các gói du lịch độc đáo, từ những khu nghỉ dưỡng sang trọng bên bờ
							biển, các tour tham quan lịch sử, đến những hành trình leo núi xa xôi và các chuyến đi khám
							phá động vật hoang dã. Với Q&T Travel, bạn không chỉ đặt một chuyến đi mà còn bắt đầu một
							hành trình mở ra vẻ đẹp của thế giới. Các điểm đến được chúng tôi chọn lọc kỹ càng hứa hẹn
							mang đến những cảnh quan ngoạn mục và trải nghiệm ý nghĩa, để lại cho bạn những câu chuyện
							thú vị để kể mãi về sau.
						</p>
						<p className="hidden md:block md:text-lg text-gray-800 mb-6">
							Hãy tham gia cùng chúng tôi tại Q&T Travel để khám phá những chân trời mới, gặp gỡ những
							người bạn đồng hành có cùng đam mê, và trải nghiệm các nền văn hóa địa phương theo cách hoàn
							toàn mới lạ. Dù bạn đang lên kế hoạch cho một chuyến đi một mình, kỳ nghỉ cùng gia đình, hay
							một tour du lịch nhóm, chúng tôi luôn đảm bảo rằng hành trình của bạn sẽ thật suôn sẻ, an
							toàn và quan trọng nhất là đáng nhớ. Cùng nhau, chúng ta sẽ tạo nên những kỷ niệm mới và
							khám phá những kỳ quan của thế giới qua từng chuyến đi!
						</p>
						<p className="hidden md:block md:text-lg text-gray-800 mb-6">
							Hành trình của bạn bắt đầu tại đây cùng Q&T Travel. Hãy bước đi đầu tiên ngay hôm nay và để
							chúng tôi dẫn lối bạn đến những cuộc phiêu lưu khó quên và những trải nghiệm đầy giá trị sẽ
							lưu giữ suốt đời. Tại Q&T Travel, cả thế giới đang chờ đón bạn!{' '}
						</p>
					</div>

					{/* Cột hình ảnh */}
					<div className="bg-introduce-bg bg-cover bg-center h-full w-full rounded-lg shadow-lg"></div>
				</div>
			</div>
		</div>
	);
};

export default Introduce;
