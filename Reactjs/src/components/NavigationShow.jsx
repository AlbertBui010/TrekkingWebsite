import React from 'react';
import img from '../assets/img/natural-walking.png';
import img2 from '../assets/img/mountain-hiking.png';
import img3 from '../assets/img/trekking.png';

const categories = {
	'Natural Walking': {
		title: 'Natural Walking',
		img: img,
		overview:
			'Đây là cấp độ phù hợp với những người mới bắt đầu, muốn khám phá và hòa mình vào thiên nhiên nhiên bằng các hoạt động đi bộ nhẹ nhàng trên đường mòn. Ở cấp độ này, bạn sẽ đi bộ với quãng đường vừa sức, trên bề mặt địa hình đơn giản mà không cần bất kỳ yêu cầu kỹ thuật nào. Để có thể tận hưởng trọn vẹn những cung đường ở cấp độ Nature Walking, bạn chỉ cần một sức khỏe và thể lực cơ bản.',
		paths: ['Path 1', 'Path 2', 'Path 3', 'Path 4'],
	},
	'Mountain Hiking': {
		title: 'Mountain Hiking',
		img: img2,
		overview:
			'Đây là cấp độ nâng cấp dành cho người có kinh nghiệm, sức bền tốt, thể lực ổn định với hoạt động di chuyển trên đường mòn, có dốc thoải. Ở cấp độ này, bạn sẽ chinh phục những địa hình bề mặt phức tạp, dốc với quãng đường dưới 25km, phù hợp với người có luyện thể dục thể thao. Thời gian di chuyển trong ngày dưới 6h, độ cao của đỉnh từ 1800m - 2500m với độ cao tích lũy trong quá trình di chuyển dao động trong khoảng 600m - 1000m.',
		paths: ['Path 1', 'Path 2', 'Path 3', 'Path 4'],
	},
	Trekking: {
		title: 'Trekking',
		img: img3,
		overview:
			'Đây là cấp độ thách thức sự bền bỉ và đam mê chinh phục của những người chuyên nghiệp với hoạt động khám phá, thám hiểm, đi bộ, leo núi tại nơi có địa hình phức tạp, dốc. Để thử thách bản thân trong hành trình chinh phục các cung Trekking đòi hỏi bạn có sức khỏe, thể lực tốt, có sức bền, sự dẻo dai và có kỹ thuật vận động ở mức cơ bản.',
		paths: ['Path 1', 'Path 2', 'Path 3', 'Path 4'],
	},
};

const NavigationShow = ({ categoryName }) => {
	const category = categories[categoryName];

	if (!category) return null; // Nếu không tìm thấy categoryName, không render gì cả

	return (
		<div className="w-full h-[450px] bg-slate-200 flex items-center justify-between absolute top-20 left-0 inset-x-0">
			<div className="mx-4 flex h-full">
				{/* Cột 1 */}
				<div className="w-1/4 flex flex-col justify-center border-r-[1px] border-black items-center">
					<h3 className="text-[22px] mb-6 font-bold">{category.title}</h3>
					{category.paths.map((path, index) => (
						<a href="#" key={index}>
							{path}
						</a>
					))}
				</div>

				{/* Cột 2 */}
				<div className="w-1/4 flex items-center justify-center">
					<img src={category.img} alt={category.title} className="w-[320px] h-[220px] p-4" />
				</div>

				{/* Cột 3 */}
				<div className="w-2/5 h-full flex flex-col justify-between items-center">
					<div className="h-full grid grid-rows-3 w-full px-4">
						{/* Row 1: Title */}
						<div className="flex mt-[100px]">
							<h1 className="text-4xl font-bold text-green-950">{category.title}</h1>
						</div>
						{/* Row 2: Subtitle */}
						<div className="flex">
							<h2 className="text-2xl font-semibold text-amber-800">{`${category.title} Overview`}</h2>
						</div>
						{/* Row 3: Content */}
						<div className="flex">
							<p>{category.overview}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavigationShow;
