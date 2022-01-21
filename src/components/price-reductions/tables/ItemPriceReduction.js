import { Table} from "react-bootstrap";
import {formatDateFromISO8601} from '../../../helpers/helpers'

const ItemPriceReduction = ({priceReductions}) => {

    return(
        <Table responsive striped bordered hover variant="light" size="sm">
            <thead>
                <tr>
                    <th>Reduced price</th>
                    <th>Start date</th>
                    <th>End date</th>
                </tr>
            </thead>
            <tbody>
                {priceReductions && priceReductions.map((priceReduction, index) => (
                <tr key={index}>
                    <td>{priceReduction.reducedPrice}</td>
                    <td>{formatDateFromISO8601(priceReduction.startDate)}</td>
                    <td>{formatDateFromISO8601(priceReduction.endDate)}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ItemPriceReduction;