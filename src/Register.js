import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
import Header from "./header";
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            "name":"",
            "email":"",
            "password":"",
            "mobile":"",
            "car": "",
            "from":"",
            "to": ""
        }

    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition((loc)=>{
            this.setState({location:loc});
        })
    }
    render() {
        return (
            <div className="page">
            <Header title="Register with App"/>
            <MuiThemeProvider>
            <div className="App">
            <main className="login-Container">

                    <div className="flexItems">
                        <TextField
                            hintText="Enter your Name"
                            floatingLabelText="Full Name"
                            onChange = {(event,newValue) => this.setState({name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="Email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your 10 digit mobile number"
                            floatingLabelText="Mobile Number"
                            onChange = {(event,newValue) => this.setState({mobile:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Name of the car you have"
                            floatingLabelText="Car Model"
                            onChange = {(event,newValue) => this.setState({car:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Starting point"
                            floatingLabelText="From"
                            onChange = {(event,newValue) => this.setState({from:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Destination"
                            floatingLabelText="To"
                            onChange = {(event,newValue) => this.setState({to:newValue})}
                        />
                        <br/>
                        <div className="button">
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>

                    </div>
                    <footer className="footer">
                        <span>Already have an account? </span>
                        <Link to="/">Login Now</Link>
                    </footer>

            </main>
            </div>
            </MuiThemeProvider>
            </div>
        );
    }
    handleClick(event){
        var apiBaseUrl = "http://localhost:4000/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload=this.state;
        axios.post(apiBaseUrl+'register', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    console.log("registration successfull");
                    self.props.history.push('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
const style = {
    margin: 15,
};
export default withRouter(Register);