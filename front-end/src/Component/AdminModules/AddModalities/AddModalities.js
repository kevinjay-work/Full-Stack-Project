import React, { Component } from "react";
import "./AddModalities.css";
import { API } from "../../../api/index";
import { Formik } from "formik";
import Loader from "react-loader-spinner";
import axios from 'axios';

class ADDMODALITIES extends Component {
    constructor() {
        super();
        this.state = {
            Modalities: [],
            loading: true
        }
    }
    async componentDidMount() {
            axios.get('http://localhost:3001/orders/getAllOrders')
              .then((response) => {
                let Modalities = response.data;
                this.setState({ Modalities, loading: false })
              })
              .catch((error) => {
                console.log(error);
              })
    }
    
    render() {
        return (
            <div className="container">
                {this.state.loading ?
                    <div
                        className="loader"
                    >
                        <Loader type="ThreeDots" color="black" height="100" width="100" />
                    </div>
                    : <div className="row tables-row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <table className="table">
                                    <tbody>

                                        <tr>
                                            <th>S.No</th>
                                            <th>Rating</th>
                                            <th>User Email</th>
                                            <th>Comments</th>
                                        </tr>

                                        {
                                            this.state.Modalities.length > 0 ?
                                                this.state.Modalities.map((modality, index) => {
                                                    return <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{modality.starRating}</td>
                                                        <td>{modality.email}</td>
                                                        {modality.comment ? <td>{modality.comment}</td> : <td>Null</td>}

                                                        <td>{}</td>
                                                    </tr>
                                                })
                                                :
                                                <tr colSpan="8" className="text-center">
                                                    No Record Found
                                                </tr>
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}
export default ADDMODALITIES;
