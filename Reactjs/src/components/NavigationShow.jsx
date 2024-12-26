import React, { useEffect, useState } from 'react';
import img1 from '../assets/img/natural-walking.png';
import img2 from '../assets/img/mountain-hiking.png';
import img3 from '../assets/img/trekking.png';
import { handleGetAllOutdoorActivityTypeServices } from '../services/adminServices';
import { Link } from 'react-router-dom';

const images = {
	'Natural Walking': img1,
	'Mountain Hiking': img2,
	Trekking: img3,
};

const NavigationShow = ({ categoryName }) => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				let res = await handleGetAllOutdoorActivityTypeServices({ id: 'ALL', activationState: 'Show' });
				console.log('RESSSS', res?.data?.data);
				setCategories(res?.data?.data);
			} catch (e) {
				console.log(e);
			}
		};

		fetchCategories();
	}, []);

	const category = categories.find((item) => item.name === categoryName);

	if (!category) return null;

	return (
		<div className="w-full h-[450px] bg-slate-200 flex items-center justify-between absolute top-20 left-0 inset-x-0">
			<div className="mx-4 flex h-full">
				{/* Cột 1 */}
				<div className="w-1/4 flex flex-col justify-center border-r-[1px] border-black items-center">
					<h3 className="text-[22px] mb-6 font-bold">{category.name}</h3>
					{category?.tours.map((tour, index) => (
						<Link key={index} to={`/tour/${tour.tourName}/${tour.id}`}>
							<div className="text-base hover:text-lg mb-2">{tour.tourName}</div>
						</Link>
					))}
				</div>

				{/* Cột 2 */}
				<div className="w-1/4 flex items-center justify-center">
					<img src={images[category.name]} alt={category.name} className="w-[320px] h-[220px] p-4" />
				</div>

				{/* Cột 3 */}
				<div className="w-2/5 h-full flex flex-col justify-between items-center">
					<div className="h-full grid grid-rows-[auto,auto,1fr] w-full px-4">
						{/* Row 1: Title */}
						<div className="flex mt-[50px]">
							<h1 className="text-4xl font-bold text-green-950">{category.name}</h1>
						</div>

						{/* Row 2: Subtitle */}
						<div className="flex">
							<h2 className="text-2xl font-semibold text-amber-800">{`${category.name} Overview`}</h2>
						</div>

						{/* Row 3: Content */}
						<div className="flex mt-8">
							<p>{category.typeDescription}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavigationShow;
