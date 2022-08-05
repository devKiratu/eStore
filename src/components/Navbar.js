import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CurrencySwitcher from "./CurrencySwitcher";
import { NavLink } from "react-router-dom";
import logo from "../img/a-logo.svg";
import cartIcon from "../img/empty-cart.svg";
import { connect } from "react-redux";
import { activeCategorySet, minicartToggled } from "../store/app";

const LOAD_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export class Navbar extends Component {
	render() {
		const { items, toggleMinicart, activeCategory } = this.props;
		return (
			<div className="navbar-container">
				<div className="navbar">
					<div className="nav-left">
						<Query query={LOAD_CATEGORIES}>
							{({ loading, error, data }) => {
								if (loading) return <span>fetching categories ...</span>;
								if (error) return <span>Oops! :(</span>;
								return data.categories.map((category, index) => (
									<NavLink
										to={"/"}
										className={`nav-item ${
											category.name === activeCategory && "current"
										}`}
										key={index}
										onClick={() => this.props.onCategoryChange(category.name)}
									>
										{category.name}
									</NavLink>
								));
							}}
						</Query>
					</div>
					<div className="nav-center">
						<img
							src={logo}
							alt={"logo"}
							style={{ width: "32px", height: "auto" }}
						/>
					</div>
					<div className="nav-right">
						<CurrencySwitcher />
						<img
							style={{ marginLeft: "22px", cursor: "pointer" }}
							src={cartIcon}
							alt={"cart icon"}
							onClick={() => toggleMinicart()}
						/>
						{items > 0 && <span className="cart-items-count">{items}</span>}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	items: state.cart.totalItems,
	activeCategory: state.app.activeCategory,
});

const mapDispatchToProps = (dispatch) => ({
	onCategoryChange: (name) => dispatch(activeCategorySet(name)),
	toggleMinicart: () => dispatch(minicartToggled()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
