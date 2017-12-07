import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import DriverTile from './driverTile'
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Header from "./header";

const $request = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
});

class DriverSearch extends Component {
    constructor(props) {
        super(props);
        var oThis = this;
        this.state = {
            open:false,
            drivers:[],
            pageTitle: "Pick a Ride",
            dataSourceto: [],
            dataSourcefrom: [],
            searchFrom:"",
            searchTo:"",
            selectedDriver:""
        };
        this.drivers = [];
        this.handleClose = () => {
            this.setState({open: false});
        };
        this.handleOpen = () => {
            this.setState({open: true});
        };
        let updateAutoComplete = function(from, to, ds, key){
            $request.get(`/drivers?from=${from || ""}&to=${to || ""}`)
                .then((response)=>{
                    if(response.data.code === 200){
                        let data = response.data.data,
                            autoVal = data.map((obj, i)=>{
                                return obj[key];
                            }),
                            obj = {};
                        obj[`dataSource${key}`] = autoVal;
                        oThis.setState({drivers:response.data.data});
                        //oThis.setState(obj);
                    }
                });
        };
        this.handleUpdateInputTo = (value) => {
            this.setState({
                searchTo: value,
            });
            updateAutoComplete(this.state.searchFrom, value, this.state.dataSourceto, "to")
        };
        this.handleUpdateInputFrom = (value) => {
            this.setState({
                searchFrom: value,
            });
            updateAutoComplete(value, this.state.searchto, this.state.dataSourcefrom, "from")
        };
        this.driverReset = function(avatar, unselect){
            var selectedDriver = oThis.state.selectedDriver;
            if(selectedDriver){
                selectedDriver.setState({tileClass:"driver-tile-container"});
                selectedDriver.setState({avatar:avatar});
            }

            oThis.setState({selectedDriver:!unselect?this:""});

        }
    }
    componentWillMount(){
        $request.get(`/drivers`)
            .then((response)=>{
                if(response.data.code === 200)
                    this.setState({drivers:response.data.data});
            })
    }
    render() {
        const actions = [
            <RaisedButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div className="page">
            <Header title={this.state.pageTitle} logout={true}/>
            <MuiThemeProvider>
                <div className="App">
                <main className="login-Container">
                    <div className="search-box">
                        <div className="one">
                            <AutoComplete
                                floatingLabelText="Start From"
                                dataSource={this.state.dataSourcefrom}
                                onUpdateInput={this.handleUpdateInputFrom}
                                searchText={this.state.searchFrom}
                            />
                            <br/>
                        </div>
                        <div className="two">
                            <AutoComplete
                                floatingLabelText="Destination"
                                dataSource={this.state.dataSourceto}
                                onUpdateInput={this.handleUpdateInputTo}
                                searchText={this.state.searchTo}
                            />
                            <br/>
                        </div>
                        {this.state.drivers.map((obj, i)=>{
                            return <DriverTile data={obj} key={i} clickTile={this.driverReset} ref={(obj)=> this.drivers.push(obj)}/>
                        })}
                    </div>
                    <div className="button">
                        <RaisedButton label="Confirm Ride" primary={true} onClick={this.handleOpen}
                                      disabled={!this.state.selectedDriver}
                        />
                    </div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Ride Confirmed (Driver:{this.state.selectedDriver?this.state.selectedDriver.props.data.name:""})
                    </Dialog>
                </main>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}

export default DriverSearch;
