// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { customPath } from '../../Utils/constants';

// const PrivateRoute = ({ isAdmin, children }) => {
// 	if (!isAdmin) {
// 		return <Navigate to={customPath.HOMEPAGE} replace />;
// 	}
// 	return children;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { customPath } from '../../Utils/constants';

const PrivateRoute = ({ isAdmin, isUser }) => {
	if (isAdmin !== undefined) {
		if (!isAdmin) {
			return <Navigate to={customPath.HOMEPAGE} replace />;
		}
	}

	if (isUser !== undefined) {
		if (!isUser) {
			return <Navigate to={customPath.HOMEPAGE} replace />;
		}
	}

	return <Outlet />;
};

export default PrivateRoute;
