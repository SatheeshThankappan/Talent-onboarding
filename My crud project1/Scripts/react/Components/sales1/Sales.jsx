import React, { Component } from 'react';

import Salesfetchdata from './Salesfetchdata.jsx';
import SalesModalform from './SalesModalform.jsx';
import { Button, Icon } from 'semantic-ui-react';

export default class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSales: '',
            showModal: false,
            salesList: [],
            ListedSale:[],
            productList: [],
            customerList: [],
            storeList: [],
            id: '',
            customerName: '',
            productName: '',
            storeName: '',
            customerId:0,
            DateSold: new Date().toLocaleDateString()          
        };
        this.handleAddNewSales = this.handleAddNewSales.bind(this);
        this.selectSale = this.selectSale.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.Edit = this.Edit.bind(this);
        this.deleteSale = this.deleteSale.bind(this);
        this.loadData = this.loadData.bind(this);
        //this.Edit1 = this.Edit1.bind(this);
    }

    closeModal() {
       
        this.setState({
            showModal: false
        })

        window.location.reload()
    }

    loadData() {
        $.ajax({
            url: "/Customer/GetAllCustomers",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType: "JSON",
            success: function (data) {
                this.setState({ customerList: data });
            }.bind(this),

        });


        $.ajax({
            url: "/Product/GetAllProducts",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType: "JSON",
            success: function (data) {

                this.setState({ productList: data });
            }.bind(this),

        });
        $.ajax({
            url: "/Store/GetAllStores",
            type: "GET",
            contentType: "applicatio/Json;",
            dataType: "JSON",
            success: function (data) {

                this.setState({ storeList: data });
            }.bind(this),

        });
        $.ajax({
            url: "/Sales/GetAllSales",
            type: "GET",
            contentType: "applicatio/json",
            dataType: "JSON",
            success: function (data) {
                
                this.setState({ salesList: data });
            }.bind(this),
           
        });
      
    }  

    componentDidMount() {
        this.loadData();
    }

    selectSale(ListedSale) {
        this.setState({
            selectedSales: ListedSale,
            showModal: true
        })
        //console.log(selectedSales)
    }

    handleAddNewSales() {
        this.setState({
            selectedSales: {},
            showModal: true
        });
    }
    //Edit1(id, customerId,productId,storeId,Datesold) {
    //    this.setState({ Edit: true, id: id, customerId: customerId, productId: productId, storeId: storeId, DateSold: DateSold });
    //}
    Edit(ListedSale) {
        console.log("hi",ListedSale);
        $.ajax({
            url: "/Sales/AddSales",
            type: "post",
            data: ListedSale,
            success: function (data) {
                this.setState({ ListedSale: data })               
                    
                }.bind(this),
        });
       showModal: false
        this.loadData();
    }
    deleteSale(id) {
       // console.log(id)
        $.ajax({
            url: "/Sales/DeleteSales",
            type: "post",
            data: { 'Id': id }
           
        });

       // showModal: false
        this.loadData();
    }
    

    render() {
        return (
            <div>
                <h1>Sales List</h1>
                <Button className="ui button" color="blue" onClick={() => this.handleAddNewSales()}>
                    <Icon name="check" />
                    Create New Sales
                </Button>
                <Salesfetchdata salesList={this.state.salesList} selectSale={this.selectSale}
                    deleteSale={this.deleteSale} closeModal={this.closeModal} Edit1={this.Edit1}
                />
                {this.state.selectedSales &&
                    <SalesModalform
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        customerList={this.state.customerList}
                        productList={this.state.productList}
                        storeList={this.state.storeList}
                        selectSale={this.selectSale}
                    selectedSales={this.state.selectedSales}
                    Edit={this.Edit}
                    />
                }
            </div>
        );
    }
}
