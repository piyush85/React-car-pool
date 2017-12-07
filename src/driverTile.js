import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import avatar from './images/avatar.png';
import tick from './images/tick.png';

class DriverTile extends Component {
    constructor(props) {
        super(props);
        var oThis = this;
        this.state = {
            name:"",
            distance:"",
            route:"",
            car:"",git checkout --orphan latest_branch
            seats:"",
            avatar: avatar,
            tileClass:"driver-tile-container"
        };
        this.driverClicked = function(){
            oThis.props.clickTile.call(oThis,avatar,false);
            var tileClassSelected = (oThis.state.tileClass.indexOf("selected") > -1);
            if(tileClassSelected){
                oThis.setState({tileClass:"driver-tile-container"});
                oThis.setState({avatar:avatar});
                oThis.props.clickTile.call(oThis,avatar,true);
            }
            else{
                oThis.setState({tileClass:"driver-tile-container-selected"});
                oThis.setState({avatar:tick});
            }
        }
    }

    render() {
        return (
            <div className={this.state.tileClass} onClick={this.driverClicked}>
                <div className="flex-box-fixed"><Avatar src={this.state.avatar} /></div>
                <div className="flex-box">
                    <div className="max-width-item">
                        <div>
                            <span className="bold">{this.props.data.name}</span>
                            <span className="short-font"> {`${this.props.data.distance} min(s) away`}</span>
                        </div>
                        <div>
                            <span className="short-font">route: </span>
                            <span className="medium-font">{`${this.props.data.from} to ${this.props.data.to}`}</span>
                        </div>
                        <div>
                            <span className="short-font">car: </span>
                            <span className="medium-font">{this.props.data.car}</span>
                            &nbsp;
                            <span className="short-font">Seats available: </span>
                            <span className="medium-font">{this.props.data.seats}</span>
                        </div>
                    </div>
                    <div className="short-font">4.5 | *</div>
                </div>
            </div>
        );
    }
}


export default DriverTile;
