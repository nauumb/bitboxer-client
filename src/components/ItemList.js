import React, { useState, useEffect } from "react";

import ItemDataService from "../services/ItemService";
import ItemLine from "../components/ItemLine";

import { Table, Button, Container, Row, Col} from 'react-bootstrap';
import {BsPlusLg} from "react-icons/bs";

const ItemList = () => {

  const [items, setItems] = useState([]);

  const retrieveItems = () => {
    ItemDataService.getAllItems()
      .then(response => {
        setItems(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveItems();
  }, [items]);

  return (
    <div>
          <Container fluid className="mb-3">
              <Row>
                <Col sm={8}><h2 >Item list.</h2></Col>
                <Col sm={4} className="d-flex justify-content-end" >
                  <Button className="d-flex align-items-center" 
                          variant="outline-success"><BsPlusLg  size="1rem"/> <span className="p-1">New Item</span></Button>{' '}
                </Col>
              </Row>
            </Container>        
            <Table responsive striped bordered hover variant="light">
                <thead>
                    <tr>
                      <th>Item code</th>
                      <th>Price</th>
                      <th>State</th>
                      <th>Creation date</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, index) => ( 
                       <ItemLine key={item.id} data={item} />
                    ))}
                </tbody>
            </Table>
    </div>
  );
};

export default ItemList;