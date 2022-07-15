import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Hello from "./components/Hello";
import Categories from "./Pages/Categories";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
						<Routes>
							<Route
								path="/"
								element={
									<Categories
										category={this.state.activeCategory}
										currency={this.state.activeCurrency}
									/>
								}
							/>
						</Routes>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		);
	}
}

export default App;
