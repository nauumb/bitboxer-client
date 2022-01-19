import {Link} from "react-router-dom";

import {BsPencilSquare} from "react-icons/bs";

import  {formatDateFromISO8601} from "../../../helpers/helpers";

const ItemLine = (props) => {
    return (
    <tr>
        <td>{props.data.itemCode}</td>
        <td>{props.data.price} €</td>
        <td>{props.data.status ? "Published" : "Discontinued"}</td>
        <td>{formatDateFromISO8601(props.data.createdDate)}</td>
        <td>{props.data.description}</td>
        <td className="d-flex justify-content-center"><Link to={`/item/${props.data.id}`}><BsPencilSquare color="black"/></Link></td>
    </tr>
    );
};

export default ItemLine;