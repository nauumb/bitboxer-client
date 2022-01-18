import React, { useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";

import ItemDataService from "../services/ItemService";

import {Container, Row, Col, Table, Card, Form, FormControl, InputGroup ,Button, ToastContainer, Toast} from 'react-bootstrap';
import {BsFillCircleFill, BsPlusLg} from "react-icons/bs";

const Item = () => {

  const params = useParams();
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const retrieveItem = (id) => {

    ItemDataService.getItemById(id)

      .then(response => {
        setItem(response.data);
      })
      .catch(exception => {
        console.log(exception);
      });
  };

  useEffect(() => {
    retrieveItem(params.id);
  }, [params.id]);

  const handleInputChange = event => {
    
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });

  };
  
  const handleSubmit = (event) => {

    event.preventDefault();
    ItemDataService.updateItem(item)

      .then(response => {
        setShow(true);
        console.log(response);
      })
      .catch(exception => {
        console.log(exception);
      });
  };

    return ( 
      <Container className="p-5">

        <h2 class="mb-5">Edit item</h2>
        <Card bg="light" className="p-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Item code</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    value={item.itemCode}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Creation date</Form.Label>
                  <Form.Control value={item.createdDate} name="createdDate" onChange={handleInputChange}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Item price</Form.Label>
                  <InputGroup>
                      <FormControl value={item.price} name="price" onChange={handleInputChange}/>
                      <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <div><BsFillCircleFill color={item.status ? "green" : "red"}></BsFillCircleFill> <strong className={item.status ? "text-success" : "text-danger"}>{item.status ? "Published" : "Discontinued"}</strong></div>
              </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Item description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={item.description} onChange={handleInputChange}/>
            </Form.Group>

            <Row  className="mb-4">
              <Col className="d-flex align-items-end" sm={10}>
                <h5 >Suppliers</h5>
              </Col>
              <Col sm={2}>
                <Button className="d-flex align-items-center" size="sm"
                          variant="outline-success"><BsPlusLg  size=".6rem"/> <span className="p-1">Associate supplier</span></Button>{' '}
              </Col>
            </Row>
             
            <Table responsive striped bordered hover variant="light" size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
              {item.suppliers && item.suppliers.map((supplier, index) => ( 
                <tr>
                 <td>{supplier.name}</td>
                 <td>{supplier.country}</td>
                </tr>
              ))}
              </tbody>
            </Table>

            <Row  className="mb-4">
              <Col className="d-flex align-items-end" sm={10}>
                <h5 >Price reductions</h5>
              </Col>
              <Col sm={2}>
                <Button className="d-flex align-items-center" size="sm"
                          variant="outline-success"><BsPlusLg  size=".6rem"/> <span className="p-1">New price reduction</span></Button>{' '}
              </Col>

            </Row>
            <Table responsive striped bordered hover variant="light" size="sm">
              <thead>
                <tr>
                  <th>Reduced price</th>
                  <th>Start date</th>
                  <th>End date</th>
                </tr>
              </thead>
              <tbody>
              {item.priceReductions && item.priceReductions.map((priceReduction, index) => ( 
                <tr>
                  <td>{priceReduction.reducedPrice}</td>
                  <td>{priceReduction.startDate}</td>
                  <td>{priceReduction.endDate}</td>
                </tr>
              ))}
              </tbody>
            </Table>

            <Form.Group>
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>

              <Button variant="outline-dark" className="m-3" onClick={() => history.goBack()}>
                Cancel
              </Button>
              
            </Form.Group>
          </Form>
        </Card>
        <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Success</strong>
              <small>Now</small>
            </Toast.Header>
          <Toast.Body className="bg-light">Item updated</Toast.Body>
        </Toast>
        </ToastContainer>
      </Container>
    );
};

export default Item;