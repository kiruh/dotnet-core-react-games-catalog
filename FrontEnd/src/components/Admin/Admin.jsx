/* eslint-env browser */
import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Menu from "./Menu";
import Content from "./Content";
import NotFoundPage from "../NotFoundPage";
import { getToken, getHeaders } from "~/utils";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			isAdmin: null,
		};
	}

	componentDidMount() {
		if (getToken()) {
			this.lastTokenChecked = getToken();
			this.checkPermissions();
		}
	}

	componentDidUpdate() {
		if (this.lastTokenChecked !== getToken()) {
			this.lastTokenChecked = getToken();
			this.checkPermissions();
		}
	}

	async checkPermissions() {
		try {
			await axios.get("/api/account/protected", {
				headers: getHeaders(),
			});
			this.setState({ isAdmin: true });
		} catch (error) {
			this.setState({ isAdmin: false });
		}
	}

	render() {
		if (!getToken()) return <Redirect to="/login" push />;

		if (this.state.isAdmin === null) {
			return null;
		}

		if (!this.state.isAdmin) {
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

export default Admin;
