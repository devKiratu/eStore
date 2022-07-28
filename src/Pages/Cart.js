import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";

export class Cart extends Component {
	render() {
		console.log(this.props.products);
		const { products, items } = this.props;
		return (
			<>
				<p className="cart-title">Cart</p>
				<hr className="divider-line" />
				{items <= 0 && <p>Cart is empty</p>}
				{products.map((item, index) => {
					return (
						<div key={index}>
							<CartItem item={item} />
							<hr className="divider-line" />
						</div>
					);
				})}
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.cart.products,
	items: state.cart.totalItems,
	currency: state.app.activeCurrency,
});
export default connect(mapStateToProps)(Cart);
