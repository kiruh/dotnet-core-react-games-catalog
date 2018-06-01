import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Menu from "./Menu";
import Content from "./Content";
import NotFoundPage from "../NotFoundPage";

class Admin extends React.Component {
	render() {
		const { fetchingUser, user } = this.props;

		if (fetchingUser) return null;

		if (!user) return <Redirect to="/login" push />;

		if (!user.isAdmin) {
			return <NotFoundPage />;
		}

		return (
			<div>
				<Menu />
				<div className="mt-4">
					<Content />
				</div>
			</div>
		);
	}
}

Admin.propTypes = {
	user: PropTypes.objectOf(PropTypes.any),
	fetchingUser: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.user,
	fetchingUser: state.fetchingUser,
});

export default connect(mapStateToProps)(Admin);
