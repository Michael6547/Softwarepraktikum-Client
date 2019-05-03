import React from "react";
import styled from "styled-components";
import fig_pl1 from "../../views/images/figure_player1.png";
import fig_pl2 from "../../views/images/figure_player2.png";
import Apollo from '../../views/images/apollo.png';
import Artemis from '../../views/images/artemis.png';
import Athena from '../../views/images/athena.png';
import Atlas from '../../views/images/atlas.png';
import Demeter from '../../views/images/demeter.png';
import Pan from '../../views/images/pan.png';
import Prometheus from '../../views/images/prometheus.png';
import Hephaestus from '../../views/images/hephaestus.png';
import Hermes from '../../views/images/hermes.png';
import Minotaur from '../../views/images/minotaur.png';


const PlayerInformationContainer = styled.div`
    height: 40%;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px;
    font-weight: bold;
    display: flex;
    align-content: start;
    background: rgba(0,0,0,0.2);
    border-radius: 10px;
`;

const Figure_pl1 = styled.div`
    height: 40%;
    width: 40%;
    background-image: url(${fig_pl1});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 10px;
`;

const Figure_pl2 = styled.div`
    height: 40%;
    width: 40%;
    background-image: url(${fig_pl2});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 10px;
`;

const UsernameContainer = styled.div`
    height: 20%;
    width: 100%;
    font-size: 25px;
    margin: 5px;
`;

const Godcard = styled.div`
    background-image: url(${props => props.img});
    background-size: contain;
    background-repeat: no-repeat;
    height: 40%;
    width: 40%;
    margin: 10px;
`;


class PlayerInformation extends React.Component {
    constructor() {
        super();
        this.state = {
            gameboard: null,
            username: "",
            godcardPlayer1: null,
            godcardPlayer2: null
        };
    }

    async componentDidMount() {
        await this.setState({gameboard: this.props.gameboard}, () => {
            this.setInformation();
            console.log("1");
        });
        this.setInformation();
    }

    async componentWillReceiveProps(newProps) {
        await this.setState({gameboard: newProps.gameboard}, () => {
            this.setInformation();
            // console.log("2 " + this.state.gameboard.players[0].godCard.name.toLowerCase());
        });
        this.setInformation();
    }


    setInformation() {

        let gods = [Apollo, Artemis, Athena, Atlas, Demeter, Pan, Prometheus, Hephaestus, Hermes, Minotaur];

        if (this.state.gameboard && !this.state.godcardPlayer1) {
            if (this.state.gameboard.players[0].playerStatus===this.props.Status) {   // if player1
                this.setState({username: this.props.gameboard.players[0].playerName});

                if (this.state.gameboard.players[0].godCard.name && !this.state.godcardPlayer1) { // if godCard exists
                    // iterate through urls of gods and check if the url includes the name of the godCard
                    for (let i=0; i<gods.length; i++) {
                        if(gods[i].includes(this.state.gameboard.players[0].godCard.name.toLowerCase())) {
                            // set the respective url of the image as the state
                            this.setState({godcardPlayer1: gods[i]});
                        }
                    }
                }

            } else if (!this.state.godcardPlayer2) {    // if player2
                this.setState({username: this.props.gameboard.players[1].playerName});
                if (this.state.gameboard.players[0].godCard.name) {
                    for (let i=0; i<gods.length; i++) {
                        if(gods[i].includes(this.state.gameboard.players[1].godCard.name.toLowerCase())) {
                            this.setState({godcardPlayer2: gods[i]});
                        }
                    }
                }
            }
        }
    }


    render() {
        if (this.state.gameboard) {
            // console.log(this.state.godcardPlayer1);
            if (this.props.Status==="Player1") {
                return (
                    <PlayerInformationContainer>
                        <UsernameContainer>{this.props.Status + ": " + this.state.username}</UsernameContainer>
                            <Figure_pl1/>
                        {this.state.godcardPlayer1 ?
                            <Godcard img={this.state.godcardPlayer1}/> : null
                        }
                    </PlayerInformationContainer>
            ); } else if (this.props.Status==="Player2") {
                return (
                    <PlayerInformationContainer>
                        <UsernameContainer>{this.props.Status + ": " + this.state.username}</UsernameContainer>
                        <Figure_pl2/>
                        {this.state.godcardPlayer2 ?
                            <Godcard img={this.state.godcardPlayer2}/> : null
                        }
                    </PlayerInformationContainer>
                );
            }
        }
        return null;
    }


}

export default PlayerInformation;