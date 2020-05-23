import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class VendorDispatchedView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Dpdt: [], 
            username: this.props.location.username,
            vendor_id: this.props.location.vendor_id
        }
    }

    componentDidMount() {

        const SpecVend = {
            username: this.state.username
        }

        axios.post(`http://localhost:4000/viewdispatchedpdt/:${this.state.username}`,SpecVend)
             .then(response => {
                 this.setState({Dpdt: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })

    }

    Vendorview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Vendoradd = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/add",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    render() {
        return (
            <div>
            <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                          <li className="navbar-item">
                            <button type="button" onClick={this.Vendorview} className="btn btn-primary">View Products</button>     
                          </li>
                          <li className="navbar-item">
                            <button type="button" onClick={this.Vendoradd} className="btn btn-primary">Add Products</button>        
                          </li>
                        </ul>
                      </div>
                    </nav>
            </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.Dpdt.map((currentPdt, i) => {
                            return (
                                <tr>
                                    <td>{currentPdt.username}</td>
                                    <td>{currentPdt.pdtname}</td>
                                    <td>Dispatched</td>
                                    <td>{(currentPdt.pdtrating/currentPdt.pdttotreviews)}</td>
                                    <td>{currentPdt.reviews}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
