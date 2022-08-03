import React, { Component } from "react";

export class Attribute extends Component {
	render() {
		const {
			attribute,
			item,
			selected,
			onAttributeChange,
			isReadOnly,
			typeSwatch,
			typeText,
		} = this.props;
		return attribute.type === "swatch" ? (
			<>
				<input
					type="radio"
					id={`${attribute.name}-${item.displayValue}`}
					value={item.value}
					checked={item.value === selected}
					onChange={() =>
						!isReadOnly && onAttributeChange({ [attribute.name]: item.value })
					}
				/>
				<label
					htmlFor={`${attribute.name}-${item.displayValue}`}
					className={typeSwatch}
					style={{ backgroundColor: `${item.value}` }}
				></label>
			</>
		) : (
			<>
				<input
					type="radio"
					id={`${attribute.name}-${item.displayValue}`}
					value={item.value}
					checked={item.value === selected}
					onChange={() =>
						!isReadOnly && onAttributeChange({ [attribute.name]: item.value })
					}
				/>
				<label
					htmlFor={`${attribute.name}-${item.displayValue}`}
					className={typeText}
				>
					{item.value}
				</label>
			</>
		);
	}
}

export default Attribute;
