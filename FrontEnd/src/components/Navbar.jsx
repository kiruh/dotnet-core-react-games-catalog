/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logout } from "~/actions/controller";

class Navbar extends React.Component {
	getLinkLiClass(route) {
		return `nav-item ${
			this.props.location.pathname.startsWith(route) ? "active" : ""
		}`;
	}

	renderLoginLink() {
		if (this.props.user) return null;
		return (
			<li className={this.getLinkLiClass("/login")}>
				<Link to="/login" className="nav-link">
					Login
				</Link>
			</li>
		);
	}

	renderRegisterLink() {
		if (this.props.user) return null;
		return (
			<li className={this.getLinkLiClass("/register")}>
				<Link to="/register" className="nav-link">
					Register
				</Link>
			</li>
		);
	}

	renderLogoutLink() {
		if (!this.props.user) return null;
		return (
			<li className="nav-item">
				<a
					className="nav-link"
					onClick={() => {
						logout();
					}}
				>
					Logout
				</a>
			</li>
		);
	}

	renderAdminLink() {
		if (!this.props.user) return null;
		if (!this.props.user.isAdmin) return null;
		return (
			<li className={this.getLinkLiClass("/admin")}>
				<Link to="/admin" className="nav-link">
					Admin
				</Link>
			</li>
		);
	}

	renderUserName() {
		if (!this.props.user) return null;
		return (
			<li className="nav-item">
				<a className="nav-link">
					<strong>{this.props.user.fullName}</strong>
				</a>
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
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="navbar-collapse collapse" id="navbar">
					{this.renderContent()}
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	user: PropTypes.objectOf(PropTypes.any),
	fetchingUser: PropTypes.bool,
	location: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	user: state.user,
	fetchingUser: state.fetchingUser,
});

export default withRouter(connect(mapStateToProps, null)(Navbar));
