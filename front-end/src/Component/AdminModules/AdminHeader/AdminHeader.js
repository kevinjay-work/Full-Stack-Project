import React, { Component } from "react";
import "./AdminHeader.css"
import SubmitReview from '../../orderentry/orderentry';
import ADDMODALITIES from "../AddModalities/AddModalities";
import {
    Button
} from "react-bootstrap";
import { auth } from "../../Login/Auth";

class AdminHeader extends Component {

    constructor() {
        super()

        this.state = {
            orderentry: false,
            regions: false,
            vendors: true,
            modalities: false,

        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <header className="header-wrap">
                    <div className="header-main order_header">
                        <div className="container">
                            <div className="row no-padding">
                                <div className="col-sm-3">
                                    {this.props.location.state && this.props.location.state.name ? < h3 >
                                        {this.props.location.state.name}
                                    </h3> : null}
                                </div>
                                <div className="col-sm-9">
                                    <div className="nav-wrap">
                                        <nav className="navbar navbar-default">
                                            <div className="navbar-header">
                                                <button
                                                    type="button"
                                                    className="navbar-toggle collapsed"
                                                    data-toggle="collapse"
                                                    data-target="#bs-example-navbar-collapse-1"
                                                    aria-expanded="false"
                                                >
                                                    <span className="sr-only">
                                                        Toggle navigation
                                                    </span>
                                                    <span className="icon-bar" />
                                                    <span className="icon-bar" />
                                                    <span className="icon-bar" />
                                                </button>
                                            </div>
                                            <div
                                                className="collapse navbar-collapse"
                                                id="bs-example-navbar-collapse-1"
                                            >
                                                <ul className="nav navbar-nav add-btn">
                                                    <li className="your-order add-btn">
                                                        <Button
                                                            onClick={() => auth.logout(this.props.history)}
                                                        >
                                                            Logout
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {this.props.location.state && this.props.location.state.role === 'player' ? <SubmitReview email = {this.props.location.state && this.props.location.state.name}/> : null}
                {this.props.location.state && this.props.location.state.role === 'ops member' ? <ADDMODALITIES /> : null}

                {/* {this.state.regions ? <ADDREGIONS /> : null}
                {this.state.modalities ? <ADDMODALITIES /> : null}
                {this.state.vendors ? <Vendors /> : null} */}

            </div>
        );
    }
}

export default AdminHeader;