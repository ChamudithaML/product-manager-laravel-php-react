import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Products from './components/pages/Products';

const ComponentWrapper = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/home' exact element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default ComponentWrapper;