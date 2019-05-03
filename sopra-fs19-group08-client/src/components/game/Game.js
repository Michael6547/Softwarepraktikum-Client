import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {withRouter} from "react-router-dom";
import gameboard from "../../views/images/boardonly_2.png";
import Field from "./Field";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
//import {Button} from "../../views/design/Button";
import Manual from "../../../src/views/images/Manual_1.PNG";
import PlayerInformation from "./PlayerInformation";
import Menu from "./Menu";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  margin-top: 5px;
`;


const FieldsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
  text-align: left;
  padding-top: 9%;
  padding-left: 8%;
`;


const GameContainer = styled.div`
  align-items: center;
  float: left;
  display: inline-block;
  height: 100vh;
`;

const LeftSideContainer = styled.div`
  border: 3px azure solid;
  height: 100%;
  width: 30%;
  float: left;
  font-size: 18px;
`;

const CenterContainer = styled.div`
  border: 3px rosybrown solid;
  float: left;
  height: 100%;
  width: 40%;
`;

const RightSideContainer = styled.div`
  border: 3px greenyellow solid;
  float: left;
  width: 30%;
  height: 100%;
`;

const TurnContainer = styled.div`
  background-color: rgba(188,225,255,0.3);
  border: 3px solid;
  border-radius: 10px;
  height: 10%;
  padding-top: 3%;
  margin-bottom: 5px;
  font-size: 18px;
  text-align: center;
  
  button {
    float: right;
    margin-right: 3%;
    position: fixed;
    
    };
`;
const GameManualContainer = styled.div`
  position: center;
  height: 100%;
  width: 100%;
  background: url(${Manual});
  background-size: cover;
  `;

const GameBoardContainer = styled.div`
  background-image: url(${gameboard});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 80%;
  width: 100%;
  padding: 0px;
  //height: 876px;
  //width: 812px;
  border: 3px blue solid;
  text-align: center;
    
`;

const ButtonContainer = styled.div`
  float: ${props => props.float};
//  border: 3px greenyellow solid;
  display: ${props => props.display};
  margin-left: ${props => props.marginLeft};
  margin: 10px;
  height: 5%;
  align-content: center;
`;

const Button = styled.button`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  border-radius: ${props => props.borderRadius};
  padding: 6px;
  font-weight: 700;
//  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  border: none;
//  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: #b6f3ff;
  transition: all 0.3s ease;
  box-shadow: 3px 6px;
  float: left;
  &:hover {
    transform: translateY(-2px);
  }
`;
const MenuContainer = styled.div`
width: 100%;
height: 55%;
`;

const CloseMenuContainer =styled.div`
width: 100%;
text-align: right;
height: 5%;
float: right;
`;

const CloseMenu = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: orangered;
  background-size: cover;
`;

class Fields extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            gameboard: null,
            workerSelected: false,
            workerAndFieldSelected: false
        };

    }

    componentDidMount() {
        this.setState({gameboard: this.props.gameboard});
    }

    componentWillReceiveProps(newProps) {
        this.setState({gameboard: newProps.gameboard});
    }

    render() {

        if (this.state.gameboard) {

            let gb = this.state.gameboard;

            return (
                <FieldsContainer>
                    <Field menu={this.props.menu} gameboard={gb} x={0} y={0}/><Field menu={this.props.menu}
                                                                                     gameboard={gb} x={1} y={0}/><Field
                    menu={this.props.menu} gameboard={gb} x={2}
                    y={0}/><Field menu={this.props.menu}
                                  gameboard={gb} x={3} y={0}/><Field menu={this.props.menu} gameboard={gb} x={4} y={0}/>
                    <Field menu={this.props.menu} gameboard={gb} x={0} y={1}/><Field menu={this.props.menu}
                                                                                     gameboard={gb} x={1} y={1}/><Field
                    menu={this.props.menu} gameboard={gb} x={2}
                    y={1}/><Field menu={this.props.menu}
                                  gameboard={gb} x={3} y={1}/><Field menu={this.props.menu} gameboard={gb} x={4} y={1}/>
                    <Field menu={this.props.menu} gameboard={gb} x={0} y={2}/><Field menu={this.props.menu}
                                                                                     gameboard={gb} x={1} y={2}/><Field
                    menu={this.props.menu} gameboard={gb} x={2}
                    y={2}/><Field menu={this.props.menu}
                                  gameboard={gb} x={3} y={2}/><Field menu={this.props.menu} gameboard={gb} x={4} y={2}/>
                    <Field menu={this.props.menu} gameboard={gb} x={0} y={3}/><Field menu={this.props.menu}
                                                                                     gameboard={gb} x={1} y={3}/><Field
                    menu={this.props.menu} gameboard={gb} x={2}
                    y={3}/><Field menu={this.props.menu}
                                  gameboard={gb} x={3} y={3}/><Field menu={this.props.menu} gameboard={gb} x={4} y={3}/>
                    <Field menu={this.props.menu} gameboard={gb} x={0} y={4}/><Field menu={this.props.menu}
                                                                                     gameboard={gb} x={1} y={4}/><Field
                    menu={this.props.menu} gameboard={gb} x={2}
                    y={4}/><Field menu={this.props.menu}
                                  gameboard={gb} x={3} y={4}/><Field menu={this.props.menu} gameboard={gb} x={4} y={4}/>
                </FieldsContainer>
            );
        }
        return null;
    }


}


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            player1workers: null,
            player2workers: null,
            gameboard: null,
            isMyTurn: false,
            showGameManual: false,
            showGameMenu: false,
            fromField: {xCoordinate: null, yCoordinate: null},
            toField: {xCoordinate: null, yCoordinate: null}
        };
    }

    //show gameManual
    gameManual() {
        if (!this.state.showGameManual) {
            this.setState({showGameManual: true});
        } else {
            this.setState({showGameManual: false});
        }
    }


    componentWillMount() {


    }


    componentDidMount() {

        // analyze the content of gameboard and update field
        this.intervallId = setInterval(this.updateGame.bind(this), 3000);
        this.updateGame(); // inital update (to avoid a lag)

        //check if someone won
        //check if someone surrendered
        //check if you have to set Worker
        //Check if you have to select godcard
        //check if it's your turn
        //always update again after action is done!

    }

    componentWillUnmount() {
        clearInterval(this.intervallId);
    }

    render() {
        if (this.state.showGameManual) {
            return (<GameContainer>

                    <LeftSideContainer>
                        <PlayerInformation gameboard={this.state.gameboard} Status={"Player1"}/>


                    </LeftSideContainer>
                    <CenterContainer>


                        <TurnContainer>
                            Is there a gameboard? {this.state.gameboard ? "yes" : "no"}.
                            <button>End Turn</button>
                        </TurnContainer>
                        <GameManualContainer/>


                    </CenterContainer>

                    <RightSideContainer>

                        <PlayerInformation gameboard={this.state.gameboard} Status={"Player2"}/>

                        <Button
                            width="100%"
                            onClick={() => {
                                this.gameManual();
                            }}
                        >
                            Game Manual
                        </Button>
                    </RightSideContainer>

                </GameContainer>


            );
        }
        return (
            <GameContainer>

                <LeftSideContainer>
                    <PlayerInformation gameboard={this.state.gameboard} Status={"Player1"}/>
                    {this.state.showGameMenu ?
                        <MenuContainer>
                        <CloseMenuContainer>
                        <CloseMenu onClick={()=>{this.setState({showGameMenu: false})}}/>
                    </CloseMenuContainer>
                            <Menu gameboard={this.state.gameboard}
                                  fromField={this.state.fromField}
                                  toField={this.state.toField}>
                            </Menu>

                    </MenuContainer>
                            : null
                    }
                </LeftSideContainer>
                <CenterContainer>
                    <TurnContainer>
                        Game status: {this.state.gameboard ? this.state.gameboard.gameStatus : "No Status ERROR!!!"}.
                        <ButtonContainer display={"inline-block"}>
                            <Button
                                onClick={() => {
                                    this.setState({showGameMenu: false});
                                    this.setState({fromField: null});
                                    this.setState({toField: null});
                                    this.endTurn();
                                }}
                                borderRadius={"5px"}
                            >End Turn</Button>
                        </ButtonContainer>
                    </TurnContainer>

                    <GameBoardContainer>
                        <Fields menu={this.openMenu.bind(this)} gameboard={this.state.gameboard}/>
                    </GameBoardContainer>

                </CenterContainer>

                <RightSideContainer>

                    <PlayerInformation gameboard={this.state.gameboard} Status={"Player2"}/>

                    <ButtonContainer>
                        <Button
                        width="50%"
                        onClick={() => {
                            this.gameManual();
                        }}
                    >
                        Game Manual
                    </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button
                        width="50%"
                        margin="10px"
                        onClick={() => {
                            this.fastForward();
                        }}
                    >Fast forward >>></Button>
                    </ButtonContainer>


                </RightSideContainer>

            </GameContainer>

        );
    }

    endTurn() {
        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}/action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                typeOfAction: "EndTurn",
                fromField: this.state.fromField,
                toField: this.state.toField
            })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("turn ended!");
                } else if (response.status === 500) {
                    console.log("EndTurn not possible!!");
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


    openMenu(x, y, user) {

        let playerId = localStorage.getItem("userId");
        let field = {xCoordinate: x, yCoordinate: y};


        // worker selection
        if (user) {
            //check if it's the own worker
            if (user.id == playerId) {
                // worker is selected
                this.setState({fromField: field});
            } // TODO: highlight possible fields
        }
        // field selection
        else if (this.state.fromField) {

            this.setState({toField: field});
            this.setState({showGameMenu: true});
        }
    }


    fastForward(){
        // TODO: fetch fastforward endpoint
        fetch(`${getDomain()}/fastforward/${localStorage.getItem("userId")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status != 200) {
                    console.log("something went wrong with fastforward");
                }
            })
    }


    updateGame() {

        // fetch game board from backend
        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(json => {
                        this.setState({gameboard: json}, () => {
                        });
                    })
                } else if (response.status === 404) {
                    response.json().then(json => alert(json.status + "\n" + json.message + "\n" + json.path))
                } else {
                    throw Error(response.statusText);
                }


            })


            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during fetching the game board from server: ${err.message}`);
                }
            });


    }

}

export default withRouter(Game);
