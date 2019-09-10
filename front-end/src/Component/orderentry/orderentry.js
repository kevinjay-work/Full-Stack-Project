import React, { Component } from "react";
import "./orderentry.css";
import validate from "./validator";
import * as Yup from "yup";
import { API } from "../../api/index";
import { Form, Formik, Field } from "formik";
import axios from 'axios';
import { auth } from "../Login/Auth";
import StarRatingComponent from 'react-star-rating-component';

import {
    Grid,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    Row
} from "react-bootstrap";


class Order_Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: null
       
        };
    }
  
    SendOrder = orderData => {
        axios.post('http://localhost:3001/orders/setOrder', {
            starRating : orderData.rating,
            email: this.props.email,
            comment: orderData.Comments
        }
        )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            return error
          });
    };
    
    render() {
        return (
            <div className="container">
                <div className="form" id="front-form">
                    <div>
                        <Formik
                            initialValues={{
                                rating: 0,
                                Comments: "",
                            }}
                            onSubmit={values => {
                                this.SendOrder(values);
                            }}
                            render={({
                                touched,
                                errors,
                                values,
                                handleChange,
                                handleSubmit,
                                setFieldValue
                            }) => (
                                    <Form>

                                        <FormGroup>
                                            <div className="field">
                                                <label htmlFor="">
                                                    Rate your Game:
                                                </label>
                                                <StarRatingComponent
                                                    name="rate1"
                                                    starCount={10}
                                                    value={values.rating}
                                                    onStarClick={e => {
                                                        setFieldValue("rating", e);
                                                    }}
                                                />
                                            </div>
                                            {errors.rating &&
                                                touched.rating ? (
                                                    <div className="errors">
                                                        {errors.rating}
                                                    </div>
                                                ) : null}
                                        </FormGroup>


                                        <FormGroup>
                                            <div className="field">
                                                <label htmlFor="">
                                                    Add Comments(Optional)
                                                    </label>
                                                <textarea
                                                    className="textarea"
                                                    name="Comments"
                                                    placeholder=""
                                                    value={
                                                        values.Comments
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </FormGroup>

                                        <div className="form-note">
                                            <button
                                                type="submit"
                                                className="submit-btn"
                                            >
                                                Submit
                                                </button>
                                            <div className="clearfix" />
                                        </div>
                                        {this.state.message && <div className="errors">
                                            {this.state.message}
                                        </div>
                                        }
                                    </Form>
                                )}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default Order_Entry;
