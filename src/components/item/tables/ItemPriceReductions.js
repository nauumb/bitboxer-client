import { set } from "lodash";
import React, {useState} from "react";
import {Table, Row, Col, Modal, Form, Button, Container, InputGroup, FormControl} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";

const ItemPriceReductionsTable = ({handlePriceReductionsChange, priceReductions}) => {

    const [priceReduction, setPriceReduction] = useState({
        reducedPrice: 1,
        startDate: null, 
        endDate: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPriceReduction({ ...priceReduction, [name]: value });
    };
   
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        handlePriceReductionsChange(priceReduction);
        setShow(false);
    }

    return (
        <Container>
            <Row className="mb-4">
                <Col className="d-flex align-items-end" sm={10}>
                <h5>Suppliers</h5>
                </Col>

                <Col sm={2}>
                <Button className="d-flex align-items-center" size="sm" variant="outline-primary" onClick={()=>
                    handleShow(true)}
                    >
                    <BsPlusLg size=".6rem" />{" "}
                    <span className="p-1">Add price reduction</span>
                </Button>{" "}
                </Col>

            </Row>

            <Row>
                <Col>
                <Table responsive striped bordered hover variant="light" size="sm">
                    <thead>
                        <tr>
                            <th>Reduced price</th>
                            <th>Start date</th>
                            <th>End date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceReductions && priceReductions.map((priceReduction, index) => (
                        <tr key={index}>
                            <td>{priceReduction.reducedPrice}</td>
                            <td>{priceReduction.startDate}</td>
                            <td>{priceReduction.endDate}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Associate suppliers
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Reduced price</Form.Label>
                                    <InputGroup hasValidation>
                                        <FormControl onChange={handleInputChange} type="number" min="0.01" step="any" value={priceReduction.reducedPrice} name="reducedPrice" />
                                        <InputGroup.Text>€</InputGroup.Text>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid price.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Start date</Form.Label>
                                    <Form.Control onChange={handleInputChange} type="datetime-local" value={priceReduction.startDate} name="startDate" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid date.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>End date</Form.Label>
                                    <Form.Control onChange={handleInputChange} type="datetime-local" value={priceReduction.endDate} name="endDate" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid date.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleClose}>Save</Button>
                    <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ItemPriceReductionsTable;