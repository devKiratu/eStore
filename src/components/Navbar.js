import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import CurrencySwitcher from "./CurrencySwitcher";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/a-logo.svg";
import cartIcon from "../img/empty-cart.svg";
import { connect } from "react-redux";
import { activeCategorySet } from "../store/app";

const LOAD_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export class Navbar extends Component {
	render() {
		const { items } = this.props;
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
					</div>
					<div>
						<CurrencySwitcher />
						<Link to="/cart" className="routing-link">
							<img
								style={{ marginLeft: "22px" }}
								src={cartIcon}
								alt={"cart icon"}
							/>
							{items > 0 && <span className="cart-items-count">{items}</span>}
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	items: state.cart.totalItems,
});

const mapDispatchToProps = (dispatch) => ({
	onCategoryChange: (name) => dispatch(activeCategorySet(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
