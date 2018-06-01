import React from "react";
import PropTypes from "prop-types";
import GameForm from "./GameForm";

class GameCard extends React.Component {
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
		const { game, disabledControls } = this.props;
		const { name } = game;

		const bg = disabledControls ? "bg-dark" : "";

		return <div className={`card-header ${bg}`}>{name}</div>;
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
					this.props.removeGame();
				}}
			>
				Remove
			</button>
		);
	}

	renderControls() {
		if (this.props.disabledControls) return null;
		return (
			<div className="mt-4">
				{this.renderEditButton()}
				{this.renderRemoveButton()}
				{this.renderError()}
			</div>
		);
	}

	renderBody() {
		return (
			<div className="card-body">
				{this.renderDate()}
				{this.renderControls()}
			</div>
		);
	}

	renderGenre() {
		const { game } = this.props;
		const { genre } = game;
		if (!genre) return null;
		return <li className="list-group-item">{genre.name}</li>;
	}

	renderRating() {
		const { game } = this.props;
		const { rating } = game;
		if (!rating) return null;
		return <li className="list-group-item">{rating.value}</li>;
	}

	renderDate() {
		const { game } = this.props;
		const { releaseYear } = game;

		return <h6 className="card-subtitle text-muted">{releaseYear}</h6>;
	}

	renderMeta() {
		return (
			<ul className="list-group list-group-flush">
				{this.renderGenre()}
				{this.renderRating()}
			</ul>
		);
	}

	render() {
		if (this.state.edit) {
			return (
				<div className="col-md-3">
					<GameForm
						game={this.props.game}
						onSave={() => {
							this.props.onEditSuccess();
							this.setState({ edit: false });
						}}
						onCancel={() => {
							this.setState({ edit: false });
						}}
					/>
				</div>
			);
		}

		const { game, invalid } = this.props;
		const { id } = game;
		const border = invalid ? "border-danger" : "";

		return (
			<div key={id} className="col-md-3">
				<div className={`card my-2 ${border}`}>
					{this.renderHeader()}
					{this.renderMeta()}
					{this.renderBody()}
				</div>
			</div>
		);
	}
}

GameCard.propTypes = {
	game: PropTypes.objectOf(PropTypes.any).isRequired,
	invalid: PropTypes.string,
	removeGame: PropTypes.func,
	dismissError: PropTypes.func,
	onEditSuccess: PropTypes.func,
	disabledControls: PropTypes.bool,
};

export default GameCard;
