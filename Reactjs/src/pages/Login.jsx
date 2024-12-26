import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { handleLoginServices } from '../services/userServices';
import SideImg from '../assets/img/background-login3.jpg';
import { toast } from 'react-toastify';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [formData, setFormData] = useState({ email: '', password: '' });
	const [errMessage, setErrMessage] = useState('');

	useEffect(() => {
		if (location.state) {
			setFormData({
				email: location.state.email || '',
				password: location.state.password || '',
			});
		}
	}, [location]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const getErrorMessage = (errCode) => {
		const messages = {
			1: 'Không tìm thấy người dùng!',
			2: 'Sai mật khẩu',
			3: 'Vui lòng nhập đầy đủ thông tin đăng nhập!',
		};
		return messages[errCode] || 'Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại!';
	};

	const handleLogin = async () => {
		const { email, password } = formData;

		if (!email || !password) {
			setErrMessage(getErrorMessage(3));
			return;
		}

		try {
			const res = await handleLoginServices({ email: email, password });
			const data = res?.data;

			if (data?.errCode === 0) {
				const user = data?.user;
				localStorage.setItem('user', JSON.stringify(user));
				toast.success('Đăng nhập thành công!');
				if (user?.role === 'Admin') {
					// navigate('/admin/manage-tours');
					navigate('/admin/statistics');
				} else if (user?.role === 'Khách') {
					navigate('/user/user-info');
				} else {
					navigate('/');
				}
			} else {
				setErrMessage(getErrorMessage(data?.errCode));
			}
		} catch {
			setErrMessage('Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại!');
		}
	};

	return (
		<div className="w-full h-screen flex items-start">
			{/* Bên trái hình ảnh */}
			<div className="relative hidden md:w-1/2 md:flex h-full">
				<img src={SideImg} alt="Background" className="w-full h-full object-cover" />
				<div className="absolute top-5 left-0 right-0 flex justify-center">
					<h1 className="text-[30px] text-amber-900 font-extrabold">Let's Go Trekking With Us</h1>
				</div>
			</div>

			{/* Bên phải form */}
			<div className="relative w-full md:w-1/2 h-full flex flex-col p-20 bg-white">
				<h1 className="text-[32px] uppercase font-bold text-lime-700 text-center">
					Q&T<span className="text-green-500">Trekking</span>
				</h1>

				{/* Form Login */}
				<div className="mt-8">
					<h3 className="text-3xl font-semibold mb-4">Đăng Nhập</h3>
					<p className="text-sm mb-4">Vui lòng điền thông tin đăng nhập của bạn.</p>
					<div className="space-y-4">
						<input
							type="text"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
							className="w-full py-3 border-b border-black outline-none bg-transparent"
						/>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Password"
							className="w-full py-3 border-b border-black outline-none bg-transparent"
						/>
					</div>

					{errMessage && <p className="text-red-500 text-sm mt-2">{errMessage}</p>}

					<div className="flex items-center justify-between mt-4">
						<label className="flex items-center">
							<input type="checkbox" className="w-4 h-4 mr-2" />
							<span className="text-sm">Lưu đăng nhập</span>
						</label>
						<p className="text-sm font-medium underline cursor-pointer">Quên mật khẩu</p>
					</div>

					{/* Nút hành động */}
					<div className="space-y-4 mt-8">
						<button
							onClick={handleLogin}
							className="w-full py-4 bg-amber-900 text-white font-semibold rounded-md hover:bg-amber-700 transition"
						>
							Đăng Nhập
						</button>
						<button
							onClick={() => navigate('/register')}
							className="w-full py-4 bg-lime-900 text-white font-semibold rounded-md hover:bg-lime-700 transition"
						>
							Đăng Ký
						</button>
					</div>

					<div className="w-full flex justify-center mt-4">
						<p className="text-sm">
							Bạn chưa có tài khoản?{' '}
							<span
								onClick={() => navigate('/register')}
								className="font-semibold underline cursor-pointer"
							>
								Đăng Ký Tại Đây
							</span>
						</p>
					</div>
					<div className="w-full flex justify-center mt-4">
						<Link to="/" className="font-bold underline">
							Quay Lại
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
