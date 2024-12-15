import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { slide } from '../constant';

const HomeHero = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div>
			<Swiper
				style={{
					'--swiper-pagination-color': '#ffff',
				}}
				spaceBetween={30}
				effect={'fade'}
				autoplay={{
					delay: 4500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[EffectFade, Autoplay, Pagination]}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				className="mySwiper w-full cursor-grab"
			>
				{slide.map((item, index) => (
					<SwiperSlide key={index} className="relative">
						<img src={item.image} className="w-full h-[220px] lg:h-[850px] aspect-auto" />
						<div className={`absolute top-0 bg-gradient-to-r from-black w-[67%] h-full`}>
							<span
								className={`w-[75%] h-full absolute top-[20%] lg:top-[70%] left-[10%] font-sans uppercase text-base lg:text-5xl font-bold text-white transform transition-all duration-[1200ms] ease-out  ${
									activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
								}`}
							>
								{item.content}
							</span>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default HomeHero;
