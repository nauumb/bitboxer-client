import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ItemService from "../../services/ItemService";

import {toast} from 'react-toastify';
import Toast from "../alerts/alert";
import 'react-toastify/dist/ReactToastify.css';

import { Container, Row, Col, Card, Form, FormControl, InputGroup, Button} from "react-bootstrap";

import ItemPriceReductionsTable from "../price-reductions/AssociatePriceReductions";
import ItemSuppliersTable from "../supplier/AssociateSuppliers";


const AddItem = () => {

    const [item, setItem] = useState({
        itemCode: undefined,
        description: '',
        price: undefined,
        status: undefined,
        suppliers: [],
        priceReductions: []
    });

    const [validated, setValidated] = useState(false);
    const history = useHistory();
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleSuppliersChange = (supplier) => {  
        item.suppliers.some(x => x.id === supplier.id) ? setItem(item => { return {...item, suppliers: item.suppliers.filter(x => x.id !== supplier.id)}}) :    
        setItem({...item, suppliers: [...item.suppliers, supplier]}); 
    }
    
    const handlePriceReductionsChange = (priceReduction) => {
        setItem({...item, priceReductions: [...item.priceReductions, priceReduction]})
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
    
        setValidated(true);
    
        ItemService.insertItem(item).then((response) => {
    
          toast.success('Item created', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          console.log(response);       
        })
        .catch((exception) => {
          console.log(exception);
        });
      };

    return(
        <Container className="p-5">
            <h2 className="mb-5">New item</h2>
            <Card bg="light" className="p-5">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Item code</Form.Label>
                        <Form.Control type="number" name="itemCode" value={item.itemCode} onChange={handleInputChange} required />
                    </Form.Group>
                    </Col>
        
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Item price</Form.Label>
                            <InputGroup hasValidation>
                            <FormControl type="number" min="0.01" step="any" value={item.price} name="price"
                                onChange={handleInputChange} />
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
                            <Form.Label>Item description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={item.description} onChange={handleInputChange}
                            required />
                            <Form.Control.Feedback type="invalid">
                            Please provide a valid description.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
    
                <ItemSuppliersTable handleSuppliersChange={handleSuppliersChange} suppliers={item.suppliers} />
                <ItemPriceReductionsTable  handlePriceReductionsChange={handlePriceReductionsChange} priceReductions={item.priceReductions} />
    
                <Row>
                    <Form.Group>
                        <Button variant="outline-success" type="submit">
                        Submit
                        </Button>
                        <Button variant="outline-danger" className="m-3" onClick={()=> history.goBack()}
                        >
                        Cancel
                        </Button>
                    </Form.Group>
                </Row>

            </Form>
            </Card>
            <Toast />
      </Container>
    );
}

export default AddItem;