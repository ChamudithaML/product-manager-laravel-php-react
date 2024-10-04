import React, { useEffect, useState } from "react";
import axios from "axios"
import './ModifyProduct.css'
import AddProductForm from "../AddProductForm";
import EditProductForm from "../EditProductForm";

const ModifyProduct = () => {

    const [users, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        axios.get(`http://127.0.0.1:8000/api/products`).then(function (response) {
            // console.log(response.data);
            setProducts(response.data);
        });
    }

    const deleteProduct = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`).then(function (response) {
            // console.log(response.data);
            getProducts();
        });
        alert("Successfully Deleted");
    }

    const [isFormVisible, setFormVisible] = useState(false);

    const addProductForm = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };


    const [editProductId, setEditProductId] = useState(null);

    const editProductForm = (id) => {
        setEditProductId(id);
    };

    const closeEditForm = () => {
        setEditProductId(null);
    };

    return (
        <div className="product-list-container">
            <div className="product-list-wrapper">
                <div className="product-list-header">
                    <p className="add-product-button" onClick={addProductForm}>Add New Product</p>

                    {isFormVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={closeForm}>X</button>
                                <AddProductForm getProducts={getProducts} closeForm={closeForm} />
                            </div>
                        </div>
                    )}


                    <h1 className="product-list-title">Products</h1>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, key) =>
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>                            
                                <td>
                                    <p className="edit-button" onClick={() => editProductForm(item.id)}>Edit</p>

                                    {editProductId === item.id && (
                                        <div className="modal-overlay">
                                            <div className="modal-content">
                                                <button className="close-button" onClick={closeEditForm}>X</button>
                                                <EditProductForm id={item.id} getProducts={getProducts} closeEditForm={closeEditForm} />
                                            </div>
                                        </div>
                                    )}

                                    <p onClick={() => deleteProduct(item.id)} className="delete-button">Delete</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModifyProduct;