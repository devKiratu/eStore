import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Hello from "./components/Hello";
import Categories from "./Pages/Categories";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000",
});
class App extends Component {
	state = {
		activeCategory: "all",
		activeCurrency: "USD",
	};

	setActiveCategory = (name) => {
		this.setState({ activeCategory: name });
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<div>
					<Navbar onClick={this.setActiveCategory} />
					<div className="page-container">
						<Categories
							category={this.state.activeCategory}
							currency={this.state.activeCurrency}
						/>
					</div>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
