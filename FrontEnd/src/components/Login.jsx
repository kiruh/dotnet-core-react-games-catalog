import React from "react";
import { withRouter } from "react-router-dom";

import { login } from "~/actions/controller";

class Login extends React.Component {
	static renderAcceptButton() {
		return (
			<button className="btn btn-primary float-right" type="submit">
				Login
			</button>
		);
	}

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
			await login({ email, password });
			if (!this.mounted) return;

			const { history } = this.props;
			history.push("/");
		} catch (error) {
			if (!this.mounted) return;

			this.setState({
				errors: {
					credentials: "Invalid credentials",
				},
			});
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

	renderError() {
		if (!this.state.errors.credentials) return null;
		return (
			<div className="invalid-feedback" style={{ display: "block" }}>
				Invalid credentials
			</div>
		);
	}

	renderForm() {
		return (
			<form
				onSubmit={e => {
					this.onAcceptForm();
					e.preventDefault();
				}}
			>
				{this.renderInput("email", "Enter email")}
				{this.renderInput("password", "Enter password")}
				{this.renderError()}
				{Login.renderAcceptButton()}
			</form>
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
						<div className="card-body">{this.renderForm()}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
