import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import SupplierService from '../../../services/SupplierService';

const AssociateSupplierModal = (props) => {

    const [suppliers, setSuppliers] = useState([]);

    const retrieveSuppliers = () => {
        
    SupplierService.getAllSuppliers()
        .then(response => {
            setSuppliers(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        retrieveSuppliers();
    });

    const handleInputChange = index => event => {

        const {id} = event.target;

        let index = props.item.suppliers.findIndex((item) => item.id == id);

        if(index > -1) {
            props.item.suppliers.splice(index, 1);
        }
        else {
            index = suppliers.findIndex((item) => item.id == id);
            props.item.suppliers.push(suppliers[index]);
        }

    };
    
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Associate suppliers
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>
                    {suppliers.map((supplier, key) =>
                        <Form.Check
                            key={key}
                            label={supplier.name}
                            name={supplier.name}
                            type="checkbox"
                            checked= {props.item.suppliers && props.item.suppliers.find(element => element.id === supplier.id) &&
                                "checked"
                            }
                            id={supplier.id}
                            country={supplier.country}
                            onChange={handleInputChange(key)}
                        />
                    )}
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-success" onClick={props.onHide}>Submit</Button>
                <Button variant="outline-danger" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssociateSupplierModal;