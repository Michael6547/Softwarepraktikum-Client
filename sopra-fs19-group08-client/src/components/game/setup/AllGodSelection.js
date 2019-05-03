import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {getDomain} from "../../../helpers/getDomain";
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
import Card from './Card';
import GodsExplenation from "../GodsExplenation";

const BaseContainer = styled.div`
  
`;

const UpperHorizontal = styled.div`
//  border: 3px green solid;
  height: 10vh;
  //display: flex;
  padding-left: 40%;
  padding-top: 10px;
`;

const MiddleHorizontal = styled.div`
//  border: 3px orange solid;
  height: 70vh;
  padding: 10px;
`;

const LowerHorizontal = styled.div`
//  border: 3px darkblue solid;
  height: 20vh;
  text-align: center;
`;

const Instruction = styled.div`
  float: left;
  height: 50px;
  font-size: 30px;
  background-color: rgba(188,225,255,0.3);
  border: 3px solid;
  border-radius: 10px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 150px;
  
`;

const ButtonContainer = styled.div`
  float: ${props => props.float};
//  border: 3px greenyellow solid;
  display: ${props => props.display};
  margin-left: ${props => props.marginLeft};
  
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



const FirstRow = styled.div`
  height: 45%;
//  border: 3px yellow solid;
  margin-bottom: 20px;
  text-align: center;
`;

const SecondRow = styled.div`
  height: 45%;
//  border: 3px maroon solid;
  text-align: center;
`;


const GodsExplenationContainer = styled.div`
  text-align: center;
`;



class AllGodSelection extends React.Component {

    constructor(props) {
        super(props);

        let validId = false;

        if (localStorage.getItem("userId")) { // check if the client has a Id (is the client logged in?)
            validId = true;
        } else {
            validId = false;
        }



        this.state = {
            gameboard: null,
            isPlayer1: false,
            isPlayer2: false,
            hasId: validId,
            card1: null,
            card2: null,
            withoutGods: false,
            nrSelected: 0,
            toTwoCardSelection: false,
            showGodsExplanation: false
        };
    }

    componentWillMount() {



    }

    render() {

         // if (!this.state.hasId){ // if the client is not logged in, go back to login page
         //     return (<Redirect to={"/login"} />);
         // }

        if (this.state.withoutGods){
            return(<Redirect to={"/game"} />);
        }

        if (this.state.toTwoCardSelection){
            return (<Redirect to={"/game/selection2"} />);
        }


         // check if the client is player1, if so then set the state for conditional rendering
        // if (this.state.gameboard && this.state.gameboard.players[0] === localStorage.getItem("userId")) {
        //     this.setState({isPlayer1: true});
        // } else if (this.state.gameboard && this.state.gameboard.players[1] === localStorage.getItem("userId")){
        //     this.setState({isPlayer1: false});
        // }



        // check for changing gamestatus e.g. "Player2SelectGodcard"
        if (this.state.isPlayer2 && this.state.gameboard.gameStatus === "Player2SelectGodcard"){
            this.setState({toTwoCardSelection: true});
        }


        return(
            <BaseContainer>

                <UpperHorizontal>
                    {this.state.gameboard ?
                        <Instruction>{this.state.isPlayer1 ? "Select two cards" : "Wait please ..."}</Instruction>
                        : null}

                    <ButtonContainer float={"left"} marginLeft={"20px"}>
                        <Button
                            borderRadius={"5px"}
                            disabled={!this.state.isPlayer1}
                            onClick={this.withoutGodCards.bind(this)}
                        >Play without God cards</Button>
                    </ButtonContainer>

                    <ButtonContainer float={"left"} marginLeft={"20px"}>
                        <Button
                            borderRadius={"5px"}
                            onClick={this.toggleGodsExplanation.bind(this)}
                        >{!this.state.showGodsExplanation ? "Gods explanation" : "Close explanation"}</Button>
                    </ButtonContainer>
                </UpperHorizontal>

                {!this.state.showGodsExplanation ?
                    <div>
                <MiddleHorizontal>


                        <FirstRow>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Apollo"} src={apollo}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Artemis"} src={artemis}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Athena"} src={athena}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Hephaestus"} src={hephaestus}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Minotaur"} src={minotaur}/>
                        </FirstRow>

                        <SecondRow>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Atlas"} src={atlas}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Demeter"} src={demeter}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Prometheus"} src={prometheus}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Pan"} src={pan}/>
                            <Card isPlayer1={this.state.isPlayer1} nr={this.state.nrSelected} onClick={this.onClickCard.bind(this)} god={"Hermes"} src={hermes}/>
                        </SecondRow>

                </MiddleHorizontal>

                <LowerHorizontal>
                    <ButtonContainer display={"inline-block"} >
                        <Button
                            onClick={this.onClickSubmit.bind(this)}
                            width={"200px"}
                            height={"100px"}
                            borderRadius={"20px"}
                            disabled={!this.state.isPlayer1 || this.state.card1 === null || this.state.card2 === null}
                        >Submit</Button>
                    </ButtonContainer>
                </LowerHorizontal>
                    </div>

                   :
                    <GodsExplenationContainer>
                        <GodsExplenation />
                    </GodsExplenationContainer>}

            </BaseContainer>
        );
    }



    componentDidMount() {

       this.getGameBoard();


        this.intervallId = setInterval(this.getGameBoard.bind(this), 3000);



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


    getGameBoard(){
        // fetch game board from backend and check if the client is player 1
        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200){
                    response.json().then(json => {
                        this.setState({gameboard: json});

                        if (json.players[0].id.toString() === localStorage.getItem("userId")) {
                            if (json.players[0].playerStatus === "Player1" && this.state.isPlayer1 === false) {
                                this.setState({
                                    isPlayer1: true,
                                    isPlayer2: false
                                });
                            } else if (json.players[0].playerStatus === "Player2" && this.state.isPlayer2 === false) {
                                this.setState({
                                    isPlayer1: false,
                                    isPlayer2: true
                                });
                            }

                        } else if (json.players[1].id.toString() === localStorage.getItem("userId")) {
                            if (json.players[1].playerStatus === "Player1" && this.state.isPlayer1 === false) {
                                this.setState({
                                    isPlayer1: true,
                                    isPlayer2: false
                                });
                            } else if (json.players[1].playerStatus === "Player2" && this.state.isPlayer2 === false) {
                                this.setState({
                                    isPlayer1: false,
                                    isPlayer2: true
                                });
                            }

                        }
                        if (json.gameStatus === "Player1SetWorkers"){ // In case Player2 needs to redirect to game if Player1 decided to play without gods.
                            this.setState({withoutGods: true});
                        }



                    });




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

    withoutGodCards(){
        // send information to server for playing game without gods
        console.log("Play without Gods");

        fetch(`${getDomain()}/setup/${localStorage.getItem("userId")}/godCards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(["Basic", "Basic"])
        })
            .then(response => {
                if(response.status === 200){

                    this.setState({toTwoCardSelection: true});
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


        // set state for redirecting
        this.setState({withoutGods: true});
    }

    onClickCard(card){
        if (this.state.nrSelected === 0){
            this.setState({card1: card});
        }
        if (this.state.nrSelected === 1){
            this.setState({card2: card});
        }

        let n = this.state.nrSelected + 1;
        this.setState({nrSelected: n});

    }

    onClickSubmit(){
        console.log("Card1: " + this.state.card1 + "\nCard2: " + this.state.card2);

        fetch(`${getDomain()}/setup/${localStorage.getItem("userId")}/godCards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([this.state.card1, this.state.card2])
        })
            .then(response => {
                if(response.status === 200){

                    this.setState({toTwoCardSelection: true});
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


}

export default AllGodSelection;