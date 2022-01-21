import React, { useState, useEffect } from "react";
import SupplierService from "../../../services/SupplierService";

import { Table } from 'react-bootstrap';

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState([]);

    const retrieveItems = () => {
        
    SupplierService.getAllSuppliers()
        .then(response => {
            setSuppliers(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        retrieveItems();
    }, [suppliers]);

    return(
        <Table responsive striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
            {suppliers.map((supplier, key) =>
                    <tr key={key}>
                        <td>{supplier.name}</td>
                        <td>{supplier.country}</td>
                    </tr>       
                )}
            </tbody>
        </Table>
    );
};

export default Suppliers;