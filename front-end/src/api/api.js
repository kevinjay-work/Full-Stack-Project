import axios from 'axios';
const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

export class Api {

    async _login({ email, password }) {
        let form = new FormData();
        form.append("email", email);
        form.append("password", password);

        return axios.post('http://localhost:3001/users/login', {
            email: `${email}`,
            password: `${password}`
          })
          .then((response) => {
            if(response.data.message === false) {
              return {
                message : 'user not found'
              }
            } else {
              return response.data 
              
            }
          })
          .catch((error) => {
            return error
          });
    }

    async _signup({ email, password, selectedRole }) {
        let form = new FormData();
        form.append("email", email);
        form.append("password", password);
        form.append("selectedRole", selectedRole.value);


        return  axios.post('http://localhost:3001/users/signup', {
            email: `${email}`,
            password: `${password}`,
            userRole: `${selectedRole}`
          })
          .then((response) => {
            if(response.data.message === false) {
              alert('This User is alraedy registered, try with some other email.')
            } else {
              alert('Welcome, You have been logged in')
            }
          })
          .catch((error) => {
            alert(error)
          });
    }

    get token() {
        return this._token
    }

    set token(value) {
        this._token = value
    }
}
