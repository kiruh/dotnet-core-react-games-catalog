/* eslint-env browser */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Login from "../Login";
import Menu from "./Menu";
import Content from "./Content";
import NotFoundPage from "../NotFoundPage";
import Spinner from "../Spinner";
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
		this.checkPermissions();
	}

	componentDidUpdate() {
		this.checkPermissions();
	}

	checkPermissions() {
		if (getToken() && this.state.isAdmin === null) {
			try {
				axios.get("/api/account/protected", { headers: getHeaders() });
				this.setState({ isAdmin: true });
			} catch (error) {
				this.setState({ isAdmin: false });
			}
		}
	}

	renderLoginView() {
		return (
			<Login
				done={() => {
					this.forceUpdate();
				}}
			/>
		);
	}

	render() {
		if (!getToken()) return this.renderLoginView();

		if (this.state.isAdmin === null) {
			return <Spinner />;
		}

		if (!this.state.isAdmin) {
			return <NotFoundPage />;
		}

		return (
			<div>
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item active">Admin</li>
				</ol>
				<Menu />
				<div className="mt-4">
					<Content />
				</div>
			</div>
		);
	}
}

export default Admin;
