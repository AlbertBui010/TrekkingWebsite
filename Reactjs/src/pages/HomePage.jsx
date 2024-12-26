import React from 'react';
import Introduce from '../components/introduce';
import SignatureTour from '../components/SignatureTour';
import BeConquerors from '../components/BeConquerors';
import HomeHero from '../components/HomeHero';
import SaveContainer from '../components/SaveContainer';
import ExpertGuide from '../components/ExpertGuide';
import Policy from '../components/Policy';

const HomePage = () => {
	return (
		<div>
			<HomeHero />
			<Introduce />
			<BeConquerors />
			<SignatureTour />
			<Policy />
			<ExpertGuide />
			<SaveContainer />
		</div>
	);
};

export default HomePage;
