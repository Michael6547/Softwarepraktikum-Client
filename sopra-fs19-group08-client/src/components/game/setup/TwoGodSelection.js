import React from 'react';
import styled from "styled-components";
import Card from "./Card";
import apollo from '../../../views/images/apollo.png';
import artemis from '../../../views/images/artemis.png';
import athena from '../../../views/images/athena.png';
import atlas from '../../../views/images/atlas.png';
import demeter from '../../../views/images/demeter.png';
import pan from '../../../views/images/pan.png';
import prometheus from '../../../views/images/prometheus.png';
import hephaestus from '../../../views/images/hephaestus.png';
import hermes from '../../../views/images/hermes.png';
import minotaur from '../../../views/images/minotaur.png';
import {getDomain} from "../../../helpers/getDomain";
import { Redirect } from 'react-router-dom';
import GodsExplenation from "../GodsExplenation";



const BaseContainer = styled.div`
`;

const UpperHorizontal = styled.div`
//  border: 3px green solid;
  height: 10vh;
  padding-top: 10px;
  text-align: center;  
`;

const MiddleHorizontal = styled.div`
//  border: 3px orange solid;
  height: 40vh;
  padding: 10px;
`;

const LowerHorizontal = styled.div`
//  border: 3px darkblue solid;
  height: 20vh;
  padding-top: 20px;
  text-align: center;
`;

const Instruction = styled.div`
  float: left;
  height: 70%;
  font-size: 30px;
  background-color: rgba(188,225,255,0.3);
  border: 3px solid;
  border-radius: 10px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
`;

const InstructionContainer = styled.div`
  display: inline-block;
`;

const ButtonContainer = styled.div`
  float: ${props => props.float};
//  border: 3px greenyellow solid;
  display: inline-block;
  margin-left: 20px;
  
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



const Row = styled.div`
  height: 100%;
//  border: 3px yellow solid;
  margin-bottom: 20px;
  text-align: center;
`;

const GodsExplenationContainer = styled.div`
  text-align: center;
`;



class TwoGodSelection extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            gameboard: null,
            toGame: false,
            card1: null,
            card2: null,
            selectedCard: null,
            isPlayer1: false,
            isPlayer2: false,
            showGodsExplanation: false
        };
    }


    render() {

        if (this.state.toGame){
            return (<Redirect to={"/game"} />);
        }

        return(
            <BaseContainer>
                <UpperHorizontal>
                    <InstructionContainer>

                        {this.state.gameboard ?
                            <Instruction>{this.state.isPlayer2 ? "Select one card" : "Wait please ..."}</Instruction>
                            : null}

                    </InstructionContainer>

                    <ButtonContainer>
                        <Button
                            onClick={this.toggleGodsExplanation.bind(this)}
                        >{!this.state.showGodsExplanation ? "Gods explanation" : "Close explanation"}</Button>
                    </ButtonContainer>

                </UpperHorizontal>

                {!this.state.showGodsExplanation ?
                    <div>

                        <MiddleHorizontal>
                            <Row>
                                <Card
                                    onClick={this.onClickCard.bind(this)}
                                    isOneSelected={!!this.state.selectedCard}
                                    isPlayer2={this.state.isPlayer2}
                                    intwoselection={true}
                                    src={this.state.card1}
                                />
                                <Card
                                    onClick={this.onClickCard.bind(this)}
                                    isOneSelected={!!this.state.selectedCard}
                                    isPlayer2={this.state.isPlayer2}
                                    intwoselection={true}
                                    src={this.state.card2}
                                />
                            </Row>
                        </MiddleHorizontal>

                        <LowerHorizontal>
                            <ButtonContainer display={"inline-block"}>
                                <Button
                                    onClick={this.submit.bind(this)}
                                    disabled={!this.state.isPlayer2 || !this.state.selectedCard}
                                    width={"200px"}
                                    height={"100px"}
                                    borderRadius={"20px"}
                                >Submit</Button>
                            </ButtonContainer>
                        </LowerHorizontal>

                    </div> :
                                    <GodsExplenationContainer>
                                        <GodsExplenation />
                                    </GodsExplenationContainer>
                }
            </BaseContainer>
        );
    }

    submit(){
        console.log("Submit god card: " + this.state.selectedCard);

        fetch(`${getDomain()}/setup/${localStorage.getItem("userId")}/godCards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([this.state.selectedCard])
        })
            .then(response => {
                if(response.status === 200){

                    this.setState({toGame: true});
                    console.log("submission successful")

                }

                else {
                    alert("something went wrong!")
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

    onClickCard(cardSrc){
        console.log("onClickCard is called from TwoGodSelection component");

        let card = null;

        if (cardSrc === apollo){
            card = "Apollo";
        } else if (cardSrc === athena){
            card = "Athena";
        } else if (cardSrc === atlas){
            card = "Atlas";
        } else if (cardSrc === artemis){
            card = "Artemis";
        } else if (cardSrc === demeter){
            card = "Demeter";
        } else if (cardSrc === hephaestus){
            card = "Hephaestus";
        } else if (cardSrc === hermes){
            card = "Hermes";
        } else if (cardSrc === minotaur){
            card = "Minotaur";
        } else if (cardSrc === prometheus){
            card = "Prometheus";
        } else if (cardSrc === pan){
            card = "Pan";
        }


        if (!this.state.selectedCard){
            this.setState({selectedCard: card});
            console.log("Selected card: " + card);
        }
    }

    componentDidMount() {
        this.getGameBoardAndUpdateStates();
        this.intervallId = setInterval(this.updateGameStatus.bind(this), 3000);
        this.updateGameStatus();
    }

    componentWillUnmount() {
        clearInterval(this.intervallId);
    }

    toggleGodsExplanation(){
        console.log("Clicked on Gods explanation button!");
        if (!this.state.showGodsExplanation) {
            console.log("open gods explanation");
            this.setState({showGodsExplanation: true});
        } else if (this.state.showGodsExplanation){
            console.log("close gods explanation");
            this.setState({showGodsExplanation: false});
        }
    }

    updateGameStatus(){
        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(json => {

                        console.log("GameStatus:");
                        console.log(json.gameStatus);
                        
                        if (json.gameStatus === "Player1SetWorkers"){
                            this.setState({toGame: true});
                        }

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
    
    

    getGameBoardAndUpdateStates(){

        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(json => {

                        console.log("Fetch gameboard:");
                        console.log(json);
                        this.setState({gameboard: json});
                        this.setCardStates(json);
                        this.setIsPlayerStates(json);

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

    setCardStates(gameboard){
        let c1 = gameboard.godCards[0].name;
        let c2 = gameboard.godCards[1].name;

        let temp1 = null;
        let temp2 = null;

        if (c1 === "Artemis"){
            temp1 = artemis;
        } else if (c1 === "Apollo"){
            temp1 = apollo;
        } else if (c1 === "Hermes"){
            temp1 = hermes;
        } else if (c1 === "Hephaestus"){
            temp1 = hephaestus;
        } else if (c1 === "Atlas"){
            temp1 = atlas;
        } else if (c1 === "Athena"){
            temp1 = athena;
        } else if (c1 === "Pan"){
            temp1 = pan;
        } else if (c1 === "Prometheus"){
            temp1 = prometheus;
        } else if (c1 === "Minotaur"){
            temp1 = minotaur;
        } else if (c1 === "Demeter"){
            temp1 = demeter;
        }


        if (c2 === "Artemis"){
            temp2 = artemis;
        } else if (c2 === "Apollo"){
            temp2 = apollo;
        } else if (c2 === "Hermes"){
            temp2 = hermes;
        } else if (c2 === "Hephaestus"){
            temp2 = hephaestus;
        } else if (c2 === "Atlas"){
            temp2 = atlas;
        } else if (c2 === "Athena"){
            temp2 = athena;
        } else if (c2 === "Pan"){
            temp2 = pan;
        } else if (c2 === "Prometheus"){
            temp2 = prometheus;
        } else if (c2 === "Minotaur"){
            temp2 = minotaur;
        } else if (c2 === "Demeter"){
            temp2 = demeter;
        }

        this.setState({card1: temp1});
        this.setState({card2: temp2});
        console.log("Set card states:\ncard1: " + c1 + "\ncard2: " + c2);
    }

    setIsPlayerStates(gameboard){
        let clientId = parseInt(localStorage.getItem("userId"), 10);

        let id0 = gameboard.players[0].id;
        let status0 = gameboard.players[0].playerStatus;

        let id1 = gameboard.players[1].id;
        let status1 = gameboard.players[1].playerStatus;

        if (clientId === id0){
            if (status0 === "Player1"){
                this.setState({
                    isPlayer1: true,
                    isPlayer2: false
                })
            } else if (status0 === "Player2"){
                this.setState({
                    isPlayer1: false,
                    isPlayer2: true
                })
            }

        } else if (clientId === id1){
            if (status1 === "Player1"){
                this.setState({
                    isPlayer1: true,
                    isPlayer2: false
                })
            } else if (status1 === "Player2"){
                this.setState({
                    isPlayer1: false,
                    isPlayer2: true
                })
            }
        } else {
            console.log("Something went wrong. Could not set player states properly!");
        }

        console.log("Set player states:\nisPlayer1: " + this.state.isPlayer1 + "\nisPlayer2: " + this.state.isPlayer2);

    }

}
export default TwoGodSelection;