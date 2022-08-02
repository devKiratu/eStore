import React, { Component } from "react";
import { connect } from "react-redux";
import Attribute from "./Attribute";
import ImageCarousel from "./ImageCarousel";
import {
	productCountIncremented,
	productCountDecremented,
} from "../store/cart";

export class CartItem extends Component {
	render() {
		const { item, currency, itemsCount, id, handleIncrement, handleDecrement } =
			this.props;
		const [currentPrice] = item.prices.filter(
			(p) => p.currency.label === currency.label
		);
		return (
			itemsCount > 0 && (
				<>
					<div className="cart-item">
						<div className="cart-item-description">
							<p className="brand-name">{item.brand}</p>
							<p className="pdp-product-name" style={{ paddingBottom: "10px" }}>
								{item.name}
							</p>
							<p className="pdp-price-details">
								{currentPrice.currency.symbol}
								{currentPrice.amount}
							</p>
							{item.attributes.map((attribute, index) => (
								<div key={index}>
									<p className="pdp-attribute-name" key={attribute.name}>
										{attribute.name}:
									</p>
									<div>
										{attribute.items.map((val, index) => (
											<Attribute
												attribute={attribute}
												item={val}
												key={index}
												isReadOnly={true}
												selected={item.selectedAttributes[attribute.name]}
											/>
										))}
									</div>
								</div>
							))}
						</div>
						<div className="cart-item-right">
							<div className="buttons">
								<button
									className="cart-item-button"
									onClick={() => handleIncrement({ id, currency })}
								>
									+
								</button>
								<p className="item-count">{itemsCount}</p>
								<button
									className="cart-item-button"
									onClick={() => handleDecrement({ id, currency })}
								>
									-
								</button>
							</div>
							<ImageCarousel item={item} />
						</div>
					</div>
					<hr className="divider-line" />
				</>
			)
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.app.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
	handleIncrement: (updateObj) => dispatch(productCountIncremented(updateObj)),
	handleDecrement: (updateObj) => dispatch(productCountDecremented(updateObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
