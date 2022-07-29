import React, { Component } from "react";
import { connect } from "react-redux";
import Attribute from "./Attribute";

import ImageCarousel from "./ImageCarousel";

export class CartItem extends Component {
	state = {
		itemsCount: 1,
	};

	handleDecrement = () => {
		this.setState({ itemsCount: this.state.itemsCount - 1 });
	};

	handleIncrement = () => {
		this.setState({ itemsCount: this.state.itemsCount + 1 });
	};

	render() {
		const { item, currency } = this.props;
		const [currentPrice] = item.prices.filter(
			(p) => p.currency.label === currency.label
		);
		return (
			this.state.itemsCount > 0 && (
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
										{attribute.items.map((item, index) => (
											<Attribute
												attribute={attribute}
												item={item}
												key={index}
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
									onClick={this.handleIncrement}
								>
									+
								</button>
								<p className="item-count">{this.state.itemsCount}</p>
								<button
									className="cart-item-button"
									onClick={this.handleDecrement}
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

export default connect(mapStateToProps)(CartItem);
