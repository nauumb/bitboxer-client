import React, { Component } from "react";
import {Route, Switch ,Link } from "react-router-dom";

import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

import ItemList from "./components/ItemList";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
            <Link to={"/items"} className="nav-link">React client</Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link > <Link to={"/items"}className="nav-link">Items</Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
            <Route exact path={["/", "/items"]} component={ItemList} />
        </Switch>
      </div>
    );
  }
}
export default App;