import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ user }) => {
	return (
		<>
			<Header user={user} />
			<Outlet context={{ user }} />
			<Footer />
		</>
	);
};

export default MainLayout;
