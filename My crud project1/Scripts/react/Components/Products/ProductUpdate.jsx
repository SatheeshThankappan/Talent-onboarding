import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class CustomerUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],

            success: [],

            id: this.props.id,
            name: this.props.name,
            price: this.props.price

        };
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        // this.Edit = this.Edit.bind(this);

    }
    onClose() {
        this.setState({ open: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        

    }
    onUpdate() {

        var data = { 'Id': this.state.id, 'Name': this.state.name, 'Price': this.state.price };

        $.ajax({
            url: "/Product/EditProduct",
            type: "POST",
            dataType: "JSON",
            data: data,
            success: function (response) {

                this.setState({ productList: response.data });
                window.location.reload()

            }.bind(this),
           
        });
    }
    render() {

        return (

            <React.Fragment>


                <Modal.Content>

                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />


                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input type="text" name="price" value={this.state.price} onChange={this.onChange} />


                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onClose} secondary >Cancel
                            </Button>
                    <Button onClick={this.onUpdate} className="ui green button">Edit
                            <i className="check icon"></i>

                    </Button>
                </Modal.Actions>




            </React.Fragment>


        )
    };

}