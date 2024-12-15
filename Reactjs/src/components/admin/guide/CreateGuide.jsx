import React, { useEffect, useState } from 'react';
import { handleCreateGuideService, handleUpdateGuideService } from '../../../services/adminServices';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateGuide = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [newLink, setNewLink] = useState('');
	const [imageLink, setImageLink] = useState('');
	const [error, setError] = useState('');

	const [formData, setFormData] = useState({
		fullName: '',
		expertGuideDescription: '',
		image: null,
		phoneNumber: '',
	});

	useEffect(() => {
		if (location?.state?.guide) {
			let guideToUpdate = location.state.guide;
			setFormData(guideToUpdate);
			setImageLink(guideToUpdate.image);
		}
	}, [location]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCreateGuide = async (e) => {
		e.preventDefault();

		if (!imageLink) {
			alert('Vui lòng thêm ảnh trước khi gửi!');
			return;
		}

		const guideInfo = {
			...formData,
			image: imageLink,
		};

		try {
			if (guideInfo?.id) {
				let response = await handleUpdateGuideService(guideInfo);
				if (response?.data?.errCode === 0) {
					navigate('/admin/manage-guides');
				}
			} else {
				let response = await handleCreateGuideService(guideInfo);
				if (response?.data?.errCode === 0) {
					setFormData({
						fullName: '',
						expertGuideDescription: '',
						image: null,
						phoneNumber: '',
					});
					setImageLink('');
					setNewLink('');
					alert('Thêm guide thành công!');
				}
			}
		} catch (e) {
			console.log('ERROR', e);
		}
	};

	const handleAddImage = () => {
		if (newLink) {
			const imgRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/i;
			if (imgRegex.test(newLink)) {
				setImageLink(newLink);
				setError('');
			} else {
				setError('Đường link ảnh không hợp lệ.');
			}
		} else {
			setError('Vui lòng nhập URL ảnh.');
		}
	};

	const handleRemoveImage = () => {
		setImageLink('');
		setNewLink('');
	};

	return (
		<div className="flex justify-center min-h-screen bg-gray-100">
			<div className="mt-8 h-fit bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl h">
				<h2 className="text-2xl font-bold text-center mb-6">Thông Tin Guide</h2>
				<form className="w-full" onSubmit={(e) => handleCreateGuide(e)}>
					{/* Full Name */}
					<div className="mb-4">
						<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
							Họ và tên:
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleInputChange}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Nhập họ và tên guide"
							required
						/>
					</div>

					{/* Expert Guide Description */}
					<div className="mb-4">
						<label htmlFor="expertGuideDescription" className="block text-sm font-medium text-gray-700">
							Mô tả chuyên gia:
						</label>
						<textarea
							id="expertGuideDescription"
							name="expertGuideDescription"
							value={formData.expertGuideDescription}
							onChange={handleInputChange}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Nhập mô tả về chuyên gia"
							rows="4"
							required
						/>
					</div>

					{/* Phone Number */}
					<div className="mb-4">
						<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
							Số điện thoại:
						</label>
						<input
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Nhập số điện thoại"
							required
						/>
					</div>

					{/* Image Upload */}
					<div className="mb-4">
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
						<button
							type="button"
							onClick={handleAddImage}
							className="mt-2 p-2 bg-blue-500 text-white rounded"
						>
							Thêm ảnh
						</button>
						{error && <p className="mt-2 text-sm text-red-500">{error}</p>}

						<div className="mt-4">
							{imageLink && (
								<div className="relative inline-block">
									<img
										src={imageLink}
										alt="Hình ảnh"
										className="w-48 h-48 object-cover rounded-md mx-auto"
									/>
									{/* Nút xóa */}
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-1 right-1 bg-red-500 text-white p-2 text-xs shadow-md hover:bg-red-600"
									>
										X
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{formData && formData?.id ? 'Update' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateGuide;
