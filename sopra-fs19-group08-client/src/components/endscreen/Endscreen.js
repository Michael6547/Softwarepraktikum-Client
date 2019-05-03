import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import Background from "../../views/images/Endscreen_2.jpg";
import Game from "../../components/game/Game";
import {getDomain} from "../../helpers/getDomain";
import Redirect from "react-router-dom/es/Redirect";

const BackgroundContainer = styled.div`
  background-image: url( ${Background});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: normal;
  html {height: 100%;
  }, body {
    height: 100vh;
  }
`;

const Title = styled.div`
width: 100px;
height: 100px;
font-size: xx-large;
text-align: center;
margin: 120% auto;
`;
const ButtonContainer = styled.div`
height: 10%;
width:120%;
position: relative;
`;

class Endscreen extends React.Component {
    constructor() {
        super();
        this.state = {
            gameboard: null,
            winner: null
        };
    }

    async updateGameboard() {
        //update gameboard
        console.log(localStorage.getItem("userId"));
        let response = await fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        if (response.status === 200) {
            console.log("gameboard found");
            let json = await response.json();
            await this.setState({gameboard: json});
            console.log("after fetch:");
            console.log(this.state.gameboard.gameStatus);
        } else if (response.status === 404) {
            response.json().then(json => alert(json.status + "\n" + json.message + "\n" + json.path))
        } else {
            throw Error(response.statusText);
        }
        //get the winner
        if (this.state.gameboard) {
            console.log("has won:");
            console.log(this.state.gameboard.gameStatus);
            if(this.state.gameboard.gameStatus == "Player1Won"){
                this.setState({winner:this.state.gameboard.players[0].playerName});
            }
            else if(this.state.gameboard.gameStatus == "Player2Won"){
                this.setState({winner:this.state.gameboard.players[1].playerName})
            }
        }
    }

    rematch() {
        return (
            <Redirect to={"/lobby"}/>
        )
    }

    logout() {
        //TODO: Delete user
        localStorage.removeItem("userId");
        return (
            <Redirect to={"/login"}/>
        );
    }

    async componentDidMount() {
        await this.updateGameboard();

        // this.setState({gameboard: this.props.gameboard});

    }

    /*componentWillReceiveProps(newProps) {
        this.setState({gameboard: newProps.gameboard});
        this.setState({winner: this.gameboard.gameStatus});
        console.log("winner:");
        console.log(this.winner);
    }*/

    render() {
        return (
            <BackgroundContainer>
                <BaseContainer>
                    <Title>
                        {console.log("show text:")}
                        CONGRATULATIONS! {this.state.winner} has won!
                    </Title>
                    <ButtonContainer>
                        <Button
                            width="100%"
                            margin="15px"
                            onClick={() => {
                                this.rematch();
                            }}>
                            Return to Lobby!
                        </Button>
                        <Button
                            width="100%"
                            margin="15px"
                            onClick={() => {
                                this.logout();
                            }}>
                            Logout!
                        </Button>
                    </ButtonContainer>
                </BaseContainer>
            </BackgroundContainer>

        );
    }
}


export default Endscreen;