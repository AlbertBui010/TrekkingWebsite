import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const MenuMobile = ({ toggleMobileMenu, menuMobileOpen }) => {
	const [openMenuIndex, setOpenMenuIndex] = useState(null);
	const [showSearch, setShowSearch] = useState(false);

	const toggleSearch = () => {
		setShowSearch(!showSearch);
	};

	const closeSearch = () => {
		setShowSearch(false);
	};
	return (
		<div
			className={`fixed top-0 right-0 z-10 h-full w-[64%] bg-white transform transition duration-300 ease-in-out ${
				menuMobileOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="text-[25px] text-lime-700 flex justify-end p-4" onClick={toggleMobileMenu}>
				<HiOutlineX />
			</div>
			<div className="">
				<Link
					to="/"
					className="flex items-center space-x-1 transform transition duration-300  hover:text-lime-600"
				>
					Home
				</Link>
				<Link
					to="/about"
					className="flex items-center space-x-1 transform transition duration-300  hover:text-lime-600"
				>
					About us
				</Link>
				<div className="flex items-center space-x-4 font-semibold text-black text-lg relative">
					<div
						className={`flex items-center transition-all duration-300 ${
							showSearch ? 'w-[250px]' : 'w-[40px]'
						}`}
					>
						<HiOutlineSearch
							className={`text-2xl cursor-pointer transform transition-all duration-300 ${
								showSearch ? 'text-lime-600' : 'text-black'
							}`}
							onClick={toggleSearch}
						/>
						{showSearch && (
							<div className="relative w-full">
								<input
									type="text"
									placeholder="Search..."
									className="ml-2 bg-transparent border-b border-white text-black focus:outline-none focus:border-lime-500 w-full transition-all duration-300"
								/>
								<HiOutlineX
									className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black text-xl cursor-pointer hover:text-lime-600"
									onClick={closeSearch}
								/>
							</div>
						)}
					</div>
				</div>
				<Link
					to="/login"
					className="flex items-center space-x-1 transform transition duration-300 hover:-translate-x-2 hover:text-lime-600"
				>
					Log In
				</Link>
			</div>
		</div>
	);
};

export default MenuMobile;
