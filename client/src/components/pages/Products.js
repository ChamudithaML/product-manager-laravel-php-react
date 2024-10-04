import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products'); 
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products');
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='products-container'>
            <h1>Products</h1>
            {error && <p className="error">{error}</p>}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Products;
