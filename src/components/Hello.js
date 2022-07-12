import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const LOAD_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export class Hello extends Component {
	render() {
		return (
			<div>
				{
					<Query query={LOAD_CATEGORIES}>
						{({ loading, error, data }) => {
							if (loading) return <h1>loading ...</h1>;
							if (error) return <h1>something went wrong :(</h1>;
							console.log(data);
							return data.categories.map((e, i) => <p key={i}>{e.name}</p>);
						}}
					</Query>
				}
			</div>
		);
	}
}

export default Hello;
