import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';


export default class CustomerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Price: '',     
            success: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        
        this.onChange = this.onChange.bind(this);
        this.Close = this.Close.bind(this);
        this.closeModal = this.closeModal.bind(this);




    }
    onSubmit(event) {
        event.preventDefault();
        var data = { 'Name': this.state.Name, 'Price': this.state.Price };
        console.log(data)
        $.ajax({
            url: "/Product/AddProduct",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ success: data })

                this.closeModal();


                //window.location.reload()

            }.bind(this)

        });
    }
    closeModal() {
        this.setState({ showModal: false })
    }
    Close() {
        this.setState({ open: false });
        window.location.reload()
    }
    onChange(e) {

        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value)

    }
    render() {
        return (
            <React.Fragment>
                <Form>
                    <Form.Field>
                        <label>Name</label>

                        <input type="text" name="Name" placeholder='Name' onChange={this.onChange} value={this.state.Name} />

                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>


                        <input type="text" name="Price" placeholder='Price' onChange={this.onChange} value={this.state.Price} />
                        <div style={{ color: 'red' }}>

                        </div>

                    </Form.Field>
                </Form>
                <Modal.Actions>
                    <Button onClick={this.Close} secondary >Cancel
                            </Button>
                    <Button onClick={this.onSubmit} className='ui green button'>Create
                            <i className="check icon"></i>
                    </Button>
                </Modal.Actions>

            </React.Fragment>

        );
    }

}