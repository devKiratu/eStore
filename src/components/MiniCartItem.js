import React, { Component } from "react";
import { connect } from "react-redux";
import {
	productCountDecremented,
	productCountIncremented,
} from "../store/cart";
import Attribute from "./Attribute";

export class MiniCartItem extends Component {
	render() {
		const { item, currency, itemsCount, id, handleIncrement, handleDecrement } =
			this.props;
		const [currentPrice] = item.prices.filter(
			(p) => p.currency.label === currency.label
		);
		return (
			<div className="minicart-item">
				<div className="item-details-container">
					<div className="item-details">
						<p className="minicart-brand-name">{item.brand}</p>
						<p className="minicart-product-name">{item.name}</p>
						<p className="minicart-price-details">
							{currentPrice.currency.symbol}
							{currentPrice.amount}
						</p>
						{item.attributes.map((attribute, index) => (
							<div key={index}>
								<p className="minicart-attribute-name" key={attribute.name}>
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
											typeSwatch={"minicart-type-swatch"}
											typeText={"minicart-type-text"}
										/>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="quantity-change-buttons">
						<button onClick={() => handleIncrement({ id, currency })}>+</button>
						<p>{itemsCount}</p>
						<button onClick={() => handleDecrement({ id, currency })}>-</button>
					</div>
				</div>
				<div className="minicart-image-container">
					<img
						className="minicart-item-image"
						src={item.gallery[0]}
						alt={`${item.name}-pic`}
					/>
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCartItem);
