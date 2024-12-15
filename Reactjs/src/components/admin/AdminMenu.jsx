import React from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = ({ menuItems }) => {
	return (
		<nav className="admin-menu">
			<ul>
				{menuItems.map((item) => (
					<li key={item.path}>
						<Link to={item.path}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default AdminMenu;
