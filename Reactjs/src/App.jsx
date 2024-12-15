import { Routes, Route } from 'react-router-dom';
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
import PaymentForm from './components/PaymentForm';

function App() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			setUser(storedUser);
			if (storedUser.role === 'Admin') {
				setIsAdmin(true);
			}
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			{/* Main Routes */}
			<Route element={<MainLayout user={user} />}>
				<Route path={customPath.REGISTER} element={<Register />} />
				<Route path={customPath.LOGIN} element={<Login />} />
				<Route path={customPath.HOMEPAGE} element={<HomePage />} />
				<Route path={customPath.ABOUT_PAGE} element={<AboutPage />} />
				<Route path={customPath.DETAIL_TOUR} element={<DetailsPage />} />
			</Route>

			<Route path={customPath.USER_INFO} element={<UserInfo />} />
			<Route path={customPath.PAYMENT_PAGE} element={<PaymentPage />} />

			{/* Admin Routes */}
			<Route
				path="/admin/*"
				element={
					<PrivateRoute isAdmin={isAdmin}>
						<AdminLayout />
					</PrivateRoute>
				}
			>
				{/* Các route con của admin */}
				<Route path={customPath.CREATE_TOUR} element={<CreateTour />} />
				<Route path={customPath.ADMIN_MANAGE_TOURS} element={<AdminManageTours />} />

				<Route path="manage-bookings" element={<ManageBookings />} />

				<Route path="manage-guides" element={<ManageGuides />} />
				<Route path="create-guide" element={<CreateGuide />} />
			</Route>
		</Routes>
	);
}

export default App;
