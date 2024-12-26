import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { customPath } from '../../Utils/constants';
import { toast } from 'react-toastify';

const PrivateRoute = ({ isAdmin, isUser }) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (!user) {
		toast.error('Vui lòng đăng nhập trước khi truy cập trang này!');
		return <Navigate to={customPath.LOGIN} replace />;
	}

	if (isAdmin) {
		if (user.role !== 'Admin') {
			toast.error('Bạn không có quyền truy cập trang này!');
			return <Navigate to={customPath.HOMEPAGE} replace />;
		}
	}

	if (isUser) {
		if (user.role !== 'Khách') {
			toast.error('Bạn không có quyền truy cập trang này!');
			return <Navigate to={customPath.HOMEPAGE} replace />;
		}
	}

	return <Outlet />;
};

export default PrivateRoute;
