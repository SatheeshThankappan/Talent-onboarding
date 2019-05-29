
import React, { Component} from 'react';
import { Button, Modal, Form, Confirm } from 'semantic-ui-react';

import CustomerCreate from './CustomerCreate.jsx';
import CustomerUpdate from './CustomerUpdate.jsx';







export default class Customerfetch extends Component{
    constructor(props) {
        super(props);
        this.state = { showModal: true }
        this.state = {
            
            customerList: [],
            success: [],
            //Edit: false,
            show: false,
            error: {},
            open: false,
            name: '',
            address: '',
            id:0
        };
        this._Ismounted = false;
        this.showModal = this.showModal.bind(this);
        this.loadData = this.loadData.bind(this);
        this.Edit1 = this.Edit1.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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
            url: "/Customer/GetAllCustomers",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType:"JSON",
            success: function (data) {                                      

                this.setState({ customerList: data });              
            }.bind(this),
            error: function () { }
        });
              
    }    

    
    
    Edit1(id, name, address) {                     
       this.setState({ Edit: true,id:id, name: name, address: address  });
       
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    delete(id) {
        console.log(id)
        $.ajax({
            url: "/Customer/Deletecustomer",
            type: "post",
            data: { 'Id': id }
            
        });

        
    }
    showModal() {
       
            this.setState({ show: true });
    }
    hideModal() {
        if (this._Ismounted)
        this.setState({ show: false });
    }

    

    closeUpdateModal() {
       // if (this._Ismounted) {
            this.setState({ Edit: false });
        }
    
    render() {

        let customerList = this.state.customerList;   
                
        let tabledata;
        if (typeof customerList !== '') {
            tabledata = customerList.map((cust) => {
                
                return (

                    <tr key={cust.Id}>
                        {console.log(cust.Id)}
                        <td className="four wide">{cust.name}</td>
                        {console.log(cust.name)}
                        <td className="four wide">{cust.address}</td>
                        <td className="four wide">
                            <div>
                                <Modal trigger={<Button color='yellow' onClick={() => this.Edit1(cust.Id, cust.address, cust.name)}>

                                    <i className="edit icon"></i>Edit</Button>}>
                                    <Modal.Header> Edit customer </Modal.Header>
                                    <CustomerUpdate open={this.state.Edit} id={this.state.id} name={this.state.name} address={this.state.address} />
                                    
                                    
                                </Modal>   
                                
                            
                            </div>       
                        </td>                        
                        <td className="four wide">
                            
                            <Modal trigger={<Button className="ui red button" ><i className="trash icon"></i>Delete</Button>}>
                                <Modal.Header> Are you sure </Modal.Header>
                           
                                <Modal.Actions>
                                    <Button onClick={this.close} secondary>Cancel</Button>

                                    <Button onClick={() => this.delete(cust.Id)} className='ui green button'>Ok
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
                    <Modal trigger={<Button className="ui button" color="blue">New Customer</Button>}>
                        <Modal.Header> Create Customer  </Modal.Header>
                        <CustomerCreate  onChange={this.onChange} />
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





