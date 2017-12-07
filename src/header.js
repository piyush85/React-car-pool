import React, { Component } from 'react';
import './App.css';
import Avatar from 'material-ui/Avatar';
import logo from './images/carlogo.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <header className="header">
                    <div className="header-flex-box-fixed"><Avatar  src={logo} /></div>
                    <div className="header-flex-box">
                        <div className="max-width-item">{this.props.title}</div>
                        <div>{this.props.logout?<Link to="/">Logout</Link>:""}</div>
                    </div>
                </header>
            </MuiThemeProvider>
        );
    }

}
export default Header;