import React, { useEffect, useState } from 'react';
import Header from '../Header';
// import { handleUpdateUserServices } from '../../services/userServices';
import { handleUpdateUserServices } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserEditForm = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [error, setError] = useState('');
	// image
	const [newLink, setNewLink] = useState('');

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		g;
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setUser(parsedUser);
			} catch (error) {
				console.error('Failed to parse user from localStorage:', error);
			}
		}
	}, []);

	if (!user) {
		navigate('/');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const isValidURL = (url) => {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	};

	const handleAddImage = () => {
		if (!newLink || !isValidURL(newLink)) {
			setError('Vui lòng nhập một URL hợp lệ.');
			return;
		}

		setUser({
			...user,
			image: newLink,
		});
		setNewLink('');
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await handleUpdateUserServices(user);
			if (response.data.errCode === 0) {
				localStorage.setItem('user', JSON.stringify(user));
				toast.success('Cập nhật thành công.');
				navigate('/');
			} else if (response.data.errCode === 1) {
				toast.error('NGười dùng không tìm thấy');
			} else if (response.data.errCode === 3) {
				toast.error('Sai mật khẩu');
			} else {
				toast.error(`Lỗi khi cập nhật`);
			}
		} catch (error) {
			console.error('Error updating user:', error);
			toast.error('Không thể cập nhật thông tin.');
		}
	};

	return (
		<>
			<Header />
			{/* <UserViewTour /> */}
			<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
				<h2 className="text-2xl font-semibold text-center mb-6">Chỉnh sửa thông tin</h2>
				<div className="flex items-center justify-center mb-6">
					{user?.image && (
						<div className="relative">
							<img
								src={user?.image}
								alt="Hình ảnh người dùng"
								className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md"
							/>
						</div>
					)}
				</div>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={user?.email}
								onChange={handleChange}
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Full Name */}
						<div>
							<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
								Họ và tên
							</label>
							<input
								type="text"
								id="fullName"
								name="fullName"
								value={user?.fullName}
								onChange={handleChange}
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Gender */}
						<div>
							<label htmlFor="gender" className="block text-sm font-medium text-gray-700">
								Giới tính
							</label>
							<select
								id="gender"
								name="gender"
								value={user?.gender}
								onChange={handleChange}
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Chọn giới tính</option>
								<option value="Nam">Nam</option>
								<option value="Nữ">Nữ</option>
								<option value="Khác">Khác</option>
							</select>
						</div>

						{/* Phone Number */}
						<div>
							<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
								Số điện thoại
							</label>
							<input
								type="text"
								id="phoneNumber"
								name="phoneNumber"
								value={user?.phoneNumber}
								onChange={handleChange}
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Add Image */}
						<div className="md:col-span-2">
							<label htmlFor="file_input" className="block text-sm font-medium text-gray-700">
								Thêm ảnh (URL)
							</label>
							<div className="flex items-center gap-3 mt-1">
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
									id="file_input"
									type="text"
									placeholder="Nhập URL ảnh"
									value={newLink}
									onChange={(e) => setNewLink(e.target.value)}
								/>
								<button
									type="button"
									onClick={handleAddImage}
									className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Thêm
								</button>
							</div>
							{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
						</div>
					</div>

					{/* Buttons */}
					<div className="flex justify-center gap-6">
						<button
							type="submit"
							className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Lưu
						</button>
						<button
							type="button"
							className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
							onClick={() => navigate('/')}
						>
							Hủy
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default UserEditForm;
