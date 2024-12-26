import { handleUpdateBookingServices } from '../../../services/userServices';
import React, { useState, useEffect } from 'react';
import { handleGetAllBookingServices, handleGetAllUserServices } from '../../../services/adminServices';
import { toast } from 'react-toastify';

const StatisticsPage = () => {
	const [bookings, setBookings] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [users, setUsers] = useState([]);
	const [sortOrder, setSortOrder] = useState('desc'); // 'desc' hoặc 'asc'

	const [statistics, setStatistics] = useState({
		totalRevenue: 0,
		totalTickets: 0,
		topTours: [],
	});
	const [filters, setFilters] = useState({
		status: '',
	});

	useEffect(() => {
		fetchBookings();
		fetchUsers();
	}, []);

	useEffect(() => {
		filterAndCalculateStatistics();
	}, [bookings, filters, sortOrder]);

	// Lấy danh sách bookings
	const fetchBookings = async () => {
		try {
			const response = await handleGetAllBookingServices({ id: 'ALL' });
			setBookings(response?.data?.data);
		} catch (error) {
			console.error('Error fetching bookings:', error);
		}
	};

	// Lấy danh sách users
	const fetchUsers = async () => {
		try {
			const response = await handleGetAllUserServices({ id: 'ALL' });
			setUsers(response?.data?.data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	// Tính toán thống kê
	const filterAndCalculateStatistics = () => {
		const { status } = filters;

		// Lọc bookings theo trạng thái
		const filtered = bookings
			.filter((booking) => {
				const matchesStatus = !status || booking.status === status;
				return matchesStatus;
			})
			.sort((a, b) => {
				// Sắp xếp theo thứ tự thời gian
				if (sortOrder === 'desc') {
					return new Date(b.createdAt) - new Date(a.createdAt);
				} else {
					return new Date(a.createdAt) - new Date(b.createdAt);
				}
			});

		setFilteredBookings(filtered);

		// Tính toán thống kê
		const totalRevenue = filtered.reduce((sum, booking) => sum + booking.total_price, 0);
		const totalTickets = filtered.reduce((sum, booking) => sum + booking.number_of_tickets, 0);

		// Tìm top các tour
		const tourStats = filtered.reduce((acc, booking) => {
			const tourName = booking.tour.tourName;
			if (!acc[tourName]) {
				acc[tourName] = { name: tourName, count: 0, revenue: 0 };
			}
			acc[tourName].count += booking.number_of_tickets;
			acc[tourName].revenue += booking.total_price;
			return acc;
		}, {});

		const topTours = Object.values(tourStats)
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		setStatistics({ totalRevenue, totalTickets, topTours });
	};

	// Xử lý thay đổi bộ lọc
	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	// Xử lý thay đổi sắp xếp
	const handleSortOrderChange = (e) => {
		setSortOrder(e.target.value);
	};

	// Cập nhật trạng thái booking
	const handleUpdateBookingStatus = async (bookingId, newStatus) => {
		try {
			const response = await handleUpdateBookingServices({ id: bookingId, status: newStatus });

			if (response.data.errCode === 0) {
				toast.success('Cập nhật trạng thái thành công!');
				// Làm mới danh sách bookings sau khi cập nhật
				fetchBookings();
			} else {
				toast.error('Cập nhật trạng thái thất bại!');
			}
		} catch (error) {
			console.error('Error updating booking status:', error);
			toast.error('Có lỗi xảy ra!');
		}
	};

	// Lấy tên user từ danh sách user dựa trên userId
	const getUserNameById = (userId) => {
		const user = users.find((user) => user.id === userId);
		return user?.fullName || 'N/A';
	};

	return (
		<div className="p-8 bg-white rounded-lg shadow">
			<h1 className="text-center text-3xl font-bold mb-6">Thống kê booking</h1>

			{/* Thống kê nhanh */}
			<div className="mb-6 flex gap-8">
				<div>
					<h2 className="text-xl font-semibold">Tổng tiền</h2>
					<p className="text-2xl font-bold text-green-500">
						{statistics.totalRevenue.toLocaleString('vi-VN')} VNĐ
					</p>
				</div>
				<div>
					<h2 className="text-xl font-semibold">Tổng số vé</h2>
					<p className="text-2xl font-bold text-blue-500">{statistics.totalTickets}</p>
				</div>
			</div>

			{/* Bộ lọc */}
			<div className="mb-6 flex gap-4">
				<div>
					<label className="block font-semibold mb-1">Trạng thái:</label>
					<select name="status" className="border rounded p-2" onChange={handleFilterChange}>
						<option value="">All</option>
						<option value="register">Register</option>
						<option value="confirm">Confirm</option>
						<option value="cancel">Cancel</option>
					</select>
				</div>
				<div>
					<label className="block font-semibold mb-1">Ngày đăng ký:</label>
					<select value={sortOrder} className="border rounded p-2" onChange={handleSortOrderChange}>
						<option value="desc">Mới nhất</option>
						<option value="asc">Cũ</option>
					</select>
				</div>
			</div>

			{/* Hiển thị danh sách bookings */}
			<table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg mt-4">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Tên user</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Tên tour</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Số vé</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Trạng thái</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
							Ngày đăng ký
						</th>
						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
							Ngày khởi hành
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredBookings.map((booking, index) => (
						<tr key={index} className="hover:bg-gray-100">
							<td className="py-2 px-4 border-b text-sm text-gray-700">
								{getUserNameById(booking.userId)}
							</td>
							<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.tour.tourName}</td>
							<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.number_of_tickets}</td>
							<td className="py-2 px-4 border-b text-sm text-gray-700">
								<select
									value={booking.status}
									onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
									className="border rounded p-1"
								>
									<option value="register">Register</option>
									<option value="confirm">Confirm</option>
									<option value="cancel">Cancel</option>
								</select>
							</td>
							<td className="py-2 px-4 border-b text-sm text-gray-700">
								{new Date(booking.createdAt).toLocaleString('vi-VN')}
							</td>
							<td className="py-2 px-4 border-b text-sm text-gray-700">
								{new Date(booking.tour.pickup_time).toLocaleString('vi-VN')}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Top các tour */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">Top Tours</h2>
				<table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg mt-4">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
								Tên tour
							</th>
							<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Số vé</th>
							<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
								Doanh thu
							</th>
						</tr>
					</thead>
					<tbody>
						{statistics.topTours.map((tour, index) => (
							<tr key={index} className="hover:bg-gray-100">
								<td className="py-2 px-4 border-b text-sm text-gray-700">{tour.name}</td>
								<td className="py-2 px-4 border-b text-sm text-gray-700">{tour.count}</td>
								<td className="py-2 px-4 border-b text-sm text-gray-700">
									{tour.revenue.toLocaleString('vi-VN')} VNĐ
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StatisticsPage;

// import { handleUpdateBookingServices } from '../../../services/userServices';
// import React, { useState, useEffect } from 'react';
// import { handleGetAllBookingServices, handleGetAllUserServices } from '../../../services/adminServices';
// import { toast } from 'react-toastify';

// const StatisticsPage = () => {
// 	const [bookings, setBookings] = useState([]);
// 	const [filteredBookings, setFilteredBookings] = useState([]);
// 	const [users, setUsers] = useState([]);
// 	const [sortOrder, setSortOrder] = useState('desc'); // 'desc' hoặc 'asc'

// 	const [statistics, setStatistics] = useState({
// 		totalRevenue: 0,
// 		totalTickets: 0,
// 		topTours: [],
// 	});
// 	const [filters, setFilters] = useState({
// 		status: '',
// 	});

// 	useEffect(() => {
// 		fetchBookings();
// 		fetchUsers();
// 	}, []);

// 	useEffect(() => {
// 		filterAndCalculateStatistics();
// 	}, [bookings, filters, sortOrder]);

// 	// Lấy danh sách bookings
// 	const fetchBookings = async () => {
// 		try {
// 			const response = await handleGetAllBookingServices({ id: 'ALL' });
// 			setBookings(response?.data?.data);
// 		} catch (error) {
// 			console.error('Error fetching bookings:', error);
// 		}
// 	};

// 	// Lấy danh sách users
// 	const fetchUsers = async () => {
// 		try {
// 			const response = await handleGetAllUserServices({ id: 'ALL' });
// 			setUsers(response?.data?.data);
// 		} catch (error) {
// 			console.error('Error fetching users:', error);
// 		}
// 	};

// 	// Tính toán thống kê
// 	const filterAndCalculateStatistics = () => {
// 		const { status } = filters;

// 		// Lọc bookings theo trạng thái
// 		const filtered = bookings
// 			.filter((booking) => {
// 				const matchesStatus = !status || booking.status === status;
// 				return matchesStatus;
// 			})
// 			.sort((a, b) => {
// 				// Sắp xếp theo thứ tự thời gian
// 				if (sortOrder === 'desc') {
// 					return new Date(b.createdAt) - new Date(a.createdAt);
// 				} else {
// 					return new Date(a.createdAt) - new Date(b.createdAt);
// 				}
// 			});

// 		setFilteredBookings(filtered);

// 		// Tính toán thống kê
// 		const totalRevenue = filtered.reduce((sum, booking) => sum + booking.total_price, 0);
// 		const totalTickets = filtered.reduce((sum, booking) => sum + booking.number_of_tickets, 0);

// 		// Tìm top các tour
// 		const tourStats = filtered.reduce((acc, booking) => {
// 			const tourName = booking.tour.tourName;
// 			if (!acc[tourName]) {
// 				acc[tourName] = { name: tourName, count: 0, revenue: 0 };
// 			}
// 			acc[tourName].count += booking.number_of_tickets;
// 			acc[tourName].revenue += booking.total_price;
// 			return acc;
// 		}, {});

// 		const topTours = Object.values(tourStats)
// 			.sort((a, b) => b.count - a.count)
// 			.slice(0, 5);

// 		setStatistics({ totalRevenue, totalTickets, topTours });
// 	};

// 	// Xử lý thay đổi bộ lọc
// 	const handleFilterChange = (e) => {
// 		const { name, value } = e.target;
// 		setFilters((prevFilters) => ({
// 			...prevFilters,
// 			[name]: value,
// 		}));
// 	};

// 	// Xử lý thay đổi sắp xếp
// 	const handleSortOrderChange = (e) => {
// 		setSortOrder(e.target.value);
// 	};

// 	// Cập nhật trạng thái booking
// 	const handleUpdateBookingStatus = async (bookingId, newStatus) => {
// 		try {
// 			const response = await handleUpdateBookingServices({ id: bookingId, status: newStatus });

// 			if (response.data.errCode === 0) {
// 				toast.success('Cập nhật trạng thái thành công!');
// 				// Làm mới danh sách bookings sau khi cập nhật
// 				fetchBookings();
// 			} else {
// 				toast.error('Cập nhật trạng thái thất bại!');
// 			}
// 		} catch (error) {
// 			console.error('Error updating booking status:', error);
// 			toast.error('Có lỗi xảy ra!');
// 		}
// 	};

// 	// Lấy tên user từ danh sách user dựa trên userId
// 	const getUserNameById = (userId) => {
// 		const user = users.find((user) => user.id === userId);
// 		return user?.fullName || 'N/A';
// 	};

// 	return (
// 		<div className="p-8 bg-white rounded-lg shadow">
// 			<h1 className="text-3xl font-bold mb-6">Thống kê booking</h1>

// 			{/* Thống kê nhanh */}
// 			<div className="mb-6 flex gap-8">
// 				<div>
// 					<h2 className="text-xl font-semibold">Tổng tiền</h2>
// 					<p className="text-2xl font-bold text-green-500">
// 						{statistics.totalRevenue.toLocaleString('vi-VN')} VNĐ
// 					</p>
// 				</div>
// 				<div>
// 					<h2 className="text-xl font-semibold">Tổng số vé</h2>
// 					<p className="text-2xl font-bold text-blue-500">{statistics.totalTickets}</p>
// 				</div>
// 			</div>

// 			{/* Bộ lọc */}
// 			<div className="mb-6 flex gap-4">
// 				<div>
// 					<label className="block font-semibold mb-1">Status:</label>
// 					<select name="status" className="border rounded p-2" onChange={handleFilterChange}>
// 						<option value="">All</option>
// 						<option value="register">Register</option>
// 						<option value="confirm">Confirm</option>
// 						<option value="cancel">Cancel</option>
// 					</select>
// 				</div>
// 				<div>
// 					<label className="block font-semibold mb-1">Sort By:</label>
// 					<select value={sortOrder} className="border rounded p-2" onChange={handleSortOrderChange}>
// 						<option value="desc">Newest First</option>
// 						<option value="asc">Oldest First</option>
// 					</select>
// 				</div>
// 			</div>

// 			{/* Hiển thị danh sách bookings */}
// 			<table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg mt-4">
// 				<thead>
// 					<tr>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Tên user</th>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Tên tour</th>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Số vé</th>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Trạng thái</th>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
// 						<th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
// 							Ngày khởi hành
// 						</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{filteredBookings.map((booking, index) => (
// 						<tr key={index} className="hover:bg-gray-100">
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">
// 								{getUserNameById(booking.userId)}
// 							</td>
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.tour.tourName}</td>
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">{booking.number_of_tickets}</td>
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">
// 								<select
// 									value={booking.status}
// 									onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
// 									className="border rounded p-1"
// 								>
// 									<option value="register">Register</option>
// 									<option value="confirm">Confirm</option>
// 									<option value="cancel">Cancel</option>
// 								</select>
// 							</td>
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">
// 								{new Date(booking.createdAt).toLocaleString('vi-VN')}
// 							</td>
// 							<td className="py-2 px-4 border-b text-sm text-gray-700">
// 								{new Date(booking.tour.pickup_time).toLocaleString('vi-VN')}
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

// export default StatisticsPage;
