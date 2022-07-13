import React, { Component } from "react";

export class ProductCard extends Component {
	render() {
		const { product, currency } = this.props;
		const [currentPrice] = product.prices.filter(
			(p) => p.currency.label === currency
		);
		return (
			<div className="product-card">
				<div className="product-main-image">
					<img className="product-img" src={product.gallery[0]} alt="" />
				</div>
				<div>{product.name}</div>
				<div>
					{currentPrice.currency.symbol}
					{currentPrice.amount}
				</div>
			</div>
		);
	}
}

export default ProductCard;
