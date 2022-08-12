import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import arrowup from "../img/arrow-up.svg";
import arrowdown from "../img/arrow-down.svg";
import { connect } from "react-redux";
import { activeCurrencySet, currencyListToggled } from "../store/app";
import { pricesUpdated } from "../store/cart";

const LOAD_CURRENCIES = gql`
	query GetAllCurrencies {
		currencies {
			label
			symbol
		}
	}
`;

export class CurrencySwitcher extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		document.addEventListener("click", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleClickOutside);
	}

	handleClickOutside = (e) => {
		if (
			this.props.isOpen &&
			this.ref.current &&
			!this.ref.current.contains(e.target)
		) {
			this.props.toggleCurrencyList();
		}
	};

	handleCurrencyChange = (currency) => {
		this.props.toggleCurrencyList();
		this.props.onCurrencyChange(currency);
		this.props.updatePrices(currency);
	};

	render() {
		return (
			<div className="currency-switcher-container" ref={this.ref}>
				<span
					className="currency-switcher"
					onClick={this.props.toggleCurrencyList}
				>
					{this.props.currency.symbol} &nbsp; &nbsp;
					<img
						src={this.props.isOpen ? arrowup : arrowdown}
						alt={this.props.isOpen ? "close list icon" : "open list icon"}
					/>
				</span>
				<Query query={LOAD_CURRENCIES}>
					{({ loading, error, data }) => {
						if (loading) return <span>loading...</span>;
						if (error) return <span>Something went wrong :(</span>;
						return (
							this.props.isOpen && (
								<ul className="currency-list">
									{data.currencies.map((c) => (
										<li
											className="list-item"
											value={c.label}
											key={c.label}
											onClick={() => this.handleCurrencyChange(c)}
										>
											{c.symbol} {c.label}
										</li>
									))}
								</ul>
							)
						);
					}}
				</Query>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.app.activeCurrency,
	isOpen: state.app.isCurrencyListOpen,
});

const mapDispatchToProps = (dispatch) => ({
	onCurrencyChange: (currency) => dispatch(activeCurrencySet(currency)),
	updatePrices: (currency) => dispatch(pricesUpdated(currency)),
	toggleCurrencyList: () => dispatch(currencyListToggled()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
