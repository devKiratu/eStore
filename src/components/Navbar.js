import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CurrencySwitcher from "./CurrencySwitcher";
import { NavLink } from "react-router-dom";
import logo from "../img/a-logo.svg";
import cart from "../img/empty-cart.svg";

const LOAD_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export class Navbar extends Component {
	render() {
		return (
			<div>
				<div className="navbar">
					<div>
						<Query query={LOAD_CATEGORIES}>
							{({ loading, error, data }) => {
								if (loading) return <span>fetching categories ...</span>;
								if (error) return <span>Oops! :(</span>;
								return data.categories.map((category, index) => (
									<NavLink
										to={"/"}
										className={`nav-item`}
										key={index}
										onClick={() => this.props.onCategoryChange(category.name)}
									>
										{category.name}
									</NavLink>
								));
							}}
						</Query>
					</div>
					<div>
						<img
							src={logo}
							alt={"logo"}
							style={{ width: "32px", height: "auto" }}
						/>
						{/* <span className="nav-item">Logo</span> */}
					</div>
					<div>
						<CurrencySwitcher
							onCurrencyChange={this.props.onCurrencyChange}
							currency={this.props.currency}
						/>
						<img style={{ marginLeft: "22px" }} src={cart} alt={"cart icon"} />
						{/* <span className="nav-item">Cart</span> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
