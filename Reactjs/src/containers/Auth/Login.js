import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
	constructor(props) {
		super(props);
		this.btnLogin = React.createRef();
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handlerKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handlerKeyDown);
		this.setState = (state, callback) => {
			return;
		};
	}

	render() {
		return (
			<>
				<div>Hello</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
		adminLoginFail: () => dispatch(actions.adminLoginFail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
