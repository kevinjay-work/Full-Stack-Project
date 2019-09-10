import {
    API
} from "../../api/index";
const localStorage = global.window.localStorage;
// const baseURL = `http://secondlook-life-1969196284.us-east-1.elb.amazonaws.com`;

export const auth = {

    login(email, password) {

        if (auth.loggedIn()) {
            return Promise.resolve(true);
        }
        console.log(email, password)
        return API._login({
            email,
            password
        }).then((response, err) => { //store user details in local storage
            localStorage.token = response.token;
            if(response.message === 'user not found'){
                return Promise.resolve(false);
            }
            return Promise.resolve(response);
        }).catch(err => {
            return Promise.resolve(false);
        })
    },
    singnup(email, password, selectedRole) {

        return API._signup({
            email,
            password,
            selectedRole
        }).then((response, err) => { //store user details in local storage
            localStorage.token = response.token;
            return Promise.resolve(true);
        }).catch(err => {
            localStorage.token = 'this is token';
            return Promise.resolve(true);
        })
    },
    loggedIn() {
        return !!localStorage.token;
    },

    logout(history) {

        localStorage.clear();
        history.push('/login');

    },

};