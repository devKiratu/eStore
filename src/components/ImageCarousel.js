import React, { Component } from "react";
import lt from "../img/Vectorlt.svg";
import gt from "../img/Vectorgt.svg";

export class ImageCarousel extends Component {
	state = {
		gallery: [],
		length: 1,
		currentIndex: 0,
	};

	componentDidMount() {
		this.setState({
			gallery: [...this.state.gallery, this.props.item.gallery],
			length: this.props.item.gallery.length,
		});
	}

	handleForwardScroll = () => {
		if (this.state.currentIndex < this.state.length - 1) {
			this.setState({
				...this.state,
				currentIndex: this.state.currentIndex + 1,
			});
		} else {
			this.setState({ ...this.state, currentIndex: 0 });
		}
	};

	handleBackwardScroll = () => {
		if (this.state.currentIndex > 0) {
			this.setState({
				...this.state,
				currentIndex: this.state.currentIndex - 1,
			});
		} else {
			this.setState({ ...this.state, currentIndex: this.state.length - 1 });
		}
	};

	render() {
		const { item } = this.props;
		return (
			<div className="cart-item-images">
				<img
					src={item.gallery[this.state.currentIndex]}
					alt={`${item.name} pic`}
					className="cart-item-image"
				/>
				{this.state.length > 1 && (
					<div className="carousel-buttons">
						<span
							className="c-button-container"
							onClick={this.handleBackwardScroll}
						>
							<img src={lt} alt="lt" />
						</span>
						<span
							className="c-button-container"
							onClick={this.handleForwardScroll}
						>
							<img src={gt} alt="gt" />
						</span>
					</div>
				)}
			</div>
		);
	}
}

export default ImageCarousel;
