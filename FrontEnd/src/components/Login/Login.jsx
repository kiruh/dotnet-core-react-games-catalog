/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { TOKEN_STORAGE_KEY } from "~/constants";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			email: "",
			password: "",
			errors: {},
		};
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	onInputChange(value, field) {
		this.setState({
			errors: {},
			[field]: value,
		});
	}

	onAcceptForm() {
		const errors = {};
		if (!this.state.email) {
			errors.email = true;
		}
		if (!this.state.password) {
			errors.password = true;
		}
		if (errors.email || errors.password) {
			this.setState({
				errors,
			});
			return;
		}
		this.tryToLogin();
	}

	async tryToLogin() {
		const { password, email } = this.state;
		try {
			const response = await axios.post("/api/account/login/", {
				email,
				password,
			});
			const { token } = response.data;

			localStorage.setItem(TOKEN_STORAGE_KEY, token);
			if (this.mounted) {
				this.props.done();
			}
		} catch (error) {
			if (this.mounted) {
				this.setState({
					errors: {
						credentials: "Invalid credentials",
					},
				});
			}
		}
	}

	renderInput(field, caption) {
		const invalid = this.state.errors[field];

		return (
			<div className="form-group">
				<label htmlFor={field}>{caption}</label>
				<input
					type={field}
					className={`form-control ${invalid ? "is-invalid" : ""}`}
					id={field}
					placeholder={caption}
					value={this.state[field]}
					onChange={event => {
						this.onInputChange(event.target.value, field);
					}}
				/>
				{invalid && (
					<div className="invalid-feedback">
						This field shoud not be empty
					</div>
				)}
			</div>
		);
	}

	renderAcceptButton() {
		return (
			<button
				className="btn btn-primary float-right"
				onClick={() => {
					this.onAcceptForm();
				}}
			>
				Login
			</button>
		);
	}

	renderError() {
		if (!this.state.errors.credentials) return null;
		return (
			<div className="invalid-feedback" style={{ display: "block" }}>
				Invalid credentials
			</div>
		);
	}

	render() {
		const border =
			Object.keys(this.state.errors).length > 0
				? "border-danger"
				: "border-secondary";
		return (
			<div className="row">
				<div className="offset-md-4 col-md-4">
					<div className={`card ${border} mb-3`}>
						<div className="card-header">Login</div>
						<div className="card-body">
							{this.renderInput("email", "Enter email")}
							{this.renderInput("password", "Enter password")}
							{this.renderError()}
							{this.renderAcceptButton()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	done: PropTypes.func.isRequired,
};

export default Login;
