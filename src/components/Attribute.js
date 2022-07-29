import React, { Component } from "react";

export class Attribute extends Component {
	render() {
		const { attribute, item } = this.props;
		return attribute.type === "swatch" ? (
			<>
				<input
					type="radio"
					name={attribute.name}
					id={`${attribute.name}-${item.displayValue}`}
					value={item.value}
					onClick={(e) => console.log(e.target.value)}
				/>
				<label
					htmlFor={`${attribute.name}-${item.displayValue}`}
					className="attribute-type-swatch"
					style={{ backgroundColor: `${item.value}` }}
				></label>
			</>
		) : (
			<>
				<input
					type="radio"
					name={attribute.name}
					id={`${attribute.name}-${item.displayValue}`}
					value={item.value}
					onClick={(e) => console.log(e.target.value)}
				/>
				<label
					htmlFor={`${attribute.name}-${item.displayValue}`}
					className="attribute-type-text"
				>
					{item.value}
				</label>
			</>
		);
	}
}

export default Attribute;
