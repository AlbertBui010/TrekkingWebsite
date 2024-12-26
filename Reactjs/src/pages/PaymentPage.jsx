import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import { handleGetAllToursServices } from '../services/adminServices';
import Header from '../components/Header';

const PaymentPage = () => {
	const { slug, index } = useParams();
	const [tour, setTour] = useState([]);

	useEffect(() => {
		const fetchTour = async () => {
			try {
				const res = await handleGetAllToursServices({ id: index, activationState: 'Show' });
				setTour(res?.data?.data || []);
			} catch (e) {
				console.log('ERROR:', e);
			}
		};
		fetchTour();
	}, []);

	if (!tour) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-gray-100">
				<h2 className="text-2xl font-bold text-red-600">Không tìm thấy tour!</h2>
			</div>
		);
	}

	return (
		<>
			<Header />
			<PaymentForm tour={tour} />
		</>
	);
};

export default PaymentPage;
