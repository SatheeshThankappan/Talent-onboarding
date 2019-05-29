import React, { Component } from 'react'
import ReactDOM from 'react-dom';


import ProductFetch from './Components/Products/ProductFetch.jsx';

const app = document.getElementById('products');
ReactDOM.render(<ProductFetch />, app);