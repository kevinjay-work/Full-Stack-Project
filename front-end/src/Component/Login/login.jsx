import React, { Component } from "react";
import {
  Grid,
  Col,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from './Auth';
import { Redirect } from "react-router-dom";
import './login.css'
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      role: '',
      isSubmitting: false
    };
  }

  OnSubmit = () => {
    const { email, password } = this.state
    this.setState({ error: '', isSubmitting: true })

    auth.login(email, password).then((response, err) => {
      console.log(response);
      this.setState({
        email: response.email,
        role: response.role
      })
      // axios.post('http://localhost:3001/users/login', {
      //   email: `${email}`,
      //   password: `${password}`
      // })
      // .then((response) => {
      //   if(response.data.message === false) {
      //     alert('user not found')
      //   } else {
      //     alert('Welcome')
      //   }
      // })
      // .catch((error) => {
      //   alert(error)
      // });
      if (response === true) {

        this.setState({ isSubmitting: false });


        // return <Redirect
        //   to={{
        //     pathname: '/admin',
        //     state: User
        //   }}

        // />

      }

    })
      .catch(error => {
        this.setState({ isSubmitting: false });
      });
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { email, role, password, error, isSubmitting } = this.state;
    if (auth.loggedIn()) {
      const User = {
        name: email,
        role: role
      }
      return <Redirect to={{
        pathname: '/admin',
        state: User
      }} />
      // return <Redirect to="/admin" />
    }
    return isSubmitting ? (
      <div className="loader" >
        <Loader type="ThreeDots" color="black" height="100" width="100" />
      </div >
    ) : (
        <div className="container">
          <div className="form" id="front-form">

            <Grid>
              <Col>
                <Form onSubmit={this.OnSubmit}>
                  <div>
                    {<small className="text">{error && error}</small>}

                    <FormGroup
                    >
                      <div className="field">

                        <label>Email address</label>
                        <FormControl placeholder="Enter email"
                          name="email"

                          value={email}
                          onChange={this.handleChange} />
                      </div>
                    </FormGroup>

                    <FormGroup
                    >
                      <div className="field">

                        <label>Password</label>
                        <FormControl
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={this.handleChange}

                        />
                      </div>
                    </FormGroup>

                  </div>
                  <div className="form-note">
                    <button type="submit" disabled={email === '' || password === ''} className="submit-btn">Login</button>
                    <span>Or</span>
                    <Link to="/SignUp">
                      Create Account
                                                        </Link>
                  </div>
          
               


                </Form>
              </Col>
            </Grid>
          </div>
        </div>

      )


  }
}

const FormikApp = withFormik({
  mapPropsToValues(props) {

    return {
      email: '',
      password: ''
    }
  },
  handleSubmit({ email, password }, { props, resetForm, setErrors, setSubmitting }) {
    setSubmitting(true)
    auth.login(email, password).then(res => {
      setSubmitting(false)
    }).catch(err => {
      console.log(`TODO: handle error: `, err)
      setErrors({ error: "Request Cannot be processed" })

      setSubmitting(false)
    })
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })
})(LoginPage)



export default FormikApp;
