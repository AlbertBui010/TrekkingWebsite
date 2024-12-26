import React, { useEffect, useState } from 'react';
import { handleGetAllBookingByUserIdServices } from '../../services/userServices';

const ViewBooking = ({ data }) => {
	const [bookings, setBookings] = useState([]);
	const [filteredBooking, setFilteredBooking] = useState([]); // Bookings to filter

	useEffect(() => {
		const fetchBookings = async () => {
			if (data) {
				try {
					const response = await handleGetAllBookingByUserIdServices({
						userId: data.userId,
						activationState: data.activationState,
					});

					const bookingData = response?.data?.data || [];
					setBookings(bookingData);
					setFilteredBooking(bookingData);
				} catch (error) {
					console.error('Error fetching bookings:', error);
				}
			}
		};
		fetchBookings();
	}, [data]);

	const handleViewDetailTour = (tourId) => {};

	return (
		<div>
			<h2 className="text-lg font-bold mb-4">Booking Information</h2>
			<table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg mt-4">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Tên tour</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
							Số lượng vé
						</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Trạng thái</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Ngày đi</th>
					</tr>
				</thead>
				<tbody>
					{filteredBooking.length > 0 ? (
						filteredBooking.map((booking, index) => (
							<tr
								key={index}
								className="hover:bg-gray-100"
								onClick={(boo) => handleViewDetailTour(booking)}
							>
								<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.tour.tourName}</td>
								<td className="py-2 px-4 border-b text-sm text-gray-700">
									{booking.number_of_tickets}
								</td>
								<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.status}</td>
								<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.tour.pickup_time}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={4} className="py-4 px-4 border-b text-center text-sm text-gray-500 italic">
								No bookings available.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ViewBooking;
