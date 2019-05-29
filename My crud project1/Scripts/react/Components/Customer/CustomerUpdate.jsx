
import React, { Component} from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class CustomerUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            error: {},
            success: [],
            number: '',
            id: this.props.id,
            name: this.props.name,
            address: this.props.address

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
        this.setState({[e.target.name]: e.target.value })

        console.log(this.state.address)
        
    }
   
    

    onUpdate() {
        
        var data = { 'Id': this.state.id, 'Name': this.state.name, 'Address': this.state.address };
        
        $.ajax({
            url: "/Customer/Editcustomer",
            type: "POST",
            dataType: "JSON",
            data: data,
            success: function (response) {
                
                this.setState({ customerList: response.data});
                window.location.reload()

            }.bind(this),
            error: function () { }
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
                            <label>Address</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.onChange} />


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