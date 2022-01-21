import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemService from "../../services/ItemService";
import { currentDateToISO8601 } from "../../helpers/helpers";
import { Container, Row, Col, Card, Form, FormControl, InputGroup, Button} from "react-bootstrap";
import { BsFillCircleFill} from "react-icons/bs"
import {toast} from 'react-toastify';
import Toast from "../alerts/alert";
import 'react-toastify/dist/ReactToastify.css';
import ItemPriceReductionsTable from "../price-reductions/AssociatePriceReductions";
import ItemSuppliersTable from "../supplier/AssociateSuppliers";


const Item = () => {

  const params = useParams();
  const [item, setItem] = useState([]);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const retrieveItem = (id) => { 
    ItemService.getItemById(id)
      .then((response) => { setItem(response.data); console.log(response.data)})
      .catch((exception) => { console.log(exception);});
  };

  useEffect(() => { 
    retrieveItem(params.id);
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSuppliersChange = (suppliers) => {
    
    suppliers.forEach(function(supplier) {
      setItem({...item, suppliers: [...item.suppliers, supplier]});  
    });

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

    ItemService.updateItem(item).then((response) => {

        toast.success('Item updated', {
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

  return (
    <Container className="p-5">

      <h2 className="mb-5">Edit item</h2>
      <Card bg="light" className="p-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Row>
            <Col>
            <Form.Group className="mb-3">
              <Form.Label>Item code</Form.Label>
              <Form.Control disabled type="number" value={item.itemCode} required />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3">
              <Form.Label>Creation date</Form.Label>
              <Form.Control type="datetime-local" max={currentDateToISO8601()} value={item.createdDate} name="createdDate"
                onChange={handleInputChange} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>

          <Row>
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

            <Col>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <BsFillCircleFill className="m-2" color={item.status ? "green" : "red" } />
                <strong className={item.status ? "text-success" : "text-danger" }>
                  {item.status ? "Published" : "Discontinued"}
                </strong>
              </div>
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Item description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={item.description} onChange={handleInputChange}
                required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid description.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
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
};

export default Item;