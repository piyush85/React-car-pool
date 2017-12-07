import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './App.css';
import {Link,withRouter} from 'react-router-dom';


const $request = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <main className="login-Container">
                    <div className="flexItems">
                        <TextField
                            hintText="10-digit mobile number or email ID"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <div className="button">
                            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </div>
                    <footer className="footer">
                        <span>Don't have an account? </span>
                        <Link to="/register">Register Now</Link>
                    </footer>
                </main>
            </MuiThemeProvider>
        );
    }
    handleClick(event){
        var self = this;
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }
        $request.post('login', payload)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    console.log("Login successfull");
                    self.props.history.push('/drivers');
                }
                else if(response.status === 204){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default withRouter(Login);