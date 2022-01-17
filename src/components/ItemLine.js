import React, { useState, useEffect } from "react";

const ItemLine = () => {

    return (
        <tr>
            <td>{this.props.item.itemCode}</td>
            <td>{this.props.item.price} €</td>
            <td>{this.props.item.status ? "Published" : "Discontinued"}</td>
            <td>{this.props.item.createdDate}</td>
            <td>{this.props.item.description}</td>
        </tr>
    );
};

export default ItemLine;