import React from "react";
import axios from "axios";

import GameForm from "~/components/GameComponents/GameForm";
import GameCard from "~/components/GameComponents/GameCard";
import Paginator from "~/components/Paginator";
import { getHeaders } from "~/utils";

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
			page: 1,
			totalPages: 1,
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.fetchGames();
	}

	componentDidUpdate() {
		this.fixPages();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async fixPages() {
		const { page, totalPages } = this.state;

		if (page > totalPages && this.mounted) {
			await this.setState({ page: totalPages });
			this.fetchGames();
		}
	}

	async fetchGames() {
		try {
			const { page } = this.state;
			const response = await axios.get(`/api/games/paginate/${page}`);
			const { games, totalPages } = response.data;
			if (this.mounted) {
				this.setState({ games, totalPages });
			}
		} catch (error) {
			if (this.mounted) {
				this.setState({ error: true });
			}
		}
	}

	async removeGame(id) {
		try {
			await axios.delete(`/api/games/${id}`, { headers: getHeaders() });
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

	renderPaginator() {
		const { page, totalPages } = this.state;
		if (page > totalPages) return null;

		return (
			<Paginator
				currentPage={page}
				totalPages={totalPages}
				onChange={async value => {
					await this.setState({ page: value });
					this.fetchGames();
				}}
			/>
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
				{this.renderPaginator()}
			</div>
		);
	}
}

export default Games;
