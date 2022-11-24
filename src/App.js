import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Categories from "./Pages/Categories";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductDescription from "./Pages/ProductDescription";
import Cart from "./Pages/Cart";
import { connect } from "react-redux";
import MiniCart from "./Pages/MiniCart";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://estore.onrender.com",
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navbar />
          {this.props.isMinicartOpen && <MiniCart />}
          <div className="page-container">
            <Switch>
              <Route path="/products/:id" component={ProductDescription} />
              <Route path={"/cart"} component={Cart} />
              <Route path="/" exact component={Categories} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isMinicartOpen: state.app.isMinicartOpen,
});

export default connect(mapStateToProps)(App);
