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

	// // Fetch danh sách các tour đã đặt
	// const fetchBookings = async (userId) => {
	// 	try {
	// 		// const response = await getUserBookings(userId);
	// 		if (response.data?.errCode === 0) {
	// 			setBookings(response.data?.bookings || []);
	// 		} else {
	// 			toast.error('Không thể lấy dữ liệu đặt tour.');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching bookings:', error);
	// 		toast.error('Lỗi khi lấy danh sách tour đã đặt.');
	// 	}
	// };

	// // Cập nhật thông tin người dùng
	// const handleSaveUserInfo = async () => {
	// 	try {
	// 		const response = await updateUserInfo(editedUser);
	// 		if (response.data?.errCode === 0) {
	// 			toast.success('Cập nhật thông tin thành công.');
	// 			localStorage.setItem('user', JSON.stringify(editedUser));
	// 			setUser(editedUser);
	// 			setIsEditing(false);
	// 		} else {
	// 			toast.error(response.data?.message || 'Lỗi khi cập nhật thông tin.');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error updating user:', error);
	// 		toast.error('Không thể cập nhật thông tin.');
	// 	}
	// };

	// // Xử lý thay đổi input trong form
	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setEditedUser({ ...editedUser, [name]: value });
	// };

	return (
		<>
			<Header />
			<div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
				<h2 className="text-2xl font-semibold text-center mb-6">Trang Cá Nhân</h2>

				{/* Thông tin người dùng
				<div className="mb-8">
					<h3 className="text-xl font-medium mb-4">Thông Tin Cá Nhân</h3>
					{isEditing ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700">Họ và tên</label>
								<input
									type="text"
									name="fullName"
									value={editedUser.fullName}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Email</label>
								<input
									type="email"
									name="email"
									value={editedUser.email}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
								<input
									type="text"
									name="phoneNumber"
									value={editedUser.phoneNumber}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Giới tính</label>
								<select
									name="gender"
									value={editedUser.gender}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
								>
									<option value="Nam">Nam</option>
									<option value="Nữ">Nữ</option>
									<option value="Khác">Khác</option>
								</select>
							</div>
							<div className="col-span-2 flex justify-end gap-4">
								<button
									onClick={handleSaveUserInfo}
									className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
								>
									Lưu
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400"
								>
									Hủy
								</button>
							</div>
						</div>
					) : (
						<div>
							<p>Họ và tên: {user?.fullName}</p>
							<p>Email: {user?.email}</p>
							<p>Số điện thoại: {user?.phoneNumber}</p>
							<p>Giới tính: {user?.gender}</p>
							<button
								onClick={() => setIsEditing(true)}
								className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
							>
								Chỉnh sửa
							</button>
						</div>
					)}
				</div> */}

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
