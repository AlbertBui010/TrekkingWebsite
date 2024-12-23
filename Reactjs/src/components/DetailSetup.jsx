import React from 'react';
import { FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailSetup = ({ price }) => {
	const navigate = useNavigate();
	const { slug, tourId } = useParams();

	const handleBooking = () => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			navigate(`/payment/${slug}/${tourId}`);
		} else {
			toast.info('Vui lòng đăng nhập trước khi dăng ký tour!');
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		}
	};

	return (
		<div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-[100px] mb-[300px]">
			{/* Phần Cấu trúc chi phí */}
			<div className="md:col-span-2">
				<h2 className="text-4xl font-bold mb-4">CẤU TRÚC CHI PHÍ</h2>
				<div className="mb-6">
					<h3 className="text-2xl font-semibold mb-2">Chi phí bao gồm:</h3>
					<ul className="space-y-8 grid grid-cols-2">
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Vé xe khứ hồi
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Bảo hiểm du lịch tối đa 100 triệu
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Các bữa ăn trong chuyến đi
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Trang thiết bị cắm trại
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Vé xe khứ hồi
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Bảo hiểm du lịch tối đa 100 triệu
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Chai nước 1,5 lít
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Gậy leo núi
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Nước phục vụ nhu cầu vệ sinh cơ bản
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Tourprice chuyên nghiệp (Tourprice tiếng Anh nếu có yêu cầu)
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Trang thiết bị y tế tiêu chuẩn
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Áo mưa
						</li>
						<li className="flex items-center">
							<FaCheck className="text-green-500 mr-2" />
							Giá tour trọn gói xuất phát từ TP.HCM không phát sinh thêm chi phí
						</li>
					</ul>
				</div>

				<div className="mb-6">
					<h3 className="text-2xl font-semibold mb-4">Chi phí không bao gồm:</h3>
					<ul className="space-y-8">
						<li className="flex items-center">
							<FaTimes className="text-red-500 mr-2" />
							Nước uống
						</li>
						<li className="flex items-center">
							<FaTimes className="text-red-500 mr-2" />
							Các chi phí cá nhân ngoài chương trình
						</li>
						<li className="flex items-center">
							<FaTimes className="text-red-500 mr-2" />
							Vé máy bay
						</li>
					</ul>
				</div>

				{/* Hành lý chuẩn bị */}
				<div className="mb-6">
					<h3 className="text-2xl font-semibold mb-2">Hành lý chuẩn bị:</h3>
					<ul className="space-y-8 grid grid-cols-2">
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							QUẦN ÁO: Mỏng nhẹ, dễ khô, thấm hút tốt
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							GIÀY: Chọn giày có độ bám tốt, cổ chân chắc
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							ĐỒ CHỐNG NẮNG: Mũ, áo khoác, kính râm
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							THUỐC CÁ NHÂN: Viên bù nước, điện giải, xịt chống côn trùng{' '}
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							TẤT: Chọn loại dày, nên có ít nhất 2 đôi để dự phòng{' '}
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							CMND/CCCD{' '}
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							BALO: Có đai trợ lực, gọn nhẹ
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							ÁO KHOÁC GIỮ NHIỆT TỐT
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							ĐỒ DÙNG CÁ NHÂN VÀ CÁC THIẾT BỊ ĐIỆN TỬ CẦN THIẾT
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							ĐỒ ĂN NHẸ: Lương khô, chocolate, bánh kẹo
						</li>
						<li className="flex items-center">
							<FaPlus className="text-amber-800 mr-2" />
							DÉP: Dùng khi sinh hoạt tại bãi trại
						</li>
					</ul>
				</div>

				{/* Lưu ý */}
				<div>
					<h3 className="text-2xl font-semibold mb-2">Lưu ý:</h3>
					<p className="text-gray-600">
						Bắt đầu từ tháng 4/2024, bên cạnh giấy chứng nhận, mỗi hành khách đăng ký tham gia sẽ nhận thêm
						một thẻ chứng nhận.
					</p>
				</div>
			</div>

			{/* Phần giá */}
			<div className="sticky top-4 h-fit bg-gray-100 p-4 shadow-md rounded-lg">
				<div className="flex flex-col">
					<h3 className="text-3xl font-bold">GIÁ TỪ:</h3>
					<p className="text-3xl font-bold text-lime-800 flex items-center justify-end">{price} VNĐ</p>
					<p className="text-xl  flex items-end justify-end text-lime-800">/Khách</p>
				</div>

				<div className="mb-4">
					<h4 className="text-lg font-semibold">ƯU ĐÃI:</h4>
					<ul className="list-disc list-inside space-y-8">
						<li>Đăng ký trước 45 ngày: Giảm 10%</li>
						<li>Đăng ký trước 30 ngày: Giảm 7%</li>
						<li>Nhóm từ 5 khách: Giảm 5%</li>
						<li>Nhóm từ 8 thành viên: Giảm 7% /người</li>
						<li>Nhóm từ 5 thành viên: Giảm 5% /người</li>
						<li>Nhóm từ 5 khách: Nhóm từ 3 thành viên: Giảm 100k /người</li>
					</ul>
				</div>
				<p className="text-sm text-gray-500 mb-4">* Không áp dụng đồng thời các ưu đãi.</p>
				<button
					onClick={() => handleBooking()}
					className="p-8 bg-lime-700 text-white py-4 rounded hover:bg-green-900 transition float-right text-lg uppercase"
				>
					Đăng ký
				</button>
			</div>
		</div>
	);
};

export default DetailSetup;
