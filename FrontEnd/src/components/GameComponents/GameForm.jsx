import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { getHeaders } from "~/utils";
import RatingSelect from "~/components/RatingSelect";
import GenreSelect from "~/components/GenreSelect";

class GameForm extends React.Component {
	static renderSaveButton() {
		return (
			<button type="submit" className="btn btn-primary">
				Save
			</button>
		);
	}

	constructor(props) {
		super(props);
		this.state = this.getInitialState(props);
	}

	getInitialState() {
		const { game } = this.props;
		return {
			name: game ? game.name : "",
			releaseYear: game ? game.releaseYear : "",
			company: game ? game.company : "",
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
		if (
			!this.state.name ||
			!this.state.releaseYear ||
			!this.state.company
		) {
			const error = "Please fill in all fields";
			this.setState({ error });
			return;
		}
		this.saveGame();
	}

	async saveGame() {
		const { game } = this.props;
		try {
			const {
				name,
				releaseYear,
				ratingId,
				genreId,
				company,
			} = this.state;
			if (game) {
				const { id } = game;
				await axios.put(
					`/api/games/${id}`,
					{ name, releaseYear, ratingId, genreId, company },
					{ headers: getHeaders() },
				);
			} else {
				await axios.post(
					"/api/games/",
					{ name, releaseYear, ratingId, genreId, company },
					{ headers: getHeaders() },
				);
			}
			if (this.mounted) {
				await this.props.onSave();

				if (this.mounted) {
					this.setState({
						name: "",
						releaseYear: "",
						company: "",
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

	renderCompanyInput() {
		return (
			<div className="form-group">
				<input
					className="form-control bg-secondary text-white"
					placeholder="Company"
					value={this.state.company}
					onChange={event => {
						this.onChangeInput(event.target.value, "company");
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

	renderCancelButton() {
		return (
			<button
				type="button"
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
				<form
					onSubmit={event => {
						event.preventDefault();
						this.onSave();
					}}
				>
					<div className="card-header">{this.renderValueInput()}</div>
					<div className="card-body">
						{this.renderDescriptionInput()}
						{this.renderCompanyInput()}
						{this.renderGenreSelect()}
						{this.renderRatingSelect()}
						{this.renderError()}
						{this.renderCancelButton()}
						{GameForm.renderSaveButton()}
					</div>
				</form>
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
