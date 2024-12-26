import React, { useState } from 'react';
import Select from 'react-select';

const EditTourModal = ({ tour, guides, onSave, onCancel, onChange }) => {
	const options = guides;
	const [selectedOption, setSelectedOptions] = useState([]);
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	const handleChange = (e) => {
		onChange({ ...tour, guideId: e.target.value }); // Update guideId in the tour object
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSave();
				}}
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
			>
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => onCancel()} // Call the cancel function
						className="text-gray-500 hover:text-gray-800 focus:outline-none"
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<h1 className="text-4xl font-bold text-center mb-8">
					Chỉnh sửa thông tin <br />
				</h1>
				{/* tên tour */}
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="tourName"
						id="tourName"
						value={tour.tourName || ''}
						onChange={(e) => onChange({ ...tour, tourName: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="tourName"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Tên tour
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="tourDescription"
						id="tourDescription"
						value={tour.tourDescription || ''}
						onChange={(e) => onChange({ ...tour, tourDescription: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="tourDescription"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Mô tả tour
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="number"
						name="outdoorActivityTypeId"
						id="outdoorActivityTypeId"
						value={tour.outdoorActivityTypeId || ''}
						onChange={(e) => onChange({ ...tour, outdoorActivityTypeId: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="outdoorActivityTypeId"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Loại hình hoạt động
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="image"
						id="image"
						value={tour.outdoorActivityTypeId || ''}
						onChange={(e) => onChange({ ...tour, outdoorActivityTypeId: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="image"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Hình ảnh
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<label htmlFor="guideId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Chọn hướng dẫn viên
					</label>
					<Select value={selectedOption} onChange={() => handleChange()} options={options} />
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="best_month"
						id="best_month"
						value={tour.best_month || ''}
						onChange={(e) => onChange({ ...tour, best_month: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="best_month"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Tháng đẹp nhất
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="number"
						name="max_guests"
						id="max_guests"
						value={tour.max_guests || ''}
						onChange={(e) => onChange({ ...tour, max_guests: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="max_guests"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Số khách tối đa
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="pickup_time"
						id="pickup_time"
						value={tour.pickup_time || ''}
						onChange={(e) => onChange({ ...tour, pickup_time: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="pickup_time"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Thời gian đón và khởi hành
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="pickup_location"
						id="pickup_location"
						value={tour.pickup_location || ''}
						onChange={(e) => onChange({ ...tour, pickup_location: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="pickup_location"
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
						value={tour.group_assembly_area || ''}
						onChange={(e) => onChange({ ...tour, group_assembly_area: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="group_assembly_area"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Khu vực
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="conquest_duration"
						id="conquest_duration"
						value={tour.conquest_duration || ''}
						onChange={(e) => onChange({ ...tour, conquest_duration: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="conquest_duration"
						className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Thời gian chinh phục
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="medical_access_time"
						id="medical_access_time"
						value={tour.medical_access_time || ''}
						onChange={(e) => onChange({ ...tour, medical_access_time: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="medical_access_time"
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
						value={tour.distance || ''}
						onChange={(e) => onChange({ ...tour, distance: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="distance"
						className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Quãng đường (km)
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="peak_altitude"
						id="peak_altitude"
						value={tour.peak_altitude || ''}
						onChange={(e) => onChange({ ...tour, peak_altitude: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="peak_altitude"
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
						value={tour.activity_duration || ''}
						onChange={(e) => onChange({ ...tour, activity_duration: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="activity_duration"
						className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Thời gian hoạt động
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<textarea
						name="schedule_detail"
						id="schedule_detail"
						value={tour.schedule_detail || ''}
						onChange={(e) => onChange({ ...tour, schedule_detail: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					></textarea>
					<label
						for="schedule_detail"
						className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Chi tiết lịch trình
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="price"
						id="price"
						value={tour.price || ''}
						onChange={(e) => onChange({ ...tour, price: e.target.value })}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						for="price"
						className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Giá (VNĐ)
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group flex justify-end gap-4">
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Submit
					</button>
					<button
						type="button"
						onClick={() => onCancel()}
						className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditTourModal;
