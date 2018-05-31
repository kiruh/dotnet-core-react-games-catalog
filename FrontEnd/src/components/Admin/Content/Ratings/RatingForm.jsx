import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { getHeaders } from "~/utils";

class RatingForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState(props);
	}

	getInitialState() {
		const { rating } = this.props;
		return {
			value: rating ? rating.value : "",
			description: rating ? rating.description : "",
			error: null,
		};
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	onChangeInput(value, field) {
		this.setState({
			[field]: value,
			error: null,
		});
	}

	onSave() {
		if (!this.state.value || !this.state.description) {
			const error = "Please fill in all fields";
			this.setState({ error });
			return;
		}
		this.saveRating();
	}

	async saveRating() {
		const { rating } = this.props;
		try {
			const { value, description } = this.state;
			if (rating) {
				const { id } = rating;
				await axios.put(
					`/api/ratings/${id}`,
					{ value, description },
					{ headers: getHeaders() },
				);
			} else {
				await axios.post(
					"/api/ratings/",
					{ value, description },
					{ headers: getHeaders() },
				);
			}
			if (this.mounted) {
				await this.props.onSave();
				if (this.mounted) {
					this.setState({
						value: "",
						description: "",
						error: null,
					});
				}
			}
		} catch (error) {
			const errorMsg = JSON.stringify(error.response.data);
			if (this.mounted) {
				this.setState({ error: errorMsg });
			}
		}
	}

	renderValueInput() {
		return (
			<div className="form-group my-0">
				<input
					className="form-control bg-secondary text-white"
					placeholder="Title"
					value={this.state.value}
					onChange={event => {
						this.onChangeInput(event.target.value, "value");
					}}
					maxLength="100"
				/>
			</div>
		);
	}

	renderDescriptionInput() {
		return (
			<div className="form-group">
				<textarea
					className="form-control bg-light text-white"
					placeholder="Description"
					value={this.state.description}
					onChange={event => {
						this.onChangeInput(event.target.value, "description");
					}}
					rows="4"
					maxLength="400"
				/>
			</div>
		);
	}

	renderSaveButton() {
		return (
			<button
				className="btn btn-primary"
				onClick={() => {
					this.onSave();
				}}
			>
				Save
			</button>
		);
	}

	renderError() {
		const { error } = this.state;
		if (!error) return null;
		return <p className="card-text text-danger">{error}</p>;
	}

	render() {
		return (
			<div className="col-md-3">
				<div className={`text-white bg-light my-2`}>
					<div className="card-header">{this.renderValueInput()}</div>
					<div className="card-body">
						{this.renderDescriptionInput()}
						{this.renderError()}
						{this.renderSaveButton()}
					</div>
				</div>
			</div>
		);
	}
}

RatingForm.propTypes = {
	rating: PropTypes.objectOf(PropTypes.any),
	onSave: PropTypes.func.isRequired,
};

export default RatingForm;
