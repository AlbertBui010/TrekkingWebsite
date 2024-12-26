import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGetAllGuidesServices, handleUpdateGuideServices } from '../../../services/adminServices';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { activationState } from '../../../Utils/constants';

const ManageGuides = () => {
	const [guides, setGuides] = useState([]);
	const [filteredGuides, setFilteredGuides] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [phoneSearchTerm, setPhoneSearchTerm] = useState('');
	const navigate = useNavigate();

	// Fetch all guides
	useEffect(() => {
		const fetchGuides = async () => {
			try {
				const response = await handleGetAllGuidesServices({ id: 'ALL' });
				let data = response?.data?.data;
				setGuides(data);
				setFilteredGuides(data);
			} catch (error) {
				console.error('Error fetching guides:', error);
			}
		};
		fetchGuides();
	}, []);

	// Handle search by guide name and phone number
	useEffect(() => {
		if (searchTerm === '' && phoneSearchTerm === '') {
			setFilteredGuides(guides);
		} else {
			setFilteredGuides(
				guides.filter(
					(guide) =>
						guide.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
						guide.phoneNumber.toLowerCase().includes(phoneSearchTerm.toLowerCase()),
				),
			);
		}
	}, [searchTerm, phoneSearchTerm, guides]);

	// Handle delete guide
	const handleToggleDisplayGuide = async (guide) => {
		try {
			let activationState = guide.activationState === 'Show' ? 'Hide' : 'Show';
			let res = await handleUpdateGuideServices({
				...guide,
				activationState,
			});
			if (res?.data?.errCode === 0) {
				setGuides(guides.map((item) => (item.id === guide.id ? { ...item, activationState } : item)));
			}
		} catch (e) {
			toast.error('Có lỗi xảy ra khi ẩn/hiện guide');
			console.error('Error deleting guide:', e);
		}
	};

	// Handle edit or create guide
	const handleEditOrCreate = (guide) => {
		if (guide) {
			navigate(`/admin/create-guide`, {
				state: {
					guide,
				},
			});
		} else {
			navigate('/admin/create-guide');
		}
	};

	const handleSortByActivationState = (state) => {
		if (state) {
			setFilteredGuides(guides.filter((guide) => guide.activationState === state.value));
		} else {
			setFilteredGuides(guides);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4 text-center">Quản lý Guides</h1>

			{/* Search bar for guide name */}
			<div className="flex items-center mb-4 gap-4">
				<input
					type="text"
					placeholder="Tìm kiếm guide theo tên..."
					className="border border-gray-300 p-2 rounded  w-1/3"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{/* Search bar for phone number */}
				<input
					type="text"
					placeholder="Tìm kiếm theo số điện thoại..."
					className="border border-gray-300 p-2 rounded  w-1/3"
					value={phoneSearchTerm}
					onChange={(e) => setPhoneSearchTerm(e.target.value)}
				/>

				{/* Bộ lọc theo activationState */}
				<Select
					options={activationState || []}
					placeholder="Trạng thái"
					isClearable
					onChange={handleSortByActivationState}
				/>
			</div>

			{/* Add new guide button */}
			<button
				className="mt-6 mb-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
				onClick={() => handleEditOrCreate()}
			>
				Thêm guide mới
			</button>
			{/* List of guides */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{filteredGuides &&
					filteredGuides?.map((guide) => (
						<div
							key={guide.id}
							className="flex flex-col items-center pb-10 border border-gray-200 rounded-lg shadow bg-white"
						>
							<img
								className="w-24 h-24 mt-4 mb-4 rounded-full shadow-lg"
								src={guide?.image}
								alt={guide?.fullName}
							/>
							<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
								{guide?.fullName}
							</h5>
							<span className="text-sm text-gray-500 dark:text-gray-400">{guide?.phoneNumber}</span>
							<div className="flex mt-4">
								<button
									className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() => handleEditOrCreate(guide)}
								>
									Sửa
								</button>
								<button
									className="py-2 px-8 ms-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
									onClick={() => handleToggleDisplayGuide(guide)}
								>
									{guide.activationState === 'Show' ? 'Ẩn' : 'Hiện'}
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ManageGuides;
