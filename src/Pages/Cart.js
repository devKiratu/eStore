import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";

export class Cart extends Component {
	render() {
		console.log(this.props.products);
		const { products, items, currency, totalPrice } = this.props;
		return (
			<>
				<p className="cart-title">Cart</p>
				<hr className="divider-line" />
				{items <= 0 && <p>Cart is empty</p>}
				{products.map((item, index) => {
					return (
						<div key={index}>
							<CartItem item={item} />
						</div>
					);
				})}
				{items > 0 && (
					<>
						<div className="sale-summary">
							<p>Tax 21%:</p>
							<p>
								<strong>
									{currency.symbol}
									{(0.21 * totalPrice).toFixed(2)}
								</strong>
							</p>
							<p>Quantity: </p>
							<p>
								<strong>{items}</strong>
							</p>
							<p>Total: </p>
							<p>
								<strong>
									{currency.symbol}
									{totalPrice.toFixed(2)}
								</strong>
							</p>
						</div>
						<button className="order-button">Order</button>
					</>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.cart.products,
	items: state.cart.totalItems,
	totalPrice: state.cart.totalPrice,
	currency: state.app.activeCurrency,
});
export default connect(mapStateToProps)(Cart);
