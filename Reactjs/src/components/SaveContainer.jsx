import React from 'react';

const SaveContainer = () => {
	return (
		<div className="w-full h-[450px] md:h-full bg-save-bg bg-cover bg-center md:bg-cover bg-no-repeat text-white mb-[250px] mt-[100px] md:bg-fixed">
			<div className="w-[80%] md:w-[70%] h-full md:px-[125px] md:py-[274px] flex flex-col justify-center items-center mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold my-7 ">YẾU TỐ AN TOÀN</h1>
				<p className=" text-justify text-base md:text-lg font-medium md:font-normal">
					Đảm bảo an toàn là kim chỉ nam của <span className="text-lime-700">Q&T</span>
					<span className="text-green-500">TREKKING</span>. Chúng tôi hiểu rằng, thiên nhiên kỳ vĩ luôn ẩn
					chứa nhiều biến động và thách thức, vì vậy việc hòa mình vào giữa thiên nhiên để trải nghiệm và bầu
					bạn cần đặt tiêu chí an toàn lên hàng đầu. Bằng cách trang bị những kiến thức và kỹ năng sinh tồn
					kết hợp với kinh nghiệm dày dặn của đội ngũ adventure guide và local guide,{' '}
					<span className="text-lime-700">Q&T</span>
					<span className="text-green-500">TREKKING</span> mang đến cho khách hàng trải nghiệm trọn vẹn trong
					từng chuyến đi với tiêu chí an toàn là cốt lõi.
				</p>
			</div>
		</div>
	);
};

export default SaveContainer;
