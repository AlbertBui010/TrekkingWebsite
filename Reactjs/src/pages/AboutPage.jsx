import React from 'react';
import SildeAbout from '../components/SildeAbout';
import AboutVideo from '../components/AboutVideo';
import AboutOverView from '../components/AboutOverView';
import AboutEnviroment from '../components/AboutEnviroment';
import AboutTeam from '../components/AboutTeam';

const AboutPage = () => {
	return (
		<div>
			<SildeAbout />
			<AboutVideo />
			<AboutOverView />
			<AboutEnviroment />
			<AboutTeam />
		</div>
	);
};

export default AboutPage;
