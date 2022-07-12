import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Hello from "./components/Hello";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000",
});
class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="App">
					<Hello />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
