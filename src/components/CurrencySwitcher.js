import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import arrowup from "../img/arrow-up.svg";
import arrowdown from "../img/arrow-down.svg";

const LOAD_CURRENCIES = gql`
	query GetAllCurrencies {
		currencies {
			label
			symbol
		}
	}
`;

export class CurrencySwitcher extends Component {
	state = {
		currency: {
			symbol: "$",
			label: "USD",
		},
		isOpen: false,
	};

	toggleCurrencyList = () => {
		this.setState({ ...this.state, isOpen: !this.state.isOpen });
	};

	handleCurrencyChange = (currency) => {
		this.setState({
			currency: { symbol: currency.symbol, label: currency.label },
			isOpen: !this.state.isOpen,
		});
		this.props.onCurrencyChange(currency.label);
	};
	render() {
		return (
			<>
				<span className="currency-switcher" onClick={this.toggleCurrencyList}>
					{this.state.currency.symbol} &nbsp; &nbsp;
					<img
						src={this.state.isOpen ? arrowup : arrowdown}
						alt={this.state.isOpen ? "close list icon" : "open list icon"}
					/>
				</span>
				<Query query={LOAD_CURRENCIES}>
					{({ loading, error, data }) => {
						if (loading) return <span>loading...</span>;
						if (error) return <span>Something went wrong :(</span>;
						return (
							this.state.isOpen && (
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
			</>
		);
	}
}

export default CurrencySwitcher;
