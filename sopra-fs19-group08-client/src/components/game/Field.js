import React from "react";
import styled from "styled-components";
import fig_pl1 from "../../views/images/figure_player1.png";
import fig_pl2 from "../../views/images/figure_player2.png";
import dome from "../../views/images/dome.png";

import block1 from '../../views/images/block1.png';
import block1_player1 from '../../views/images/block1_player1.png';
import block1_player2 from '../../views/images/block1_player2.png';
import block1_dome from '../../views/images/block1_dome.png';

import block2 from '../../views/images/block2.png';
import block2_player1 from '../../views/images/block2_player1.png';
import block2_player2 from '../../views/images/block2_player2.png';
import block2_dome from '../../views/images/block2_dome.png';

import block3 from '../../views/images/block3.png';
import block3_player1 from '../../views/images/block3_player1.png';
import block3_player2 from '../../views/images/block3_player2.png';
import block3_dome from '../../views/images/block3_dome.png';
import {getDomain} from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";



const PopupContainer = styled.div`
    border: 1px aqua solid;
    border-radius: 10px;
    height: 15%;
    width: 16%;
    float: left;
    margin-right: 4%;
    margin-left: 0%;
    margin-bottom: 4%;
    text-align: center;
    padding-top: 3%;
    flex-direction: column;
`;

const Popup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: -50px;
  margin-left: -50px;
  position: center;
  width: 150px;
  height: 150px;
  background: linear-gradient(rgb(128,128,128,0.6), rgba(0,0,0));
  flex-direction: column;
  border-radius: 10px;
`;


const FieldContainer = styled.div`
    border: 1px aqua solid;
    border-radius: 10px;
    height: 15%;
    width: 16%;
    float: left;
    margin-right: 4%;
    margin-left: 0%;
    margin-bottom: 4%;
    text-align: center;
    padding-top: 3%;
    
    :hover{
      background-color: gold;
      opacity: 0.4;
      }
      
    img {
      max-width: 40%;
      max-height: 90%;
     }
`;

class Field extends React.Component {
    constructor(){
        super();
        this.state = {
            isSelected: false,
            buildingLevel: 0,
            hasDome: false,
            gameboard: null,
            user: null,
            SetWorkerPopup: false
        };
    }

    componentDidMount() {
        this.setState({gameboard: this.props.gameboard}, () => {
                this.setFieldData();
        });



    }

    componentWillReceiveProps(newProps) {
        this.setState({gameboard: newProps.gameboard}, () => {
                this.setFieldData();
        });

    }

    setWorker() {

        // check if gameStatus and playerStatus match, if so, make POST request to set the workers
        if (this.checkPlayerStatus()) {

            fetch(`${getDomain()}/setup/${localStorage.getItem("userId")}/workers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    xCoordinate: this.props.x,
                    yCoordinate: this.props.y
                })
            })
                .then(response => {
                    if (response.status === 500) {
                        alert("Not possible to set workers");
                    } else if (response.status === 200) {
                        console.log("worker set!");
                    } else {
                        console.log("HTTP status: " + response.status);
                    }
                })
                .catch(err => {
                    if (err.message.match(/Failed to fetch/)) {
                        alert("The server cannot be reached. Did you start it?");
                    } else {
                        alert(`Something went wrong during the login: ${err.message}`);
                    }
                });

        }

    }


    toggleSetWorkerPopup() {
        this.setState({SetWorkerPopup: !this.state.SetWorkerPopup});
    }

    checkPlayerStatus(){
        // for setWorker
        // checks if gameStatus and playerStatus match, returns boolean

        let userId = localStorage.getItem("userId");
        let playerStatus;
        let x = this.props.x;
        let y = this.props.y;

        // find out if logged in player is Player1 or Player2
        if (this.state.gameboard){
            for (let i=0; i<this.state.gameboard.players.length; i++) {
                if (this.state.gameboard.players[i].playerStatus === "Player1" &&
                    this.state.gameboard.players[i].id == userId) { // == is on purpose
                    playerStatus = "Player1";
                } else if (this.state.gameboard.players[i].playerStatus === "Player2" &&
                    this.state.gameboard.players[i].id == userId) { // == is on purpose
                    playerStatus = "Player2";
                }
            }}

        if (((this.state.gameboard.gameStatus==="Player1SetWorkersOrSelectGodcard" || this.state.gameboard.gameStatus==="Player1SetWorkers") && playerStatus==="Player1") ||
            (this.state.gameboard.gameStatus==="Player2SetWorkers" && playerStatus==="Player2")) {
            return true;
        } return false;
    }


    render() {

        // Set workers
        if(this.state.gameboard) {
            if (this.state.gameboard.gameStatus === "Player1SetWorkersOrSelectGodcard" || this.state.gameboard.gameStatus === "Player2SetWorkers" || this.state.gameboard.gameStatus === "Player1SetWorkers") {
                // if field is unoccupied, make it clickable and call setWorker on click
                if (this.state.user === null) {
                    return (
                        (!this.state.SetWorkerPopup && this.checkPlayerStatus()) ? // if no popup and playerStatus is correct (i.e. it's your turn)
                            <FieldContainer onClick={() => {
                                this.toggleSetWorkerPopup();
                            }}/>
                            :
                            <PopupContainer>
                                {(this.state.SetWorkerPopup && this.checkPlayerStatus()) ? // if popup shall be displayed and playerStatus is correct
                                    <Popup>place your worker here?
                                        <Button
                                            width="70%"
                                            onClick={() => {
                                                this.setWorker();
                                                this.toggleSetWorkerPopup()
                                            }}>Set worker</Button>
                                        <Button
                                            width="70%"
                                            onClick={() => {
                                                this.toggleSetWorkerPopup()
                                            }}>cancel</Button>
                                    </Popup>
                                    : null}
                            </PopupContainer>
                    );
                }
                // display figures if field is occupied
                else if (this.state.user.playerStatus === "Player1") {
                    return (<FieldContainer><img alt={"resource missing"} src={fig_pl1}/></FieldContainer>);
                } else if (this.state.user.playerStatus === "Player2") {
                    return (<FieldContainer><img alt={"resource missing"} src={fig_pl2}/></FieldContainer>);
                }
            }
        }


            if (this.state.buildingLevel === 0 || this.state.buildingLevel === null) {
                if (this.state.hasDome) {
                    return (<FieldContainer><img alt={"resource missing"} src={dome}/></FieldContainer>); // dome is set
                } else if (this.state.user === null) {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}></FieldContainer>);
                } else if (this.state.user.playerStatus === "Player1") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}} ><img alt={"resource missing"} src={fig_pl1}/></FieldContainer>); // player 1 figure
                } else if (this.state.user.playerStatus === "Player2") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={fig_pl2}/></FieldContainer>); // player 2 figure
                } else {
                    return (<FieldContainer></FieldContainer>);
                }


            } else if (this.state.buildingLevel === 1) {
                if (this.state.hasDome) {
                    return (<FieldContainer><img alt={"resource missing"} src={block1_dome}/></FieldContainer>); // dome is set
                } else if (this.state.user === null) {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block1}/></FieldContainer>);
                } else if (this.state.user.playerStatus === "Player1") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block1_player1}/></FieldContainer>); // player 1 figure
                } else if (this.state.user.playerStatus === "Player2") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block1_player2}/></FieldContainer>); // player 2 figure
                } else {
                    return (<FieldContainer></FieldContainer>);
                }


            } else if (this.state.buildingLevel === 2) {
                if (this.state.hasDome) {
                    return (<FieldContainer><img alt={"resource missing"} src={block2_dome}/></FieldContainer>); // dome is set
                } else if (this.state.user === null) {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block2}/></FieldContainer>);
                } else if (this.state.user.playerStatus === "Player1") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block2_player1}/></FieldContainer>); // player 1 figure
                } else if (this.state.user.playerStatus === "Player2") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block2_player2}/></FieldContainer>); // player 2 figure
                } else {
                    return (<FieldContainer></FieldContainer>);
                }


            } else if (this.state.buildingLevel === 3) {
                if (this.state.hasDome) {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block3_dome}/></FieldContainer>); // dome is set
                } else if (this.state.user === null) {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block3}/></FieldContainer>);
                } else if (this.state.user.playerStatus === "Player1") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block3_player1}/></FieldContainer>); // player 1 figure
                } else if (this.state.user.playerStatus === "Player2") {
                    return (<FieldContainer onClick={() => {this.props.menu(this.props.x, this.props.y, this.state.user)}}><img alt={"resource missing"} src={block3_player2}/></FieldContainer>); // player 2 figure
                } else {
                    return (<FieldContainer></FieldContainer>);
                }
            }


            return (<FieldContainer></FieldContainer>); // return empty field if none of the cases above is matched
    }

    setFieldData(){

        let fields = this.state.gameboard.fields;
        let xCord = this.props.x;
        let yCord = this.props.y;

        for (let i=0; i<fields.length; i++){

            let field = fields[i];



            if (field.xCoordinate === xCord && field.yCoordinate === yCord) {
                let user = null;

                for (let i=0; i<this.state.gameboard.players.length; i++) {
                    if (this.state.gameboard.players[i].id === field.playerId) {
                        user = this.state.gameboard.players[i];
                    }
                }

                this.setState({
                    buildingLevel: field.buildingLevel,
                    hasDome: field.hasDome,
                    user: user
                });
            }
            

        }




    }

}
export default Field;