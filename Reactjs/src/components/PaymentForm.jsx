import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleGetAllToursServices } from '../services/adminServices';
import { handleCreateBookingServices } from '../services/userServices';
import { toast } from 'react-toastify';
import TransferInfo from './user/TransferInfo';

const PaymentForm = () => {
	const navigate = useNavigate();
	const { index } = useParams();
	const [tour, setTour] = useState(null);
	const [isTransfering, setIsTransferring] = useState(false);
	const [formData, setFormData] = useState({
		userId: '',
		tourId: '',
		number_of_tickets: 1, // Default ticket number
		total_price: tour?.price || 0, // Default total price
		status: 'register',
		activationState: 'Show',
	});
	const [newBooking, setNewBooking] = useState({});

	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const fetchUser = () => {
			if (user && !formData.userId) {
				setFormData((prevFormData) => ({
					...prevFormData,
					userId: user.id,
				}));
			}
		};
		fetchUser();
	}, [user]);

	// Fetch tour data
	useEffect(() => {
		const fetchTour = async () => {
			if (index) {
				try {
					const response = await handleGetAllToursServices({ id: index, activationState: 'Show' });
					if (response && response.data.errCode === 0) {
						setTour(response.data.data);
						let tourData = response.data.data;
						setFormData((prev) => ({
							...prev,
							tourId: tourData.id,
							total_price: tourData.price,
						}));
					}
				} catch (error) {
					console.error('Error fetching tour:', error);
					alert('Không tìm thấy thông tin tour!');
					navigate('/');
				}
			}
		};

		fetchTour();
	}, [index]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'number_of_tickets') {
			const maxAvailableTickets = tour?.max_guests - tour?.current_number_guest || 0;
			const numberOfTickets = Math.min(maxAvailableTickets, Math.max(1, parseInt(value) || 1));

			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: numberOfTickets,
				total_price: numberOfTickets * (tour?.price || 0), // Cập nhật tổng tiền
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let res = await handleCreateBookingServices(formData);
			if (res?.data.errCode === 0) {
				setNewBooking(res?.data?.data);
				setIsTransferring(true);
			} else {
				toast.error('Có lỗi xảy ra khi đăng ký!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleConfirm = () => {
		setIsTransferring(false);
	};
	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
	};

	return (
		<div className="w-full flex items-center justify-center flex-col">
			{isTransfering ? (
				<TransferInfo onConfirm={handleConfirm} data={newBooking} />
			) : (
				<div className="w-full max-w-3xl bg-white p-8">
					<h2 className="text-3xl font-bold text-lime-700 mb-6 text-center">Thông Tin Thanh Toán</h2>

					<form onSubmit={handleSubmit}>
						{/* Customer Name */}
						<div className="mb-6">
							<label className="block text-gray-700 font-semibold mb-2">Tên Khách Hàng</label>
							<input
								type="text"
								value={user?.fullName || ''}
								disabled
								className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
							/>
						</div>

						{/* Ticket Count */}
						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">
									Số Lượng Vé ({formatCurrency(tour?.price)} / vé)
								</label>
								<input
									type="number"
									name="number_of_tickets"
									value={formData.number_of_tickets}
									onChange={handleChange}
									className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-700"
									min="1"
									max={tour?.max_guests - tour?.current_number_guest || 0} // Giới hạn số lượng vé không vượt quá số vé còn lại
								/>
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">Số Lượng Vé Hiện Còn</label>
								<input
									type="number"
									value={tour?.max_guests - tour?.current_number_guest || 0}
									disabled
									className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
								/>
							</div>
						</div>

						{/* Total Price */}
						<div className="mb-6">
							<label className="block text-gray-700 font-semibold mb-2">Tổng tiền</label>
							<input
								type="text"
								value={formatCurrency(formData.total_price)}
								disabled
								className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
							/>
						</div>

						<div className="grid md:grid-cols-2 md:gap-6">
							{/* Tour Name */}
							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">Tên Tour</label>
								<input
									type="text"
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
									value={tour?.pickup_time || ''}
									disabled
									className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
								/>
							</div>
						</div>

						{/* Pickup Location */}
						<div className="mb-6">
							<label className="block text-gray-700 font-semibold mb-2">Địa điểm đón</label>
							<input
								type="text"
								value={tour?.pickup_location || ''}
								disabled
								className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
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
			)}
		</div>
	);
};

export default PaymentForm;
