import React, { Component } from "react";
import {Route, Switch, Link } from "react-router-dom";

import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar , Nav } from 'react-bootstrap';

import ItemList from "./components/ItemList";
import Item from "./components/Item";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>
              React client
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to={"/items"}className="nav-link" >Items</Link>
            </Nav>
          </Container>
        </Navbar>
       
        <Container fluid className="p-4">
          <Switch>
              <Route exact path={["/", "/items"]} component={ItemList} />
              <Route exact path={["/", "/item/:id"]} component={Item} />
          </Switch>
        </Container>
      </div>
    );
  }
}
export default App;