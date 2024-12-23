import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { handleDeleteTourService, handleGetAllTours } from '../../../services/adminServices';

const AdminManageTours = () => {
	const [tours, setTours] = useState([]);
	const [filteredTours, setFilteredTours] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [activityTypes, setActivityTypes] = useState([]);
	const navigate = useNavigate();

	// Fetch all tours
	useEffect(() => {
		const fetchTours = async () => {
			try {
				const response = await handleGetAllTours('ALL');
				let data = response?.data?.data;
				setTours(data);
				setFilteredTours(data);
				console.log('GUIDE', filteredTours);
				const uniqueActivityTypes = [...new Set(data.map((tour) => tour?.activityType?.name))];
				setActivityTypes(uniqueActivityTypes.map((type) => ({ value: type, label: type })));
			} catch (error) {
				console.error('Error fetching tours:', error);
			}
		};
		fetchTours();
	}, []);

	// Xử lý tìm kiếm theo tên
	useEffect(() => {
		if (searchTerm === '') {
			setFilteredTours(tours);
		} else {
			setFilteredTours(tours.filter((tour) => tour.tourName.toLowerCase().includes(searchTerm.toLowerCase())));
		}
	}, [searchTerm, tours]);

	// Sắp xếp theo loại hình hoạt động
	const handleSortByActivityType = (type) => {
		if (type) {
			setFilteredTours(tours.filter((tour) => tour?.activityType?.name === type.value));
		} else {
			setFilteredTours(tours);
		}
	};

	// Sắp xếp theo ngày tạo mới nhất
	const handleSortByDate = () => {
		const sortedTours = [...filteredTours].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		setFilteredTours(sortedTours);
	};

	// Xóa tour
	const handleDeleteTour = async (tourId) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa tour này?')) {
			try {
				let res = await handleDeleteTourService({ id: tourId });
				if (res?.data?.errCode === 0) {
					setTours(tours.filter((tour) => tour.id !== tourId));
				}
			} catch (error) {
				console.error('Error deleting tour:', error);
				alert('Không thể xóa tour.');
			}
		}
	};

	// Điều hướng tới trang thêm/sửa tour
	const handleEditOrCreate = (tour) => {
		if (tour) {
			navigate(`/admin/create-tour`, {
				state: {
					tour,
				},
			});
		} else {
			navigate('/admin/create-tour');
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4 text-center">Quản lý tour</h1>

			{/* Thanh tìm kiếm */}
			<div className="flex items-center mb-4 gap-4">
				<input
					type="text"
					placeholder="Tìm kiếm tour theo tên..."
					className="border border-gray-300 p-2 rounded w-1/3"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				{/* Bộ lọc theo loại hình hoạt động */}
				<Select
					options={activityTypes || []}
					placeholder="Lọc theo loại hình hoạt động"
					isClearable
					onChange={handleSortByActivityType}
				/>

				{/* Nút sắp xếp */}
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					onClick={handleSortByDate}
				>
					Ngày tạo mới nhất
				</button>
			</div>
			{/* Nút thêm tour */}
			<button
				className="mt-6 mb-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
				onClick={() => handleEditOrCreate()}
			>
				Thêm tour mới
			</button>
			{/* Danh sách tour */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredTours &&
					filteredTours?.map((tour) => {
						const images = tour?.image ? tour.image.split(',') : [];

						return (
							<div
								key={tour.id}
								className="border border-gray-300 p-4 rounded shadow-md bg-cover bg-center"
								style={{
									backgroundImage: images.length > 0 ? `url(${images[0]})` : 'none',
								}}
							>
								<div className="bg-white bg-opacity-80 p-4 rounded">
									<h2 className="text-xl font-semibold mb-2">{tour.tourName}</h2>
									<p className="text-gray-900 mb-2">Loại hình: {tour?.activityType?.name}</p>
									<p className="text-gray-900 mb-2">Guide: {tour?.guide?.fullName}</p>
									<p className="text-gray-900 mb-2">Ngày khởi hành: {tour?.pickup_time}</p>
									<p className="text-gray-900 mb-2">
										Số khách: {tour?.current_number_guest} / {tour?.max_guests}
									</p>

									<div className="flex justify-between items-center mt-4">
										<button
											className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
											onClick={() => handleEditOrCreate(tour)}
										>
											Sửa
										</button>
										<button
											className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
											onClick={() => handleDeleteTour(tour.id)}
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default AdminManageTours;
