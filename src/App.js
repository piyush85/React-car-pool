import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Header from "./header";

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            pageTitle: "Login To App"
        }
    }
    render() {
        return (
            <div className="page">
                <Header title={this.state.pageTitle}/>
                <div className="App"><Login/></div></div>
        );
    }
}
export default App;
