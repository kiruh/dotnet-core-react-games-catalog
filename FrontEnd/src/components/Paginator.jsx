import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Paginator extends React.Component {
	getStartAndEnd() {
		const { currentPage, totalPages } = this.props;
		if (totalPages <= 10) {
			return {
				startPage: 1,
				endPage: totalPages,
			};
		}

		if (currentPage <= 6) {
			return {
				startPage: 1,
				endPage: 10,
			};
		}

		if (currentPage + 4 >= totalPages) {
			return {
				startPage: totalPages - 9,
				endPage: totalPages,
			};
		}

		return {
			startPage: currentPage - 5,
			endPage: currentPage + 4,
		};
	}

	getPages() {
		const { startPage, endPage } = this.getStartAndEnd();
		return _.range(startPage, endPage + 1);
	}

	getNumberClassName(page) {
		return `btn ${
			page === this.props.currentPage ? "btn-primary" : "btn-light"
		}`;
	}

	renderPages() {
		const pages = this.getPages();

		return pages.map((page, index) => (
			<button
				key={index}
				className={this.getNumberClassName(page)}
				onClick={() => this.props.onChange(page)}
			>
				{page}
			</button>
		));
	}

	renderFirstPage() {
		if (!this.props.showFirstAndLastButton) return null;
		const { currentPage } = this.props;

		return (
			<button
				className="btn btn-light"
				disabled={currentPage === 1}
				onClick={() => this.props.onChange(1)}
			>
				<i className="fa fa-angle-double-left" />
			</button>
		);
	}

	renderPreviousPage() {
		const { currentPage } = this.props;
		return (
			<button
				className="btn btn-light"
				disabled={currentPage === 1}
				onClick={() => this.props.onChange(currentPage - 1)}
			>
				<i className="fa fa-angle-left" />
			</button>
		);
	}

	renderNextPage() {
		const { totalPages, currentPage } = this.props;
		return (
			<button
				className="btn btn-light"
				disabled={currentPage === totalPages}
				onClick={() => this.props.onChange(currentPage + 1)}
			>
				<i className="fa fa-angle-right" />
			</button>
		);
	}

	renderLastPage() {
		if (!this.props.showFirstAndLastButton) return null;
		const { totalPages, currentPage } = this.props;

		return (
			<button
				className="btn btn-light"
				disabled={currentPage === totalPages}
				onClick={() => this.props.onChange(totalPages)}
			>
				<i className="fa fa-angle-double-right" />
			</button>
		);
	}

	render() {
		const { currentPage, totalPages } = this.props;

		if (currentPage < 1 || currentPage > totalPages) {
			console.error("Current page is out of range", ...this.props);
			return null;
		}

		if (totalPages === 1) return null;

		return (
			<div>
				<div className="mt-5">
					{this.renderFirstPage()}
					{this.renderPreviousPage()}
					{this.renderPages()}
					{this.renderNextPage()}
					{this.renderLastPage()}
				</div>
			</div>
		);
	}
}

Paginator.defaultProps = {
	currentPage: 1,
	showFirstAndLastButton: true,
};

Paginator.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	showFirstAndLastButton: PropTypes.bool.isRequired,
};

export default Paginator;
