/* eslint-env browser */
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, withRouter, NavLink } from "react-router-dom";

import { getHeaders, getToken } from "~/utils";
import { TOKEN_STORAGE_KEY } from "~/constants";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetching: true,
			user: null,
		};
		this.lastTokenChecked = getToken();
	}

	componentDidMount() {
		this.fetchUser();
	}

	componentDidUpdate() {
		if (this.lastTokenChecked !== getToken()) {
			this.lastTokenChecked = getToken();
			this.fetchUser();
		}
	}

	async fetchUser() {
		if (!getToken()) {
			this.setState({ user: null, fetching: false });
		}
		try {
			const response = await axios.get("/api/account/getuser", {
				headers: getHeaders(),
			});
			const user = response.data;
			this.setState({ user, fetching: false });
		} catch (error) {
			this.setState({ fetching: false });
		}
	}

	async logout() {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		this.lastTokenChecked = getToken();
		await this.fetchUser();
		this.props.onLogout();
	}

	renderLoginLink() {
		if (this.state.user) return null;
		return (
			<li className="nav-item">
				<NavLink
					exact
					to="/login"
					className="btn btn-link nav-link"
					activeClassName="active"
				>
					Login
				</NavLink>
			</li>
		);
	}

	renderLogoutLink() {
		if (!this.state.user) return null;
		return (
			<li className="nav-item">
				<button
					className="btn btn-link nav-link"
					onClick={() => {
						this.logout();
					}}
				>
					Logout
				</button>
			</li>
		);
	}

	renderAdminLink() {
		if (!this.state.user) return null;
		if (!this.state.user.isAdmin) return null;
		return (
			<li className="nav-item">
				<NavLink
					to="/admin"
					className="btn btn-link nav-link"
					activeClassName="active"
				>
					Admin
				</NavLink>
			</li>
		);
	}

	renderUserName() {
		if (!this.state.user) return null;
		return (
			<li className="nav-item">
				<div className="nav-link text-white">
					Logged in as <strong>{this.state.user.fullName}</strong>
				</div>
			</li>
		);
	}

	renderContent() {
		if (this.state.fetching) return null;
		return (
			<ul className="navbar-nav mr-auto">
				{this.renderUserName()}
				{this.renderLoginLink()}
				{this.renderLogoutLink()}
				{this.renderAdminLink()}
			</ul>
		);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<Link className="navbar-brand" to="/">
					Games
				</Link>
				<button
					className="navbar-toggler collapsed"
					type="button"
					data-toggle="collapse"
					data-target="#navbarColor03"
					aria-controls="navbarColor03"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="navbar-collapse collapse" id="navbarColor03">
					{this.renderContent()}
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	onLogout: PropTypes.func.isRequired,
};

export default withRouter(Navbar);
