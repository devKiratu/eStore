import React, { Component } from "react";
import { connect } from "react-redux";

import ImageCarousel from "./ImageCarousel";

export class CartItem extends Component {
	render() {
		const { item, currency } = this.props;
		const [currentPrice] = item.prices.filter(
			(p) => p.currency.label === currency.label
		);
		return (
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
					{item.attributes.map((a, i) => (
						<div key={i}>
							<p className="pdp-attribute-name" key={a.name}>
								{a.name}:
							</p>
							<div>
								{a.items.map((i) =>
									a.type === "swatch" ? (
										<p
											className="attribute-type-swatch"
											style={{ backgroundColor: `${i.value}` }}
											key={i.displayValue}
										></p>
									) : (
										<p className="attribute-type-text" key={i.displayValue}>
											{i.value}
										</p>
									)
								)}
							</div>
						</div>
					))}
				</div>
				<div className="cart-item-right">
					<div className="buttons">
						<button className="cart-item-button">+</button>
						<p className="item-count">1</p>
						<button className="cart-item-button">-</button>
					</div>
					<ImageCarousel item={item} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.app.activeCurrency,
});

export default connect(mapStateToProps)(CartItem);
