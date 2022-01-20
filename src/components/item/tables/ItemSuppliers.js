import React, {useState, useEffect} from "react";
import {Table, Row, Col, Button, Modal, Form, Container} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import SupplierService from "../../../services/SupplierService";

const ItemSuppliersTable = (props) => {

const [allSuppliers, setAllSuppliers] = useState([]);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const retrieveSuppliers = () => {
SupplierService.getAllSuppliers()
.then(response => { setAllSuppliers(response.data); })
.catch(e => { console.log(e); });
};

useEffect(() => { retrieveSuppliers();}, []);

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
                    <span className="p-1">Associate suppliers</span>
                </Button>{" "}
                </Col>
            </Row>

            <Row>
                <Col>
                <Table responsive striped bordered hover variant="light" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.suppliers && props.suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.name}</td>
                            <td>{supplier.country}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Associate suppliers
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {allSuppliers.map((supplier, key) =>
                        <Form.Check key={key} label={supplier.name} name={supplier.name} type="checkbox"
                            checked={props.suppliers && props.suppliers.find(element=> element.id === supplier.id) &&
                            "checked"
                            }
                            id={supplier.id}
                            country={supplier.country}
                            onChange={props.handleSuppliersChange}
                            />
                            )}
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

export default ItemSuppliersTable;