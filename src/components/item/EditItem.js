import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemService from "../../services/ItemService";
import { currentDateToISO8601 } from "../../helpers/helpers";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  InputGroup,
  Button
} from "react-bootstrap";
import { BsFillCircleFill, BsPlusLg } from "react-icons/bs"
import {toast} from 'react-toastify';
import Toast from "../alerts/alert";
import 'react-toastify/dist/ReactToastify.css';
import ItemPriceReductionsTable from "./tables/ItemPriceReductions";
import ItemSuppliersTable from "./tables/ItemSuppliers";
import AssociateSupplierModal from "./modals/AssociateSupplierModal";


const Item = () => {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const [modalAssociateSupplier, setShowModalAssociateSupplier] = React.useState(false);

  const retrieveItem = (id) => {
    ItemService.getItemById(id)
      .then((response) => {
        console.log(response.data)
        setItem(response.data);
      })
      .catch((exception) => {
        console.log(exception);
      });
  };

  useEffect(() => {
    retrieveItem(params.id);
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    ItemService.updateItem(item)
      .then((response) => {

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
                <Form.Control
                  disabled
                  type="number"
                  value={item.itemCode}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Creation date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  max={currentDateToISO8601()}
                  value={item.createdDate}
                  name="createdDate"
                  onChange={handleInputChange}
                  required
                />
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
                  <FormControl
                    type="number"
                    min="0.01"
                    step="any"
                    value={item.price}
                    name="price"
                    onChange={handleInputChange}
                  />
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
                  <BsFillCircleFill
                    className="m-2"
                    color={item.status ? "green" : "red"}
                  />
                  <strong
                    className={item.status ? "text-success" : "text-danger"}
                  >
                    {item.status ? "Published" : "Discontinued"}
                  </strong>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Item description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={item.description}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid description.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-4">
            <Col className="d-flex align-items-end" sm={10}>
              <h5>Suppliers</h5>
            </Col>
            <Col sm={2}>
              <Button
                className="d-flex align-items-center"
                size="sm"
                variant="outline-primary" 
                onClick={() => setShowModalAssociateSupplier(true)}
              >
                <BsPlusLg size=".6rem" />{" "}
                <span className="p-1">Associate suppliers</span>
              </Button>{" "}
            </Col>
          </Row>

          <ItemSuppliersTable data={item} />

          <Row className="mb-4">
            <Col className="d-flex align-items-end" sm={10}>
              <h5>Price reductions</h5>
            </Col>
            <Col sm={2}>
              <Button
                className="d-flex align-items-center"
                size="sm"
                variant="outline-primary"
              >
                <BsPlusLg size=".6rem" />{" "}
                <span className="p-1">New price reduction</span>
              </Button>{" "}
            </Col>
          </Row>

          <ItemPriceReductionsTable data={item} />

          <Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
            <Button
              variant="outline-danger"
              className="m-3"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Card>
      <AssociateSupplierModal item={item} show={modalAssociateSupplier}
        onHide={() => setShowModalAssociateSupplier(false)}/>
      <Toast/>
    </Container>
  );
};

export default Item;
