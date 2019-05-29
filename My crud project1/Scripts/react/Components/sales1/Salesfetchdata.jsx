import React from 'react';
//import SalesTable from './SalesTable';
import { Table,Modal,Button } from 'semantic-ui-react';
//import Sales from './Sales.jsx';
export default class Salesfetchdata extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            DateSold: today.toLocaleDateString('default'),
        }
    };

    render() {
        let SalesList = this.props.salesList;
        console.log(SalesList)
        let selectedSales = this.props.selectedSales;
        let ListedSale = this.props.ListedSale;
        let showModal = this.props.showModal;
       
        let tabledata;
       
        if (typeof SalesList !== '') {
            tabledata = SalesList.map((sl) => {
                return (
                    
                    <tr key={sl.Id}>
                       
                        <td className="four wide">{sl.CustomerName}</td>
                   
                        <td className="four wide">{sl.ProductName}</td>
                      
                        <td className="four wide">{sl.StoreName}</td>
                        <td className="four wide">{this.state.DateSold}</td>
                        <td className="four wide">
                            <div>
                                <Button color='yellow' onClick={() => this.props.selectSale(sl.Id)}><i className="edit icon"></i>Edit</Button>
                                   
                                    
                                
                            </div>
                        </td>
                        <td className="four wide">


                            <Modal trigger={<Button className="ui red button" ><i className="trash icon" ></i>Delete</Button>}>
                                <Modal.Header> Are you sure </Modal.Header>

                                <Modal.Actions>
                                    <Button color='red' onClick={() => this.props.closeModal()}>Close</Button>

                                    <Button onClick={() => this.props.deleteSale(sl.Id)} className='ui green button'>Ok
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
            <table className='ui celled selectable table' >
                <thead>
                    <tr>

                        <th className="four wide ">Customer</th>
                        <th className="four wide">Product</th>
                        <th className="four wide ">Store</th>
                        <th className="four wide">Date Sold</th>
                        <th className="four wide">Action</th>
                        <th className="four wide">Action</th>

                    </tr>
                </thead>
                <Table.Body>
                    {
                        tabledata

                        //salesList.map(sales => (
                        //    <SalesTable

                        //        key={sales.id}
                        //        sales={sales}
                        //        selectSale={this.props.selectSale}
                        //        deleteSale={this.props.deleteSale}
                        //    />
                        //))
                    }
                </Table.Body>
            </table>
            
        );
    }
}