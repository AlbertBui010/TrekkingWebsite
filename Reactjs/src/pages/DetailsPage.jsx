import React, { useEffect, useState } from 'react';
import DetailTour from '../components/DetailTour';
import DetailExpertGuide from '../components/DetailExpertGuide';
import DetailSetup from '../components/DetailSetup';
import DetailSummary from '../components/DetailSummary';
import { useParams } from 'react-router-dom';
import { handleGetAllTours } from '../services/adminServices';

const DetailsPage = () => {
	const { tourId } = useParams();
	const [tourInfo, setTourInfo] = useState({});

	useEffect(() => {
		const fetchTour = async () => {
			try {
				if (tourId) {
					let res = await handleGetAllTours(tourId);
					console.log('Check res', res?.data?.data);
					setTourInfo(res?.data?.data);
				}
			} catch (e) {
				console.log('ERROR:', e);
			}
		};
		fetchTour();
	}, []);

	return (
		<div>
			<DetailTour tour={tourInfo} />
			<DetailExpertGuide guide={tourInfo?.guide} />
			<DetailSummary tour={tourInfo} />
			<DetailSetup price={tourInfo?.price} />
		</div>
	);
};

export default DetailsPage;
