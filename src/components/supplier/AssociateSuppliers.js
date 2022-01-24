import React, {useState, useEffect} from "react";
import {Table, Row, Col, Button, Modal, Form, Container} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import SupplierService from "../../services/SupplierService";
import ItemSupplier from "./tables/ItemSupplier";

const ItemSuppliersTable = ({handleSuppliersChange, suppliers}) => {

    const [allSuppliers, setAllSuppliers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const retrieveSuppliers = () => {
        SupplierService.getAllSuppliers()
            .then(response => { setAllSuppliers(response.data); })
            .catch(e => { console.log(e); });
    };

    const handleChange = (event) => {
        const supplier = allSuppliers.find(element=> element.id === parseInt(event.target.id));
        handleSuppliersChange(supplier)
    }

    useEffect(() => { 
        retrieveSuppliers();
    }, []);

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
                    <ItemSupplier suppliers={suppliers}></ItemSupplier>
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
                            <Form.Check 
                                key={key} 
                                id={supplier.id}
                                name={supplier.name} 
                                country={supplier.country}
                                label={supplier.name} 
                                type="checkbox"
                                onChange={handleChange}
                                defaultChecked={suppliers && suppliers.find(element => element.id === supplier.id) &&
                                    "checked"
                                }
                            />
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ItemSuppliersTable;