import React, { Component } from "react";
import Login from "./Component/Login/login";
import { auth } from "./Component/Login/Auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import indexRoutes from "./Routes/index";

const SecretRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.loggedIn() === true ? (
                <>
                    <Component {...props} />
                </>
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        {indexRoutes.map((prop, key) => {
                            if (prop.isPrivate) {
                                return prop.exact ? <SecretRoute exact path={prop.path} component={prop.component} key={key} /> : <SecretRoute path={prop.path} component={prop.component} key={key} />
                            }
                            return <Route path={prop.path} component={prop.component} key={key} />;
                        })}
                        <React.Fragment>
                            <Route
                                exact={true}
                                path="/"
                                render={() => (
                                    <div>
                                        <Login />
                                    </div>
                                )}
                            />
                        </React.Fragment>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
