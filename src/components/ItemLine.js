
import {Link } from "react-router-dom";
import {BsPencilSquare} from "react-icons/bs";

const ItemLine = (props) => {
    return (
    <tr>
        <td>{props.data.itemCode}</td>
        <td>{props.data.price} €</td>
        <td>{props.data.status ? "Published" : "Discontinued"}</td>
        <td>{props.data.createdDate}</td>
        <td>{props.data.description}</td>
        <td class="d-flex justify-content-center"><Link to={`/item/${props.data.id}`}><BsPencilSquare color="black"/></Link></td>
    </tr>
    );
};

export default ItemLine;