import { Table} from "react-bootstrap";


const ItemSupplier = ({suppliers}) => {

    return(
        <Table responsive striped bordered hover variant="light" size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {suppliers && suppliers.map((supplier, index) => (
                <tr key={index}>
                    <td>{supplier.name}</td>
                    <td>{supplier.country}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ItemSupplier;