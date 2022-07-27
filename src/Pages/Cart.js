import React, { Component } from "react";
import { connect } from "react-redux";

export class Cart extends Component {
	render() {
		console.log(this.props.cart);
		return <div>Cart</div>;
	}
}

const mapStateToProps = (state) => ({ cart: state.cart });
export default connect(mapStateToProps)(Cart);
