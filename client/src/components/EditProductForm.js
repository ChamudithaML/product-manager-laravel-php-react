import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditProductForm.css'

export default function EditProductForm({ id, getProducts, closeEditForm }) {
    const [inputs, setInputs] = useState([]);

    // console.log(id);

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get(`http://127.0.0.1:8000/api/products/${id}`).then(function (response) {
            // console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, price } = inputs;

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            alert('Name is required and should be a string.');
            return;
        }
        inputs.name = name.charAt(0).toUpperCase() + name.slice(1);

        if (!price || isNaN(price) || price <= 0) {
            alert('Price is required and it should be positive');
            return;
        }

        axios.put(`http://127.0.0.1:8000/api/products/${id}`, inputs).then(function (response) {
            console.log(response.data);
            getProducts();
            closeEditForm();
        });

        console.log(id);
        console.log(inputs);
    }

    return (
        <div className="edit-form-container">
            <div className="edit-form-wrapper">
                <h1 className="edit-form-title">Edit Product</h1>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="edit-form-group">
                        <label className="edit-form-label">Name</label>
                        <input type="text" value={inputs.name} className="edit-form-input" name="name" onChange={handleChange} />
                    </div>
                    <div className="edit-form-group">
                        <label className="edit-form-label">Price</label>
                        <input type="text" value={inputs.price} className="edit-form-input" name="price" onChange={handleChange} />
                    </div>
                    <div className="edit-form-group">
                        <label className="edit-form-label">Description</label>
                        <input type="text" value={inputs.description} className="edit-form-input" name="description" onChange={handleChange} />
                    </div>
                    <button type="submit" name="update" className="edit-form-button">Save</button>
                </form>
            </div>
        </div>
    );
}
