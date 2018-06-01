import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter, NavLink } from "react-router-dom";

import { logout } from "~/actions/controller";

class Navbar extends React.Component {
	renderLoginLink() {
		if (this.props.user) return null;
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

	renderRegisterLink() {
		if (this.props.user) return null;
		return (
			<li className="nav-item">
				<NavLink
					exact
					to="/register"
					className="btn btn-link nav-link"
					activeClassName="active"
				>
					Register
				</NavLink>
			</li>
		);
	}

	renderLogoutLink() {
		if (!this.props.user) return null;
		return (
			<li className="nav-item">
				<button
					className="btn btn-link nav-link"
					onClick={() => {
						logout();
					}}
				>
					Logout
				</button>
			</li>
		);
	}

	renderAdminLink() {
		if (!this.props.user) return null;
		if (!this.props.user.isAdmin) return null;
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
		if (!this.props.user) return null;
		return (
			<li className="nav-item">
				<div className="nav-link text-white">
					Logged in as <strong>{this.props.user.fullName}</strong>
				</div>
			</li>
		);
	}

	renderContent() {
		if (this.props.fetchingUser) return null;
		return (
			<ul className="navbar-nav mr-auto">
				{this.renderUserName()}
				{this.renderLoginLink()}
				{this.renderRegisterLink()}
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
	user: PropTypes.objectOf(PropTypes.any),
	fetchingUser: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.user,
	fetchingUser: state.fetchingUser,
});

export default connect(mapStateToProps, null)(withRouter(Navbar));
