import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MiniCartItem from "../components/MiniCartItem";
import { minicartToggled } from "../store/app";

export class MiniCart extends Component {
	render() {
		const { itemsCount, totalPrice, currency, products, toggleMinicart } =
			this.props;
		return (
			<div className="minicart-bg">
				<div className="minicart-content">
					<p style={{ marginBottom: "32px" }}>
						<strong>My Bag</strong>, {itemsCount} items
					</p>
					<div className="minicart-items-container">
						{Object.entries(products).map(([key, value]) => {
							return (
								value[0] && (
									<div key={key}>
										<MiniCartItem
											item={value[0]}
											id={key}
											itemsCount={value.length}
										/>
									</div>
								)
							);
						})}
					</div>
					<div className="minicart-price">
						<p className="price-title">Total:</p>
						<p className="price-amount">
							{currency.symbol}
							{totalPrice.toFixed(2)}
						</p>
					</div>
					<div className="minicart-buttons">
						<Link to="/cart" className="routing-link">
							<button
								className="viewbag-button"
								onClick={() => toggleMinicart()}
							>
								view bag
							</button>
						</Link>
						<button className="checkout-button">check out</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.app.activeCurrency,
	itemsCount: state.cart.totalItems,
	totalPrice: state.cart.totalPrice,
	products: state.cart.products,
});

const mapDispatchToProps = (dispatch) => ({
	toggleMinicart: () => dispatch(minicartToggled()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
