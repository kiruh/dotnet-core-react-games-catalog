import React from "react";
import { withRouter } from "react-router-dom";

import { register } from "~/actions/controller";

class Register extends React.Component {
	static renderAcceptButton() {
		return (
			<button type="submit" className="btn btn-primary float-right">
				Register
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
			repeatPassword: "",
			firstName: "",
			lastName: "",
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
		const errors = this.getFormErrors();

		if (Object.keys(errors).length > 0) {
			this.setState({
				errors,
			});
			return;
		}
		this.tryToRegister();
	}

	getFormErrors() {
		const errors = {};
		const FIELD_REQUIRED_ERROR = "This field should not be empty";
		const PASS_MIN_LENGTH_ERROR =
			"Password should be at least 5 characters long.";
		const {
			email,
			password,
			repeatPassword,
			firstName,
			lastName,
		} = this.state;

		if (!email) errors.email = FIELD_REQUIRED_ERROR;
		if (!password) errors.password = FIELD_REQUIRED_ERROR;
		if (!repeatPassword) errors.repeatPassword = FIELD_REQUIRED_ERROR;
		if (!firstName) errors.firstName = FIELD_REQUIRED_ERROR;
		if (!lastName) errors.lastName = FIELD_REQUIRED_ERROR;

		if (!errors.password && password.length < 5) {
			errors.password = PASS_MIN_LENGTH_ERROR;
		}

		if (
			!errors.password &&
			!errors.repeatPassword &&
			password !== repeatPassword
		) {
			errors.repeatPassword = "Passwords do not match";
		}

		return errors;
	}

	async tryToRegister() {
		const { password, email, firstName, lastName } = this.state;
		try {
			await register({ firstName, lastName, email, password });
			if (!this.mounted) return;

			const { history } = this.props;
			history.push("/");
		} catch (error) {
			if (!this.mounted) return;

			this.setState({
				errors: {
					credentials: JSON.stringify(error.response.data),
				},
			});
		}
	}

	renderInput(field, caption, type = "text") {
		const invalid = this.state.errors[field];

		return (
			<div className="form-group">
				<label htmlFor={field}>{caption}</label>
				<input
					type={type}
					className={`form-control ${invalid ? "is-invalid" : ""}`}
					id={field}
					placeholder={caption}
					value={this.state[field]}
					onChange={event => {
						this.onInputChange(event.target.value, field);
					}}
				/>
				{invalid && <div className="invalid-feedback">{invalid}</div>}
			</div>
		);
	}

	renderError() {
		const { credentials } = this.state.errors;
		if (!credentials) return null;
		return (
			<div className="invalid-feedback" style={{ display: "block" }}>
				{credentials}
			</div>
		);
	}

	renderForm() {
		return (
			<form
				onSubmit={event => {
					event.preventDefault();
					this.onAcceptForm();
				}}
			>
				{this.renderInput("firstName", "Enter first name")}
				{this.renderInput("lastName", "Enter last name")}
				{this.renderInput("email", "Enter email", "email")}
				{this.renderInput("password", "Enter password", "password")}
				{this.renderInput(
					"repeatPassword",
					"Repeat password",
					"password",
				)}
				{this.renderError()}
				{Register.renderAcceptButton()}
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
						<div className="card-header">Register</div>
						<div className="card-body">{this.renderForm()}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Register);
