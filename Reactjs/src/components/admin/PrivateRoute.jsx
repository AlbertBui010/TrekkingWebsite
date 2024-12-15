import React from 'react';
import { Navigate } from 'react-router-dom';
import { customPath } from '../../Utils/constants';

const PrivateRoute = ({ isAdmin, children }) => {
	if (!isAdmin) {
		return <Navigate to={customPath.HOMEPAGE} replace />;
	}

	return children;
};

export default PrivateRoute;
