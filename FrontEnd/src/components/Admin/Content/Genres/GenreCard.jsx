import React from "react";
import PropTypes from "prop-types";
import GenreForm from "./GenreForm";

class GenreCard extends React.Component {
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
		const { genre } = this.props;
		const { name } = genre;
		return <div className="card-header">{name}</div>;
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
					this.props.removeGenre();
				}}
			>
				Remove
			</button>
		);
	}

	renderBody() {
		const { genre } = this.props;
		const { description } = genre;
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
				<GenreForm
					genre={this.props.genre}
					onSave={() => {
						this.setState({ edit: false });
						this.props.onEditSuccess();
					}}
				/>
			);
		}

		const { genre, invalid } = this.props;
		const { id } = genre;
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

GenreCard.propTypes = {
	genre: PropTypes.objectOf(PropTypes.any).isRequired,
	invalid: PropTypes.string,
	removeGenre: PropTypes.func.isRequired,
	dismissError: PropTypes.func.isRequired,
	onEditSuccess: PropTypes.func.isRequired,
};

export default GenreCard;
