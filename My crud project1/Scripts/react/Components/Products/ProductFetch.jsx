import React, { Component } from 'react';
import { Button, Modal, Form, Confirm } from 'semantic-ui-react';

import ProductCreate from './ProductCreate.jsx';
import ProductUpdate from './ProductUpdate.jsx';

const style = {
    top: 10+ '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 30 + '%',
}
export default class ProductFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: true }
        this.state = {

            productList: [],
            success: [],          
            open: false,
            name:'',
            price:'',
            id: 0
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.loadData = this.loadData.bind(this);
        this.Edit1 = this.Edit1.bind(this);
        this.onChange = this.onChange.bind(this);
        this.delete = this.delete.bind(this);
    }

open() {
    // if (this._Ismounted) {
    this.setState({ open: true });
    }
close() {
    // if (this._Ismounted) {
    this.setState({ open: false });
    window.location.reload()
    }

componentDidMount() {
    this._Ismounted = true;
    this.loadData();

    }
    loadData() {
        $.ajax({
            url: "/Product/GetAllProducts",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType: "JSON",
            success: function (data) {

                this.setState({ productList: data });
            }.bind(this),
            error: function () { }
        });

    }    
    Edit1(id, name, price) {
        this.setState({ Edit: true, id: id, name: name, price: price });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    delete(id) {
        console.log(id)
        $.ajax({
            url: "/Product/DeleteProduct",
            type: "post",
            data: { 'Id': id }

        });


    }


    render() {
        let productList = this.state.productList;
        let tabledata;
        if (typeof productList !== '') {
            tabledata = productList.map((prdt) => {
                return (

                    <tr key={prdt.Id}>
                        {console.log(prdt.Id)}
                        <td className="four wide">{prdt.name}</td>
                        {console.log(prdt.name)}
                        <td className="four wide">{prdt.price}</td>
                       
                        <td className="four wide">
                            <div>
                                <Modal trigger={<Button color='yellow' onClick={() => this.Edit1(prdt.Id, prdt.name, prdt.price)} ><i className="edit icon"></i>Edit</Button>}>
                                    <Modal.Header> Edit Product </Modal.Header>
                                    <ProductUpdate open={this.state.Edit} id={this.state.id} name={this.state.name} price={this.state.price} style={style}/>
                                    
                                </Modal>
                            </div>    
                        </td>
                        <td className="four wide">

                            <Modal trigger={<Button className="ui red button" ><i className="trash icon"></i>Delete</Button>}>
                                <Modal.Header> Are you sure </Modal.Header>

                                <Modal.Actions>
                                    <Button onClick={this.close} secondary>Cancel</Button>

                                    <Button onClick={() => this.delete(prdt.Id)} className='ui green button'>Ok
                                                                 <i className="check icon"></i>
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </td>
                    </tr>

                )
            });
        }
        return (
            <div>
                <div>
                    <h1 >hello </h1>

                </div>
                <div>
                    <Modal trigger={<Button className="ui button" color="blue">New Product</Button>}>
                        <Modal.Header> Create Product  </Modal.Header>
                        <ProductCreate onChange={this.onChange} style={style} />
                    </Modal>
                </div>
                <table className='ui celled selectable table' >
                    <thead>
                        <tr>

                            <th className="four wide ">Name</th>
                            <th className="four wide">Price</th>
                            <th className="four wide">Action</th>
                            <th className="four wide">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabledata
                        }

                    </tbody>
                </table>
               
            </div>
        );
    }
 
}