import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiOutlineX, HiMenu } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import NavigationShow from './NavigationShow';
import MenuMobile from './MenuMobile';
import { customPath } from '../Utils/constants';

const Header = ({ user }) => {
	const navigate = useNavigate();
	const [showCategory, setShowCategory] = useState(null);
	const [showSearch, setShowSearch] = useState(false);
	const [menuMobileOpen, setMenuMobileOpen] = useState(false);

	const handleMouseEnter = (category) => {
		setShowCategory(category);
	};

	const handleMouseLeave = () => {
		setShowCategory(null);
	};

	const toggleSearch = () => {
		setShowSearch(!showSearch);
	};

	const closeSearch = () => {
		setShowSearch(false);
	};

	const toggleMobileMenu = () => {
		setMenuMobileOpen(!menuMobileOpen);
	};

	const handleNavigation = () => {
		if (user) {
			if (user.role === 'Admin') {
				navigate('/admin/' + customPath.ADMIN_MANAGE_TOURS);
			} else if (user.role === 'Khách') {
				navigate('/' + customPath.USER_INFO);
			} else {
				navigate(customPath.HOMEPAGE);
			}
		} else {
			navigate(customPath.LOGIN);
		}
	};

	return (
		<div className="relative h-[100px] bg-green-950 w-full flex p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-[25px] lg:text-[30px] uppercase font-bold text-lime-700">
					Q&T <span className="text-green-500">Trekking</span>
				</Link>
				<nav className="hidden md:flex items-center space-x-12 font-semibold p-4 text-white text-lg">
					<a
						href="#"
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
						onMouseEnter={() => handleMouseEnter('Natural Walking')}
					>
						Natural Walking
					</a>
					<a
						href="#"
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
						onMouseEnter={() => handleMouseEnter('Mountain Hiking')}
					>
						Mountain Hiking
					</a>
					<a
						href="#"
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
						onMouseEnter={() => handleMouseEnter('Trekking')}
					>
						Trekking
					</a>
					<Link
						to="/"
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
					>
						Home
					</Link>
					<Link
						to="/about"
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
					>
						About us
					</Link>
				</nav>

				<div className="hidden md:flex items-center space-x-4 font-semibold text-white text-lg relative">
					{/* Icon tìm kiếm và form */}
					<div
						className={`flex items-center transition-all duration-300 ${
							showSearch ? 'w-[250px]' : 'w-[40px]'
						}`}
					>
						<HiOutlineSearch
							className={`text-2xl cursor-pointer transform transition-all duration-300 ${
								showSearch ? 'text-lime-600' : 'text-white'
							}`}
							onClick={toggleSearch}
						/>
						{showSearch && (
							<div className="relative w-full">
								<input
									type="text"
									placeholder="Search..."
									className="ml-2 bg-transparent border-b border-white text-white focus:outline-none focus:border-lime-500 w-full transition-all duration-300"
								/>
								<HiOutlineX
									className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-xl cursor-pointer hover:text-lime-600"
									onClick={closeSearch}
								/>
							</div>
						)}
					</div>
				</div>

				<div className="hidden md:flex items-center space-x-4 font-semibold text-white text-lg">
					<div
						className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600 cursor-pointer"
						onClick={handleNavigation}
					>
						{user?.fullName || 'Login'}
					</div>
				</div>
			</div>
			<div
				className="text-white justify-center items-center flex text-[30px] md:hidden"
				onClick={toggleMobileMenu}
			>
				<HiMenu />
			</div>
			<div className="">
				<MenuMobile toggleMobileMenu={toggleMobileMenu} menuMobileOpen={menuMobileOpen} />
			</div>

			{/* Hiển thị NavigationShow */}
			{showCategory && (
				<div
					onMouseEnter={() => setShowCategory(showCategory)}
					onMouseLeave={handleMouseLeave}
					className="absolute top-[10px] left-0 w-full z-10 cursor-pointer"
				>
					<NavigationShow categoryName={showCategory} />
				</div>
			)}
		</div>
	);
};

export default Header;
