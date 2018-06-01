import React from "react";
import axios from "axios";

// import GameForm from "./GameForm";
import GameCard from "./GameCard";
import GameForm from "./GameForm";

class Games extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			error: false,
			errors: {},
			createGame: false,
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.fetchGames();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async fetchGames() {
		try {
			const response = await axios.get("/api/games/");
			const games = response.data;
			if (this.mounted) {
				this.setState({ games });
			}
		} catch (error) {
			if (this.mounted) {
				this.setState({ error: true });
			}
		}
	}

	async removeGame(id) {
		try {
			await axios.delete(`/api/games/${id}`);
			this.fetchGames();
		} catch (error) {
			const errors = { [id]: error.response.data.exception };
			if (this.mounted) {
				this.setState({ errors });
			}
		}
	}

	dismissError(id) {
		const errors = { ...this.state.errors, [id]: null };
		this.setState({ errors });
	}

	renderGames() {
		return this.state.games.map(game => {
			const { id } = game;
			const invalid = this.state.errors[id];

			return (
				<GameCard
					key={id}
					game={game}
					invalid={invalid}
					removeGame={() => this.removeGame(id)}
					dismissError={() => this.dismissError(id)}
					onEditSuccess={() => {
						this.fetchGames();
					}}
				/>
			);
		});
	}

	renderGameForm() {
		return (
			<GameForm
				onSave={async () => {
					await this.fetchGames();
					await this.setState({ createGame: false });
				}}
				onCancel={() => {
					this.setState({ createGame: false });
				}}
			/>
		);
	}

	renderNewGameButton() {
		return (
			<button
				type="button"
				className="btn btn-link mb-3"
				onClick={() => {
					this.setState({ createGame: true });
				}}
			>
				New Game
			</button>
		);
	}

	render() {
		if (this.state.error) {
			return (
				<div className="alert alert-danger">
					500 - Internal Server Error
				</div>
			);
		}

		if (!this.state.games) return null;

		if (this.state.createGame) return this.renderGameForm();

		return (
			<div>
				{this.renderNewGameButton()}
				<div className="row">{this.renderGames()}</div>
				<ReactPaginate
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={<a href="">...</a>}
					breakClassName={"break-me"}
					pageCount={this.state.pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.handlePageClick}
					containerClassName={"pagination"}
					subContainerClassName={"pages pagination"}
					activeClassName={"active"}
				/>
			</div>
		);
	}
}

export default Games;
