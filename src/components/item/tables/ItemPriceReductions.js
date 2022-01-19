
import {Table} from 'react-bootstrap';

const ItemPriceReductionsTable = (props) => {

    return (
        <Table responsive striped bordered hover variant="light" size="sm">
            <thead>
            <tr>
                <th>Reduced price</th>
                <th>Start date</th>
                <th>End date</th>
            </tr>
            </thead>
            <tbody>
            {props.data.priceReductions && props.data.priceReductions.map((priceReduction, index) => ( 
                <tr key={index}>
                    <td>{priceReduction.reducedPrice}</td>
                    <td>{priceReduction.startDate}</td>
                    <td>{priceReduction.endDate}</td>
                </tr>
            ))}
            </tbody>
      </Table>
    );
}

export default ItemPriceReductionsTable;