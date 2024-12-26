export const customPath = {
	REGISTER: '/register',
	LOGIN: '/login',
	HOMEPAGE: '/',
	ABOUT_PAGE: '/about',
	DETAIL_TOUR: '/tour/:slug/:tourId',
	PAYMENT_PAGE: '/payment/:slug/:index',
	ADMIN_MANAGE_TOURS: 'manage-tours',
	USER_INFO: 'user/user-info',
	CREATE_TOUR: 'create-tour',
};

export const adminMenu = [
	{ path: '/admin/dashboard', label: 'Dashboard' }, // Menu Item
	{ path: '/admin/users', label: 'Manage Users' },
	{ path: '/admin/reports', label: 'Reports' },
	{ path: '/admin/settings', label: 'Settings' },
];

export const guestMenu = [
	{ path: '/', label: 'Home' },
	{ path: '/about', label: 'About Us' },
	{ path: '/contact', label: 'Contact' },
	{ path: '/login', label: 'Login' },
];

export const activationState = [
	{ value: 'Show', label: 'Hiện' },
	{ value: 'Hide', label: 'Ẩn' },
];
