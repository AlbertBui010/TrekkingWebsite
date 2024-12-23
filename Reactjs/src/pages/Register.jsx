import React, { useState } from 'react';
import Side_Img from '../assets/img/background-login3.jpg';
import { data, useNavigate } from 'react-router-dom';
import { handleRegisterService } from '../services/userServices';

const Register = () => {
	const navigate = useNavigate();
	const [fullName, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setGender] = useState('');
	const [errMessage, setErrMessage] = useState('');

	const getErrorMessage = (errCode) => {
		switch (errCode) {
			case 0:
				return 'Đăng ký thành công';
			case 1:
				return 'Email đã tồn tại!';
			case 2:
				return 'Vui lòng điền đầy đủ thông tin đăng ký!';
			default:
				return 'Đã xảy ra lỗi khi đăng ký, vui lòng thử lại!';
		}
	};

	const validateFields = () => {
		if (!fullName || !email || !password || !phoneNumber || !gender) {
			setErrMessage('Vui lòng điền đầy đủ thông tin đăng ký!');
			return false;
		}
		return true;
	};

	const handleRegister = async () => {
		if (!validateFields()) {
			return;
		}

		try {
			let res = await handleRegisterService({
				fullName,
				email,
				phoneNumber,
				password,
				gender,
			});

			if (res) {
				let data = res?.data;
				const message = getErrorMessage(data.errCode);
				setErrMessage(message);

				if (data.errCode === 0) {
					navigate('/login', {
						state: {
							email,
							password,
						},
					});
				}
			} else {
				setErrMessage('Đã xảy ra lỗi khi đăng ký, vui lòng thử lại!');
			}
		} catch (e) {
			setErrMessage('Đã xảy ra lỗi từ phía máy chủ, vui lòng thử lại!');
		}
	};

	return (
		<div className="w-full h-screen flex items-start">
			{/* Cột hình ảnh */}
			<div className="relative hidden md:w-1/2 h-full md:flex flex-col">
				<div className="absolute top-5 left-0 right-0 flex justify-center">
					<h1 className="text-[30px] text-amber-900 font-extrabold z-10">Join Trekking With Us</h1>
				</div>
				<img src={Side_Img} alt="Side Background" className="w-full h-full object-cover" />
			</div>

			{/* Cột thông tin */}
			<div className="relative w-full md:w-1/2 h-full flex flex-col p-20 bg-white justify-between">
				<h1 className="text-[32px] uppercase font-bold text-lime-700 flex items-center justify-center">
					Q&T<span className="text-green-500">Trekking</span>
				</h1>

				<div className="w-full flex flex-col">
					<div className="w-full flex flex-col mb-2">
						<h3 className="text-3xl font-semibold mb-4">Đăng Ký</h3>
						<p className="text-sm mb-2">Vui lòng điền thông tin để tạo tài khoản.</p>
					</div>

					{/* Form */}
					<div className="w-full flex flex-col">
						<input
							type="text"
							placeholder="Họ và tên"
							name="fullName"
							value={fullName}
							onChange={(e) => setFullname(e.target.value)}
							className="w-full py-3 my-4 bg-transparent text-black border-b border-black outline-none focus:outline-none"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full py-3 my-4 bg-transparent text-black border-b border-black outline-none focus:outline-none"
						/>
						<input
							type="text"
							placeholder="Số điện thoại"
							name="phoneNumber"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							className="w-full py-3 my-4 bg-transparent text-black border-b border-black outline-none focus:outline-none"
						/>
						<input
							type="password"
							placeholder="Mật khẩu"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full py-3 my-4 bg-transparent text-black border-b border-black outline-none focus:outline-none"
						/>
						<select
							name="gender"
							defaultValue="Choose"
							onChange={(e) => setGender(e.target.value)}
							className="w-full py-3 my-4 bg-transparent text-black border-b border-black outline-none focus:outline-none"
						>
							<option value="Choose" disabled hidden>
								Chọn giới tính
							</option>
							<option value="Nam">Nam</option>
							<option value="Nữ">Nữ</option>
							<option value="Khác">Khác</option>
						</select>
					</div>

					{errMessage && <p className="text-sm text-red-500">{errMessage}</p>}

					<div className="w-full flex flex-col my-8">
						<button
							onClick={handleRegister}
							className="text-lg font-semibold w-full my-2 bg-amber-900 rounded-md p-5 text-center flex items-center justify-center text-white transition transform duration-300 hover:bg-amber-700"
						>
							Đăng Ký
						</button>
					</div>

					<div className="w-full flex items-center justify-center relative py-2 mt-3">
						<div className="w-full h-[1px] bg-black"></div>
						<p className="text-xl absolute text-black/80 bg-[white]">or</p>
					</div>
				</div>

				<div className="w-full flex items-center justify-center">
					<p className="text-sm font-normal text-[#060606]">
						Bạn đã có tài khoản?{' '}
						<a
							href="#"
							className="cursor-pointer font-semibold underline underline-offset-2 transition transform duration-300 hover:translate-x-2 hover:text-lime-800"
							onClick={() => navigate('/login')}
						>
							Đăng Nhập Tại Đây
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
