import React from 'react';
import vid1 from '../assets/vid/vid1.mp4';
import vid2 from '../assets/vid/vid2.mp4';
import vid3 from '../assets/vid/vid3.mp4';
import vid4 from '../assets/vid/vid4.mp4';
import vid5 from '../assets/vid/vid5.mp4';

const AboutVideo = () => {
	const handleMouseOver = (e) => {
		const video = e.currentTarget.querySelector('video');
		video.muted = false; // Bật âm thanh khi hover
	};

	const handleMouseOut = (e) => {
		const video = e.currentTarget.querySelector('video');
		video.muted = true; // Tắt âm thanh khi rời chuột
	};

	return (
		<div className="w-full flex flex-col items-center justify-center mx-auto mt-20 px-4 mt-[200px] mb-[200px] cursor-pointer">
			<div className="grid grid-cols-5 gap-4">
				<div
					className="group relative border rounded-lg shadow-lg w-full h-[300px] overflow-hidden"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<video src={vid4} autoPlay loop muted className="w-full h-full object-cover"></video>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
				</div>
				<div
					className="group relative border rounded-lg shadow-lg w-full h-[500px] overflow-hidden"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<video src={vid2} autoPlay loop muted className="w-full h-full object-cover"></video>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
				</div>
				<div
					className="group relative border rounded-lg shadow-lg w-full h-[400px] overflow-hidden"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<video src={vid3} autoPlay loop muted className="w-full h-full object-cover"></video>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
				</div>
				<div
					className="group relative border rounded-lg shadow-lg w-full h-[350px] overflow-hidden"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<video src={vid1} autoPlay loop muted className="w-full h-full object-cover"></video>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
				</div>
				<div
					className="group relative border rounded-lg shadow-lg w-full h-[450px] overflow-hidden"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<video src={vid5} autoPlay loop muted className="w-full h-full object-cover"></video>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
				</div>
			</div>
		</div>
	);
};

export default AboutVideo;
