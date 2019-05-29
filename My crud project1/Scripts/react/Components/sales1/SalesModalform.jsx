
import React from 'react';
import { Button, Modal, Form, Dropdown, Input } from 'semantic-ui-react';

const style = {
    top: 20 + '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 40 + '%',
}

export default class SalesModalform extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            DateSold: today.toLocaleDateString('default'),
        };
        this.handleChangeInputSales = this.handleChangeInputSales.bind(this);
        this.handleChangeSalesDate = this.handleChangeSalesDate.bind(this);
    };

    handleChangeSalesDate(e) {
        this.props.selectedSales.DateSold = e.target.value;
        this.props.selectSale(this.props.selectedSales);
    }

    handleChangeInputSales(mappedName, dropdownSelectedValue, object) {
        if (mappedName === 'customerName') {
           
            const custId = object.find((o) => o.value === dropdownSelectedValue).key;
            this.props.selectedSales.customerId = custId;
            this.props.selectedSales.customerName = dropdownSelectedValue;
           

        } else if (mappedName === 'productName') {
            const prodId = object.find((o) => o.value === dropdownSelectedValue).key;
            this.props.selectedSales.productId = prodId;
            this.props.selectedSales.productName = dropdownSelectedValue;

        } else {
            const storeId = object.find((o) => o.value === dropdownSelectedValue).key;
            this.props.selectedSales.storeId = storeId;
            this.props.selectedSales.storeName = dropdownSelectedValue;

        };
        
        this.props.selectSale(this.props.selectedSales);
    }

    render() {
        let { showModal, selectedSales, customerList, productList, storeList,salesList } = this.props;

        let customers = customerList.map((customer) => ({ key: customer.Id, text: customer.name, value: customer.name }));
        let products = productList.map((product) => ({ key: product.Id, text: product.name, value: product.name }));
        let stores = storeList.map((store) => ({ key: store.Id, text: store.name, value: store.name }));
        
        return (
            <Modal open={showModal} size='tiny' style={style}>
                <Modal.Header>Sales Form</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label>DateSold</label>
                            <Input name="dateSold" placeholder="mm/dd/yyyy"
                                value={this.state.DateSold} onChange={this.handleChangeSalesDate} />
                        </Form.Field>
                        <Form.Field required >
                            <label>Customer Name</label>
                            <Dropdown fluid selection name="customerName" placeholder="select Customer Name"
                                value={selectedSales.customerName} options={customers} onChange={(e, { value }, object) => this.handleChangeInputSales("customerName", value, customers)} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Product Name</label>
                            <Dropdown fluid selection name="productName" placeholder="select Product Name"
                                options={products} value={selectedSales.productName}
                                onChange={(e, { value }, object) => this.handleChangeInputSales("productName", value, products)} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Store Name</label>
                            <Dropdown fluid selection name="storeName" placeholder="select Store Name"
                                options={stores} value={selectedSales.storeName}
                                onChange={(e, { value }, object) => this.handleChangeInputSales("storeAddress", value, stores)} />
                        </Form.Field>
                        
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => this.props.closeModal()}>Close</Button>
                    <Button color='green' onClick={() => this.props.Edit(this.props.selectedSales)} >save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}