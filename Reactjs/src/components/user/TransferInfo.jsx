import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { handleUpdateBookingServices } from '../../services/userServices';
import { handleGetAllToursServices, handleUpdateTourServices } from '../../services/adminServices';
import { useNavigate } from 'react-router-dom';

const TransferInfo = ({ data }) => {
	const { id, userId, tourId, number_of_tickets, total_price } = data;
	const navigate = useNavigate();

	// ID transaction
	const transactionIdRef = useRef(new Date().getTime());
	const transactionId = transactionIdRef.current;

	const paidContent = `${userId}TOUR${tourId}${number_of_tickets}${transactionId}`;
	const paidPrice = total_price;

	const [paymentStatus, setPaymentStatus] = useState('pending');
	const [isChecking, setIsChecking] = useState(false);

	useEffect(() => {
		let interval;
		let timeout;

		// Kiểm tra thanh toán
		const checkPaid = async () => {
			setIsChecking(true);
			try {
				const res = await fetch(
					'https://script.google.com/macros/s/AKfycbwgKvQwhked9ECsa0vwJKjEeFO5Sp3wJU-bz6fe9jp26C90EnRzRwJT25opzjZPWlES/exec',
				);
				const responseData = await res.json();
				const lastPaid = responseData.data[responseData.data.length - 1];
				const lastPrice = lastPaid['Giá trị'];
				const lastContent = lastPaid['Mô tả'];

				console.log(paidContent);
				if (lastPrice >= paidPrice && lastContent.includes(paidContent)) {
					toast.success('Thanh toán thành công!');
					setPaymentStatus('success');
					handleUpdateStatusBooking();
				}
			} catch (e) {
				console.error('Lỗi khi kiểm tra thanh toán:', e);
				toast.error('Có lỗi xảy ra khi kiểm tra thanh toán!');
			} finally {
				setIsChecking(false);
			}
		};

		const handleUpdateStatusBooking = async () => {
			try {
				let res = await handleUpdateBookingServices({ ...data, status: 'confirm' });
				if (res?.data?.errCode === 0) {
					let resTour = await handleGetAllToursServices({ id: tourId, activationState: 'Show' });
					let tour = resTour?.data?.data;
					await handleUpdateTourServices({
						...tour,
						current_number_guest: tour.current_number_guest + number_of_tickets,
					});

					setTimeout(() => {
						navigate('/user/user-info');
					}, 3000);
				}
			} catch (e) {
				console.log(e);
			}
		};

		// Tạo interval kiểm tra trạng thái thanh toán
		if (paymentStatus === 'pending') {
			interval = setInterval(() => {
				checkPaid();
			}, 5000);

			// Tự động hủy sau 3 phút (180000ms)
			timeout = setTimeout(() => {
				setPaymentStatus('cancel');
				clearInterval(interval);
				toast.error('Thanh toán không thành công trong vòng 3 phút. Vui lòng thử lại.');
			}, 180000);
		}

		// Dọn dẹp interval và timeout
		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [paymentStatus, paidPrice, paidContent]);

	const BANK_INFO = {
		ACCOUNT_NAME: 'BUI QUANG QUY',
		BANK_ID: 'MB',
		ACCOUNT_NO: '0929812977',
	};

	const QR = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-qr_only.png?amount=${total_price}&addInfo=${paidContent}`;

	return (
		<div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
			<h2 className="text-xl font-bold text-center text-lime-700 mb-4">Thông Tin Chuyển Khoản</h2>

			<div className="flex justify-center mb-4 p-4">
				<img src={QR} alt="QR Code" />
			</div>

			<p className="text-sm text-gray-600 text-center mb-4">
				Vui lòng sử dụng nội dung chuyển khoản mặc định để chúng tôi xác nhận thanh toán nhanh chóng.
			</p>

			{paymentStatus === 'pending' && <p className="text-yellow-600 text-center">Đang kiểm tra thanh toán...</p>}
			{paymentStatus === 'success' && (
				<p className="text-green-600 text-center">Thanh toán thành công! Cảm ơn bạn.</p>
			)}
			{paymentStatus === 'cancel' && (
				<p className="text-red-600 text-center">Thanh toán không thành công. Vui lòng thử lại.</p>
			)}
			{isChecking && <p className="text-sm text-center text-gray-500">Đang kiểm tra dữ liệu...</p>}
		</div>
	);
};

export default TransferInfo;
