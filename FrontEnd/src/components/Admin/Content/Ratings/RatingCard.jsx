import React from "react";
import PropTypes from "prop-types";
import RatingForm from "./RatingForm";

class RatingCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return { edit: false };
	}

	renderError() {
		const { invalid } = this.props;
		if (!invalid) return null;
		return (
			<div className="alert alert-danger mt-4 mb-0">
				<button
					type="button"
					className="close"
					onClick={() => {
						this.props.dismissError();
					}}
				>
					&times;
				</button>
				{invalid}
			</div>
		);
	}

	renderHeader() {
		const { rating } = this.props;
		const { value } = rating;
		return <div className="card-header">{value}</div>;
	}

	renderEditButton() {
		return (
			<button
				type="button"
				className="btn btn-outline-primary mr-2"
				onClick={() => {
					this.setState({ edit: true });
					this.props.dismissError();
				}}
			>
				Edit
			</button>
		);
	}

	renderRemoveButton() {
		return (
			<button
				type="button"
				className="btn btn-outline-danger"
				onClick={() => {
					this.props.removeRating();
				}}
			>
				Remove
			</button>
		);
	}

	renderBody() {
		const { rating } = this.props;
		const { description } = rating;
		return (
			<div className="card-body">
				<p className="card-text scroll">{description}</p>
				{this.renderEditButton()}
				{this.renderRemoveButton()}
				{this.renderError()}
			</div>
		);
	}

	render() {
		if (this.state.edit) {
			return (
				<RatingForm
					rating={this.props.rating}
					onSave={() => {
						this.setState({ edit: false });
						this.props.onEditSuccess();
					}}
					onCancel={() => {
						this.setState({ edit: false });
					}}
				/>
			);
		}

		const { rating, invalid } = this.props;
		const { id } = rating;
		const border = invalid ? "border-danger" : "";

		return (
			<div key={id} className="col-md-3">
				<div className={`card my-2 ${border}`}>
					{this.renderHeader()}
					{this.renderBody()}
				</div>
			</div>
		);
	}
}

RatingCard.propTypes = {
	rating: PropTypes.objectOf(PropTypes.any).isRequired,
	invalid: PropTypes.string,
	removeRating: PropTypes.func.isRequired,
	dismissError: PropTypes.func.isRequired,
	onEditSuccess: PropTypes.func.isRequired,
};

export default RatingCard;
