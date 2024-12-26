import React, { useEffect, useState } from 'react';
import DetailTour from '../components/DetailTour';
import DetailExpertGuide from '../components/DetailExpertGuide';
import DetailSetup from '../components/DetailSetup';
import DetailSummary from '../components/DetailSummary';
import { useParams } from 'react-router-dom';
import { handleGetAllToursServices } from '../services/adminServices';

const DetailsPage = () => {
	const { tourId } = useParams();
	const [tour, setTour] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTour = async () => {
			try {
				if (tourId) {
					let res = await handleGetAllToursServices({ id: tourId, activationState: 'Show' });
					setTour(res?.data?.data);
				}
			} catch (e) {
				console.log('ERROR:', e);
			} finally {
				setLoading(false);
			}
		};
		fetchTour();
	}, []);

	if (loading) {
		return <div className="text-center py-6">Đang tải dữ liệu!</div>;
	}

	if (tour.length === 0) {
		return <div className="text-center py-6">Không tìm thấy thông tin tour!</div>;
	}

	return (
		<div>
			<DetailTour tour={tour} />
			<DetailExpertGuide guide={tour?.guide} />
			<DetailSummary tour={tour} />
			<DetailSetup price={tour?.price} />
		</div>
	);
};

export default DetailsPage;
