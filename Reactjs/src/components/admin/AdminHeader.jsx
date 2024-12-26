import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customPath } from '../../Utils/constants';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const AdminHeader = () => {
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		toast.success('Đăng xuất thành công!');
		navigate('/login');
	};
	return (
		<nav className="border-y-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				{/* Logo */}
				<Link to="/" className="text-[30px] uppercase font-bold text-lime-700">
					Q&T <span className="text-green-500">Trekking</span>
				</Link>

				{/* Navigation Menu */}
				<div className={`w-full md:block md:w-auto`} id="">
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<Link
								to="/admin/information"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Information
							</Link>
						</li>

						<li>
							<Link
								to="/admin/statistics"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Statistics
							</Link>
						</li>

						{/* Dropdown Menu */}
						<li className="relative">
							<Link
								to="/admin/manage-tours"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Tours
							</Link>
						</li>

						<li>
							<Link
								to="/admin/statistics"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Booking
							</Link>
						</li>
						<li>
							<Link
								to="/admin/manage-guides"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Guides
							</Link>
						</li>
						<li>
							<Link
								to="/admin/manage-outdoor-activity-type"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Activity
							</Link>
						</li>
						<li>
							<div
								onClick={handleLogout}
								to="/"
								className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Logout
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default AdminHeader;
