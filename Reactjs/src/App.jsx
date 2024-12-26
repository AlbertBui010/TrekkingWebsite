import { Routes, Route, Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PaymentPage from './pages/PaymentPage';
import PrivateRoute from './components/admin/PrivateRoute';
import AdminLayout from './layouts/AdminLayout';
import { customPath } from './Utils/constants';
import CreateTour from './components/admin/tour/CreateTour';
import UserInfo from './components/user/UserInfo';
import AdminManageTours from './components/admin/tour/AdminManageTours';
import ManageBookings from './components/admin/booking/ManageBookings';
import ManageGuides from './components/admin/guide/ManageGuides';
import CreateGuide from './components/admin/guide/CreateGuide';
import DetailsPage from './pages/DetailsPage';
import ToastProvider from './Utils/ToastProvider';
import ManageOutdoorActivityType from './components/admin/outdoorActivityType/ManageOutdoorActivityType';
import TransferInfo from './components/user/TransferInfo';
import StatisticsPage from './components/admin/statistic/StatisticsPage';

function App() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [role, setRole] = useState(false); // user or admin
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			setUser(storedUser);
			storedUser.role === 'Admin' ? setIsAdmin(true) : setIsUser(true);
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<ToastProvider />
			<Routes>
				<Route element={<MainLayout user={user} />}>
					<Route path={customPath.REGISTER} element={<Register />} />
					<Route path={customPath.LOGIN} element={<Login />} />
					<Route path={customPath.HOMEPAGE} element={<HomePage />} />
					<Route path={customPath.ABOUT_PAGE} element={<AboutPage />} />
					<Route path={customPath.DETAIL_TOUR} element={<DetailsPage />} />
				</Route>

				<Route element={<PrivateRoute isUser={true} />}>
					<Route path={customPath.USER_INFO} element={<UserInfo />} />
					<Route path={customPath.PAYMENT_PAGE} element={<PaymentPage />} />
					<Route path="/payment/QR" element={<TransferInfo />} />
				</Route>

				<Route element={<PrivateRoute isAdmin={true} />}>
					<Route path="/admin/*" element={<AdminLayout />}>
						<Route path={customPath.CREATE_TOUR} element={<CreateTour />} />
						<Route path={customPath.ADMIN_MANAGE_TOURS} element={<AdminManageTours />} />
						<Route path="manage-bookings" element={<ManageBookings />} />
						<Route path="manage-guides" element={<ManageGuides />} />
						<Route path="create-guide" element={<CreateGuide />} />
						<Route path="manage-outdoor-activity-type" element={<ManageOutdoorActivityType />} />
						<Route path="statistics" element={<StatisticsPage />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
