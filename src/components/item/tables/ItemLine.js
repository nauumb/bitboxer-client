import React, { useState, useEffect } from "react";

import {Link} from "react-router-dom";

import {BsPencilSquare, BsFillEyeFill} from "react-icons/bs";


import ViewItem from '../ViewItem';
import  {formatDateFromISO8601} from "../../../helpers/helpers";

const ItemLine = ({item}) => {

    const [modalShowItem, setModalShowItem] = React.useState(false);

    return (
        <tr>
            <td>{item.itemCode}</td>
            <td>{item.price} €</td>
            <td>{item.status ? "Published" : "Discontinued"}</td>
            <td>{formatDateFromISO8601(item.createdDate)}</td>
            <td>{item.description.substring(0,130)}...</td>
            <td>
                <div  className="d-flex justify-content-evenly align-items-center">
                    <BsFillEyeFill  onClick={() => setModalShowItem(true)} color="black"/> <ViewItem item={item} show={modalShowItem} onHide={() => setModalShowItem(false)} />
                    <Link to={`edit/item/${item.id}`}><BsPencilSquare color="black"/></Link>
                </div>
            </td>

            
        </tr>
    );
};

export default ItemLine;