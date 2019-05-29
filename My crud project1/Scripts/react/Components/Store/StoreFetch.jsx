
import React, { Component } from 'react';
import { Button, Modal, Form, Confirm } from 'semantic-ui-react';

import StoreCreate from './StoreCreate.jsx';
import StoreUpdate from './StoreUpdate.jsx';







export default class StoreFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: true }
        this.state = {

            storeList: [],
            success: [],         
            show: false,          
            open: false,
            name: '',
            address: '',
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
            url: "/Store/GetAllStores",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType: "JSON",
            success: function (data) {

                this.setState({ storeList: data });
            }.bind(this),
            error: function () { }
        });

    } 
    Edit1(id, name, address) {
        this.setState({ Edit: true, id: id, name: name, address: address });

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    delete(id) {
        console.log(id)
        $.ajax({
            url: "/Store/DeleteStore",
            type: "post",
            data: { 'Id': id }

        });


    }

    render() {

        let storeList = this.state.storeList;

        let tabledata;
        if (typeof storeList !== '') {
            tabledata = storeList.map((st) => {

                return (

                    <tr key={st.Id}>
                        {console.log(st.Id)}
                        <td className="four wide">{st.name}</td>
                        {console.log(st.name)}
                        <td className="four wide">{st.address}</td>
                        <td className="four wide">
                            <div>
                                <Modal trigger={<Button color='yellow' onClick={() => this.Edit1(st.Id, st.name, st.address )}>

                                    <i className="edit icon"></i>Edit</Button>}>
                                    <Modal.Header> Edit Store </Modal.Header>
                                    <StoreUpdate open={this.state.Edit} id={this.state.id} name={this.state.name} address={this.state.address} />


                                </Modal>


                            </div>
                        </td>
                        <td className="four wide">

                            <Modal trigger={<Button className="ui red button" ><i className="trash icon"></i>Delete</Button>}>
                                <Modal.Header> Are you sure </Modal.Header>

                                <Modal.Actions>
                                    <Button onClick={this.close} secondary>Cancel</Button>

                                    <Button onClick={() => this.delete(st.Id)} className='ui green button'>Ok
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
                    <Modal trigger={<Button className="ui button" color="blue">New Store</Button>}>
                        <Modal.Header> Create Store </Modal.Header>
                        <StoreCreate onChange={this.onChange} />
                    </Modal>
                </div>


                <table className='ui celled selectable table' >
                    <thead>
                        <tr>

                            <th className="four wide ">Name</th>
                            <th className="four wide">Address</th>
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