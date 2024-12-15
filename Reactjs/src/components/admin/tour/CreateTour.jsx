import React, { useState } from 'react';
import Select from 'react-select';
import {
	handleGetAllGuides,
	handleGetAllActivityType,
	handleCreateTour,
	handleUpdateTour,
} from '../../../services/adminServices';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateTour = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [guides, setGuides] = useState([]);
	const [activityTypes, setActivityTypes] = useState([]);
	const [error, setError] = useState('');
	// image
	const [imageLinks, setImageLinks] = useState([]);
	const [newLink, setNewLink] = useState('');

	// time
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [pickupTime, setPickupTime] = useState('');

	const [tour, setTour] = useState({
		tourName: '',
		tourDescription: '',
		outdoorActivityTypeId: '',
		guideId: '',
		image: '',
		max_guests: '',
		pickup_time: '',
		pickup_location: '',
		group_assembly_area: '',
		medical_access_time: '',
		distance: '',
		peak_altitude: '',
		activity_duration: '',
		price: '',
		best_month: '',
		schedule_detail: '',
		conquest_duration: '',
	});

	useEffect(() => {
		if (location?.state?.tour) {
			let tourToUpdate = location.state.tour;
			setTour({
				id: tourToUpdate.id,
				tourName: tourToUpdate.tourName,
				tourDescription: tourToUpdate.tourDescription,
				outdoorActivityTypeId: tourToUpdate.outdoorActivityTypeId,
				guideId: tourToUpdate.guideId,
				image: tourToUpdate.image,
				max_guests: tourToUpdate.max_guests,
				pickup_time: tourToUpdate.pickup_time,
				pickup_location: tourToUpdate.pickup_location,
				group_assembly_area: tourToUpdate.group_assembly_area,
				medical_access_time: tourToUpdate.medical_access_time,
				distance: tourToUpdate.distance,
				peak_altitude: tourToUpdate.peak_altitude,
				activity_duration: tourToUpdate.activity_duration,
				price: tourToUpdate.price,
				best_month: tourToUpdate.best_month,
				schedule_detail: tourToUpdate.schedule_detail,
				conquest_duration: tourToUpdate.conquest_duration,
			});

			const existingImages = tourToUpdate?.image ? tourToUpdate.image.split(',') : [];
			setImageLinks(existingImages);

			setPickupTime(tourToUpdate?.pickup_time); // 2025-02-07 21:30
			const [tourDate, tourTime] = tourToUpdate?.pickup_time.split(' ');
			setDate(tourDate);
			setTime(tourTime);
		}
	}, [location]);

	useEffect(() => {
		const fetchGuides = async () => {
			try {
				const response = await handleGetAllGuides('ALL');
				const guidesData = response?.data?.data || [];
				const formattedGuides = guidesData?.map((guide) => ({
					value: guide.id,
					label: guide.fullName,
				}));
				setGuides(formattedGuides);
			} catch (error) {
				console.error('Error fetching guides:', error);
			}
		};

		fetchGuides();
	}, []);

	useEffect(() => {
		const fetchActivityTypes = async () => {
			try {
				const response = await handleGetAllActivityType('ALL');
				const activityTypes = response?.data?.type || [];
				const formattedActivityTypes = activityTypes.map((type) => ({
					value: type.id,
					label: type.name,
				}));
				setActivityTypes(formattedActivityTypes);
			} catch (error) {
				console.error('Error fetching activity types:', error);
			}
		};

		fetchActivityTypes();
	}, []);

	const handleGuideChange = (selectedOption) => {
		setTour({
			...tour,
			guideId: selectedOption.value,
		});
	};

	const handleOutDoorActivityChange = (selectedOption) => {
		setTour({
			...tour,
			outdoorActivityTypeId: selectedOption.value,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTour((prevTour) => ({
			...prevTour,
			[name]: value,
		}));
	};

	const handleAddImage = () => {
		if (!newLink || !isValidURL(newLink)) {
			setError('Vui lòng nhập một URL hợp lệ.');
			return;
		}

		setImageLinks([...imageLinks, newLink]);
		setNewLink('');
		setError('');
	};

	const isValidURL = (url) => {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// image
		if (!imageLinks || imageLinks.length === 0) {
			alert('Vui lòng chọn ít nhất một ảnh để upload tour!!!');
			return;
		}

		if (pickupTime === '') {
			alert('Vui lòng chọn ngày giờ khởi hành!!!');
			return;
		}

		const updatedTour = {
			...tour,
			image: imageLinks.join(','),
			pickup_time: pickupTime,
		};

		if (updatedTour?.id != null) {
			try {
				let response = await handleUpdateTour(updatedTour);
				if (response?.data?.errCode === 0) {
					navigate('/admin/manage-tours');
				}
			} catch (e) {
				console.log('ERROR', e);
			}
		} else {
			try {
				let response = await handleCreateTour(updatedTour);
				if (response?.data?.data && response?.data?.errCode === 0) {
					alert('Thêm tour thành công.');
					clearTourInfo();
				} else {
					alert('Thêm tour thất bại, vui lòng thử lại!!!');
				}
			} catch (e) {
				console.log('ERROR:', e);
			}
		}
	};

	const handleRemoveImage = (index) => {
		const updatedImageLinks = imageLinks.filter((_, i) => i !== index); // Loại bỏ hình ảnh tại vị trí `index`
		setImageLinks(updatedImageLinks);
	};

	const clearTourInfo = () => {
		setTour({
			tourName: '',
			tourDescription: '',
			outdoorActivityTypeId: '',
			guideId: '',
			image: '',
			max_guests: '',
			pickup_time: '',
			pickup_location: '',
			group_assembly_area: '',
			medical_access_time: '',
			distance: '',
			peak_altitude: '',
			activity_duration: '',
			price: '',
			best_month: '',
			schedule_detail: '',
			conquest_duration: '',
		});

		setImageLinks([]);
	};

	const handleDateChange = (e) => {
		const selectedDate = e.target.value;
		setDate(selectedDate);
		updatePickupTime(selectedDate, time);
	};

	const handleTimeChange = (selectedTime) => {
		setTime(selectedTime);
		updatePickupTime(date, selectedTime);
	};

	const updatePickupTime = (date, time) => {
		if (date && time) {
			const formattedPickupTime = `${date} ${time}`;
			setPickupTime(formattedPickupTime);
			console.log(formattedPickupTime);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="mt-4 bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
				<h2 className="text-2xl font-bold text-center mb-6">Thông Tin Tour</h2>
				<form className="w-full">
					<div className="grid md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="tourName"
								id="tourName"
								value={tour?.tourName || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>

							<label
								htmlFor="tourName"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Tên tour
							</label>
						</div>
					</div>
					<div className="grid md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<textarea
								name="tourDescription"
								id="tourDescription"
								value={tour?.tourDescription || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=""
								required
							></textarea>
							<label
								htmlFor="tourDescription"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Mô tả tour
							</label>
						</div>
					</div>
					<div className="grid md:gap-6">
						<div className="">
							<label
								htmlFor="guideId"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Chọn loại hình hoạt động
							</label>
							<div>
								<Select
									value={activityTypes.find((type) => type.value === tour.outdoorActivityTypeId)}
									onChange={handleOutDoorActivityChange}
									options={activityTypes}
									required
								/>
							</div>
						</div>

						<div className="relative z-0 w-full mb-5 group">
							<label
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								htmlFor="file_input"
							>
								Thêm ảnh (URL)
							</label>
							<input
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="text"
								placeholder="Nhập URL ảnh"
								value={newLink}
								onChange={(e) => setNewLink(e.target.value)}
							/>
							<button onClick={handleAddImage} className="mt-2 p-2 bg-blue-500 text-white rounded">
								Thêm ảnh
							</button>
							{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
							<div className="mt-4 flex flex-wrap">
								{/* Hiển thị tất cả các ảnh từ URL */}
								{imageLinks.map((link, index) => (
									<div key={index} className="relative">
										<img
											src={link}
											alt={`Hình ảnh ${index + 1}`}
											className="w-32 h-32 object-cover mr-2 mb-2"
										/>
										{/* Nút xóa */}
										<button
											onClick={() => handleRemoveImage(index)}
											className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
										>
											Xóa
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-999 w-full mb-5 group">
							<label
								htmlFor="guideId"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Chọn hướng dẫn viên
							</label>
							<div>
								<Select
									value={guides.find((guide) => guide.value === tour.guideId)}
									onChange={handleGuideChange}
									options={guides}
									required
								/>
							</div>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="number"
								name="max_guests"
								id="max_guests"
								value={tour?.max_guests || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=""
								required
							/>
							<label
								htmlFor="max_guests"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Số khách tối đa
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="conquest_duration"
								id="conquest_duration"
								value={tour?.conquest_duration || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=""
								required
							/>
							<label
								htmlFor="conquest_duration"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Thời gian chinh phục
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<div className="flex items-end gap-4">
								{/* Input ngày */}
								<div className="flex-1">
									<label
										htmlFor="date"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Chọn ngày:
									</label>
									<input
										type="date"
										id="date"
										value={date}
										onChange={handleDateChange}
										min={new Date().toISOString().split('T')[0]} // Ngày hiện tại
										className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>

								{/* Input giờ */}
								<div className="flex-1">
									<label
										htmlFor="time"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Chọn giờ:
									</label>
									<input
										type="time"
										id="time"
										name="time"
										value={time}
										onChange={(e) => handleTimeChange(e.target.value)}
										min={new Date().toTimeString().split(' ')[0].slice(0, 5)} // Giờ hiện tại
										className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="pickup_location"
								id="pickup_location"
								value={tour?.pickup_location || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="pickup_location"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Địa điểm đón
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="group_assembly_area"
								id="group_assembly_area"
								value={tour?.group_assembly_area || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="group_assembly_area"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Khu vực
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="medical_access_time"
								id="medical_access_time"
								value={tour?.medical_access_time || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="medical_access_time"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Thời gian tiếp cận y tế
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="number"
								name="distance"
								id="distance"
								value={tour?.distance || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="distance"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Quãng đường (km)
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="peak_altitude"
								id="peak_altitude"
								value={tour?.peak_altitude || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="peak_altitude"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Độ cao đỉnh (m)
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="activity_duration"
								id="activity_duration"
								value={tour?.activity_duration || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="activity_duration"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Thời gian hoạt động
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="price"
								id="price"
								value={tour?.price || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="price"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Giá (VNĐ)
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="best_month"
								id="best_month"
								value={tour?.best_month || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="best_month"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Tháng đẹp nhất
							</label>
						</div>
					</div>
					<div className="grid md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<textarea
								name="schedule_detail"
								id="schedule_detail"
								value={tour?.schedule_detail || ''}
								onChange={handleChange}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=""
								required
							></textarea>
							<label
								htmlFor="schedule_detail"
								className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Chi tiết lịch trình
							</label>
						</div>
					</div>
					<button
						type="submit"
						onClick={handleSubmit}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{tour && tour?.id ? 'Update' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTour;
