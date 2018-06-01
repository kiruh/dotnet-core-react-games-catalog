import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { getHeaders } from "~/utils";
import RatingSelect from "~/components/RatingSelect";
import GenreSelect from "~/components/GenreSelect";

class GameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState(props);
	}

	getInitialState() {
		const { game } = this.props;
		return {
			name: game ? game.name : "",
			releaseYear: game ? game.releaseYear : "",
			ratingId: game ? game.ratingId : null,
			genreId: game ? game.genreId : null,
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
		if (!this.state.name || !this.state.releaseYear) {
			const error = "Please fill in all fields";
			this.setState({ error });
			return;
		}
		this.saveGame();
	}

	async saveGame() {
		const { game } = this.props;
		try {
			const { name, releaseYear, ratingId, genreId } = this.state;
			if (game) {
				const { id } = game;
				await axios.put(
					`/api/games/${id}`,
					{ name, releaseYear, ratingId, genreId },
					{ headers: getHeaders() },
				);
			} else {
				await axios.post(
					"/api/games/",
					{ name, releaseYear, ratingId, genreId },
					{ headers: getHeaders() },
				);
			}
			if (this.mounted) {
				await this.props.onSave();

				if (this.mounted) {
					this.setState({
						name: "",
						releaseYear: "",
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
					value={this.state.name}
					onChange={event => {
						this.onChangeInput(event.target.value, "name");
					}}
					maxLength="100"
				/>
			</div>
		);
	}

	renderDescriptionInput() {
		return (
			<div className="form-group">
				<input
					className="form-control bg-secondary text-white"
					placeholder="Release year"
					value={this.state.releaseYear}
					onChange={event => {
						this.onChangeInput(event.target.value, "releaseYear");
					}}
				/>
			</div>
		);
	}

	renderRatingSelect() {
		return (
			<RatingSelect
				value={this.state.ratingId}
				onChange={ratingId => this.onChangeInput(ratingId, "ratingId")}
			/>
		);
	}

	renderGenreSelect() {
		return (
			<GenreSelect
				value={this.state.genreId}
				onChange={genreId => this.onChangeInput(genreId, "genreId")}
			/>
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

	renderCancelButton() {
		return (
			<button
				className="btn btn-secondary mr-2"
				onClick={() => {
					this.props.onCancel();
				}}
			>
				Cancel
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
			<div className="card text-white bg-light my-2">
				<div className="card-header">{this.renderValueInput()}</div>
				<div className="card-body">
					{this.renderDescriptionInput()}
					{this.renderGenreSelect()}
					{this.renderRatingSelect()}
					{this.renderError()}
					{this.renderCancelButton()}
					{this.renderSaveButton()}
				</div>
			</div>
		);
	}
}

GameForm.propTypes = {
	game: PropTypes.objectOf(PropTypes.any),
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default GameForm;
