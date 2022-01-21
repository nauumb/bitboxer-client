import React, { Component } from "react";
import {Route, Switch, Link } from "react-router-dom";

import "./App.css";

import Items from "./components/item/tables/Items";
import AddItem from "./components/item/AddItem";
import EditItem from "./components/item/EditItem";

import Suppliers from './components/supplier/tables/Suppliers'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar , Nav } from 'react-bootstrap';

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
              <Link to={"/suppliers"}className="nav-link" >Suppliers</Link>
            </Nav>
          </Container>
        </Navbar>
       
        <Container fluid className="p-4">
          <Switch>
              <Route exact path={["/", "/items"]} component={Items} />
              <Route exact path={["/edit/item/:id"]} component={EditItem} />
              <Route exact path={["/add/item/"]} component={AddItem} />
              <Route exact path={["/suppliers"]} component={Suppliers} />
          </Switch>
        </Container>
      </div>
    );
  }
}
export default App;