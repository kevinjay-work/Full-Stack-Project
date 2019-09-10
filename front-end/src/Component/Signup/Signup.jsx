import React, { Component } from "react";
import {
  Grid,
  Col,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../Login/Auth';
import { Redirect } from "react-router-dom";
import './login.css'
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';

const options = [
  { value: 'player', label: 'Player' },
  { value: 'ops member', label: 'OPS Member' },
];



class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      isSubmitting: false
    };
  }

  OnSubmit = () => {
    const { email, password, selectedRole } = this.state
    //  this.setState({ error: '', isSubmitting: true, selectedRole: null })
    const role = selectedRole.value;
    auth.singnup(email, password, role).then((response, err) => {
      // axios.post('http://localhost:3001/users/signup', {
      //   email: `${email}`,
      //   password: `${password}`,
      //   userRole: `${role}`
      // })
      // .then((response) => {
      //   if(response.data.message === false) {
      //     alert('This User is alraedy registered, try with some other email.')
      //   } else {
      //     alert('Welcome, You have been logged in')
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
  handleRoleChange = selectedRole => {
    this.setState({ selectedRole });
    console.log(`Option selected:`, selectedRole);
  };
  render() {
    const { email, password, error, isSubmitting, selectedRole } = this.state;
    if (auth.loggedIn()) {
      const User = {
        name: 'wakeel',
        role: 'player'
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
                    <FormGroup
                    >
                      <div className="field">

                        <label>Select Role</label>
                        <Select
                          value={selectedRole}
                          onChange={this.handleRoleChange}
                          options={options}
                        />
                      </div>
                    </FormGroup>

                  </div>
                  <div className="form-note">
                    <button type="submit" disabled={email === '' || password === ''} className="submit-btn">Sign Up</button>
                    <span>Or</span>
                    <Link to="/">
                      Login
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
})(SignUpPage)



export default FormikApp;
