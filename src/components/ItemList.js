import React, { useState, useEffect } from "react";
import ItemDataService from "../services/ItemService";
import { Table, Container} from 'react-bootstrap';

const ItemList = () => {

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {
    ItemDataService.getAll()
      .then(response => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
        <Container fluid className="p-4">
            <h2 className="mb-3">Item list.</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Item code</th>
                    <th>Price</th>
                    <th>State</th>
                    <th>Creation date</th>
                    <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {items && items.map((item, index) => (
                        //Tiene que ser un componente.
                        <tr>
                            <td key={item.id} >{item.itemCode}</td>
                            <td>{item.price} €</td>
                            <td>{item.status ? "Published" : "Discontinued"}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
  );
};

export default ItemList;