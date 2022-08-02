import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Categories from "./Pages/Categories";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductDescription from "./Pages/ProductDescription";
import Cart from "./Pages/Cart";
import { Provider } from "react-redux";
import store from "./store";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000",
});
class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Provider store={store}>
					<BrowserRouter>
						<Navbar />
						<div className="page-container">
							<Switch>
								<Route path="/products/:id" component={ProductDescription} />
								<Route path={"/cart"} component={Cart} />
								<Route path="/" exact component={Categories} />
							</Switch>
						</div>
					</BrowserRouter>
				</Provider>
			</ApolloProvider>
		);
	}
}

export default App;
