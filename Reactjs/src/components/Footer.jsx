import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import footerimg from '/img/footer-mobile.png';

export const Footer = () => {
	return (
		<div className="bg-dark-green md:bg-transparent md:h-[1000px] md:bg-footer-bg md:bg-cover md:bg-bottom flex items-end mt-[100px] relative py-16">
			<img src={footerimg} alt="" className="absolute top-[-20px] w-[100%] md:hidden" />
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white mb-12">
				<div>
					<h3 className="text-[30px] font-bold mb-2 flex justify-center ">Thông tin công ty</h3>
					<p className="mb-2 flex justify-center ">
						<FaEnvelope className="mr-2" />
						Email: dh52100604@student.stu.edu.vn
					</p>
					<p className="mb-2 flex justify-center">
						<FaPhoneAlt className="mr-2" />
						Hotline: 0906834103
					</p>
					<p className="mb-2 flex justify-center">
						<FaMapMarkerAlt className="mr-2" />
						Địa chỉ: Cao Lỗ, Quận 8, TP. Hồ Chí Minh
					</p>
				</div>

				<div>
					<h1 className="text-[30px] uppercase font-bold text-lime-700 flex justify-center">
						Q&T<span className="text-green-500">Trekking</span>
					</h1>
					<p className="text-center">
						Q&T Travel luôn đồng hành cùng bạn trong những chuyến đi đáng nhớ, mang lại những trải nghiệm
						không thể quên.
					</p>
				</div>

				<div>
					<h1 className="text-[30px] font-bold mb-4 flex justify-center ">Các tour nổi bật</h1>
					<ul>
						<li className="mb-2 flex justify-center">
							<a href="#" className="hover:underline">
								Tour Đà Lạt - Thành phố ngàn hoa
							</a>
						</li>
						<li className="mb-2 flex justify-center">
							<a href="#" className="hover:underline">
								Tour Phú Quốc - Thiên đường nhiệt đới
							</a>
						</li>
						<li className="mb-2 flex justify-center">
							<a href="#" className="hover:underline">
								Tour Sapa - Vẻ đẹp Tây Bắc
							</a>
						</li>
						<li className="mb-2 flex justify-center">
							<a href="#" className="hover:underline">
								Tour Hạ Long - Kỳ quan thiên nhiên
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-[30px] font-bold mb-4 flex justify-center">Theo dõi chúng tôi </h3>
					<ul className="flex space-x-4 flex justify-center">
						<li>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-500"
							>
								<FaFacebook className="w-6 h-6" />
							</a>
						</li>
						<li>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-pink-500"
							>
								<FaInstagram className="w-6 h-6" />
							</a>
						</li>
						<li>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-400"
							>
								<FaTwitter className="w-6 h-6" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
