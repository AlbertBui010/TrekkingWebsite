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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTour = async () => {
			try {
				if (tourId) {
					let res = await handleGetAllTours(tourId);
					setTourInfo(res?.data?.data);
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

	if (!tourInfo) {
		return <div className="text-center py-6">Không tìm thấy thông tin tour!</div>;
	}

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
