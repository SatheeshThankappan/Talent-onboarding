import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmExampleContent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            customerList : this.props.customerList
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this)
        console.log(props)
    }
    open() {
        // if (this._Ismounted) {
        this.setState({ open: true });
        console.log(this.state.open)
    }
    close() {
        // if (this._Ismounted) {
        this.setState({ open: false });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ customerList: [...nextProps] })

        console.log(this.state.customerList)
    }




    render() {
        return (
            <div>
                <Button onClick={this.open}>Delete</Button>
                <Confirm
                    open={this.state.open}
                    content='This is a custom message'
                    onCancel={this.close}
                    onConfirm={this.close}
                />
            </div>
        )
    }
}

export default ConfirmExampleContent
