import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {withRouter} from "react-router-dom";
import gameboard from "../../views/images/boardonly_2.png";
import Field from "./Field";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
import {Button} from "../../views/design/Button";
import MenuBackground from "../../views/images/Pergament.png";

const MenuContainer = styled.div`
  height:100%;
  width: 85%;
  position: relative;
  left: 10px;
  font-size: 22px;
  text-align: center;
  background-image: url(${MenuBackground});
  background-size: contain;
  background-repeat: no-repeat;
`;

const TitleContainer = styled.div`
    height: 20%;
    width: 100%;
    font-size: 25px;
    padding-top: 20px;
`;


const ButtonContainer = styled.div`
  display: block;
  justify-content: left;
  margin: 50px;
`;




class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            //decides which actions are possible
            fromField: {xCoordinate: null, yCoordinate: null},
            toField: {xCoordinate: null, yCoordinate: null},
            canMove: false,
            canBuild: false,
            gameboard: null,
            validActions: null
        }
    }


    async componentDidMount() {
        await this.setState({gameboard: this.props.gameboard});
        await this.setState({fromField: this.props.fromField});
        await this.setState({toField: this.props.toField});
        console.log("Menu opened");
        await this.showPossibleActions();
    }

    async showPossibleActions() {
        // TODO: change states according to valid actions (from props)
        console.log("opened showAction function");
        let counter;
        //check if move is valid
        if (this.state.fromField != null) {
            //make sure that fields are selected
            let response = await fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}/validMoves`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fromField: this.state.fromField,
                    toField: this.state.toField

                })
            });
            if (response.status === 200) {
                let json = await response.json();
                await this.setState({validActions: json.validActions});
                console.log("fetch successful");
                //iterate through all possible actions
                console.log(this.state.validActions);
                for (counter = 0; counter < this.state.validActions.length; counter++) {
                    console.log("valid actions:");
                    console.log(this.state.validActions[counter].typeOfAction + "\n");
                    switch (this.state.validActions[counter].typeOfAction) {
                        case "Move":
                            this.setState({canMove: true});
                            console.log("Player can move");
                            break;
                        case "Build":
                            this.setState({canBuild: true});
                            console.log("Player can build");
                            break;
                        default:
                            console.log("No actions possible");
                    }
                }

            } else if (response.status === 500) {
                response.json().then(json => alert(json.status + "\n" + json.message + "\n" + json.path))
            } else {
                throw Error(response.statusText);
            }
        }
    }


// TODO: make POST requests after every action
//ACTION: move selected worker on selected field
    move() {
        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}/action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                typeOfAction: "Move",
                fromField: this.state.fromField,
                toField: this.state.toField
            })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("worker moved!");
                } else if (response.status === 500) {
                    alert("Move not possible!!");
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


//ACTION: build a level 1 block
build() {
    fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}/action`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            typeOfAction: "Build",
            fromField: this.state.fromField,
            toField: this.state.toField
        })
    })
        .then(response => {
            if (response.status === 200) {
                console.log("built!");
            } else if (response.status === 500) {
                alert("build not possible!!");
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


render()
{
    return (
        <MenuContainer>
            <TitleContainer>Menu</TitleContainer>
            <ButtonContainer>
                <Button
                    disabled={!this.state.canMove}
                    width="100%"
                    onClick={() => {
                        this.move();
                    }}>
                    Move!
                </Button>
                <Button
                    disabled={!this.state.canBuild}
                    width="100%"
                    onClick={() => {
                        this.build();
                    }}>
                    Build!
                </Button>
            </ButtonContainer>
        </MenuContainer>
    );
}
}

export default withRouter(Menu);
