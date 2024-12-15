import React, { useState, useEffect } from 'react';
import { handleBookingService } from '../services/userServices';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentForm = ({ tour }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		userId: '',
		ticketCount: '',
		tourId: tour?.tourId || '',
	});

	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (user) {
			setFormData((prevFormData) => ({
				...prevFormData,
				userId: user.id,
			}));
		}
	}, []);

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			alert(JSON.stringify(formData));
			let res = await handleBookingService(formData);
			console.log('q1', res);
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="w-full flex items-center justify-center flex-col">
			<div className="w-full max-w-3xl bg-white p-8 ">
				<h2 className="text-3xl font-bold text-lime-700 mb-6 text-center">Thông Tin Thanh Toán</h2>

				{/* Payment Form */}
				<form onSubmit={handleSubmit}>
					{/* Customer Name */}
					<div className="mb-6">
						<label className="block text-gray-700 font-semibold mb-2">Tên Khách Hàng</label>
						<input
							type="text"
							name="customerName"
							value={user?.fullName || ''}
							disabled
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-700"
							placeholder="Nhập tên khách hàng"
						/>
					</div>

					{/* Ticket Count */}
					<div className="mb-6">
						<label className="block text-gray-700 font-semibold mb-2">Số Lượng Vé</label>
						<input
							type="number"
							name="ticketCount"
							value={formData.ticketCount}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-700"
							placeholder="Nhập số lượng vé"
						/>
					</div>

					{/* Tour Name */}
					<div className="mb-6">
						<label className="block text-gray-700 font-semibold mb-2">Tên Tour</label>
						<input
							type="text"
							name="tourName"
							value={tour?.tourName || ''}
							disabled
							className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
						/>
					</div>

					{/* Departure Date */}
					<div className="mb-6">
						<label className="block text-gray-700 font-semibold mb-2">Ngày Khởi Hành</label>
						<input
							type="text"
							name="departureDate"
							value={tour?.pickup_time || ''}
							disabled
							className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
						/>
					</div>

					{/* Confirm Button */}
					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-lime-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-lime-800 transition duration-300"
						>
							Xác Nhận
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentForm;
