import React from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
export default class SalesTable extends React.Component {
    render() {
        const { sales } = this.props;
        return (
            <Table.Row>
                
                <Table.Cell>{sales.customerName}</Table.Cell>
                <Table.Cell>{sales.productName}</Table.Cell>
                <Table.Cell>{sales.storeName}</Table.Cell>
                <Table.Cell>{sales.DateSold}</Table.Cell>
                <Table.Cell>
                    <Button basic color='yellow' sales={sales} onClick={() => this.props.selectSale(sales)}>
                        <Icon name="edit"></Icon>
                        Edit
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button basic color='red' sales={sales} onClick={() => this.props.deleteSale(sales)}>
                        <Icon name='trash alternate' />
                        Delete
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}
