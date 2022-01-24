import React, { useState, useEffect } from "react";

import { Modal, Container, Button, Row ,  Col} from "react-bootstrap";
import { BsFillCircleFill} from "react-icons/bs"

import ItemSupplier from '../supplier/tables/ItemSupplier'
import ItemPriceReduction from '../price-reductions/tables/ItemPriceReduction'
import  {formatDateFromISO8601} from "../../helpers/helpers";


const ViewItem = (props) => {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Item information
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
                <Row>
                    <Col className="border"> <p><strong>Item code:</strong> {props.item.itemCode}</p> </Col>
                    <Col className="border"> <p><strong>Price:</strong> {props.item.price} €</p> </Col>
                </Row>
                <Row>
                    <Col className="border border-top-0"> <p><strong>Creation date:</strong> {formatDateFromISO8601(props.item.createdDate)}</p></Col>
                    <Col className="border border-top-0">  <strong>Status:</strong><BsFillCircleFill className="m-2" color={props.item.status ? "green" : "red" } />
                            <strong className={props.item.status ? "text-success" : "text-danger" }>
                            {props.item.status ? "Published" : "Discontinued"}
                            </strong></Col>
                </Row>
                <Row> 
                    <Col className="border border-top-0 mb-3"><p><strong>Description:</strong> {props.item.description}</p></Col> 
                </Row>
                
                <Row>
                    <h5>Suppliers</h5>
                    <ItemSupplier suppliers={props.item.suppliers}></ItemSupplier>
                </Row>

                <Row>
                    <h5>Price Reductions</h5>
                    <ItemPriceReduction priceReductions={props.item.priceReductions}/>
                </Row>

            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );

}
export default ViewItem;