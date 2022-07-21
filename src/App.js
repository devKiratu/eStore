import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Categories from "./Pages/Categories";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductDescription from "./Pages/ProductDescription";

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

	setActiveCurrency = (currency) => {
		console.log("I was called with", currency);
		this.setState({ ...this.state, activeCurrency: currency });
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Navbar
						onCategoryChange={this.setActiveCategory}
						onCurrencyChange={this.setActiveCurrency}
						currency={this.state.activeCurrency}
						category={this.state.activeCategory}
					/>
					<div className="page-container">
						<Switch>
							<Route path="/products/:id">
								<ProductDescription
									id=":id"
									currency={this.state.activeCurrency}
								/>
							</Route>
							<Route path="/" exact>
								<Categories
									category={this.state.activeCategory}
									currency={this.state.activeCurrency}
								/>
							</Route>
						</Switch>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		);
	}
}

export default App;
