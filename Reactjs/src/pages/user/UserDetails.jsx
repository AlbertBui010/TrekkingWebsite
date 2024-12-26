import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [isEditing, setIsEditing] = useState(false); // Trạng thái sửa thông tin

	// State tạm thời cho việc chỉnh sửa thông tin
	const [editedUser, setEditedUser] = useState({});

	// Lấy thông tin người dùng từ LocalStorage
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setUser(parsedUser);
				setEditedUser(parsedUser);
				fetchBookings(parsedUser.id);
			} catch (error) {
				console.error('Failed to parse user:', error);
			}
		} else {
			navigate('/login');
		}
	}, [navigate]);

	return (
		<>
			<Header />
			<div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
				<h2 className="text-2xl font-semibold text-center mb-6">Trang Cá Nhân</h2>

				{/* Danh sách tour đã đặt */}
				<div>
					<h3 className="text-xl font-medium mb-4">Danh Sách Tour Đã Đặt</h3>
					{bookings.length > 0 ? (
						<ul className="space-y-4">
							{bookings.map((booking) => (
								<li
									key={booking.id}
									className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between"
								>
									<div>
										<p className="text-lg font-semibold">{booking.tourName}</p>
										<p>Ngày đặt: {booking.date}</p>
										<p>Số lượng khách: {booking.guests}</p>
									</div>
									<div>
										<p className="text-blue-500 font-semibold">{booking.price} VND</p>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>Bạn chưa đặt tour nào.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default UserPage;
