import React from "react";
import styled from "styled-components";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Spinner } from "../../views/design/Spinner.js";
import Manual  from "../../../src/views/images/Manual_1.PNG";
import { Redirect } from "react-router-dom";

const FormContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;  
  background-size: cover;
  justify-content: center;
   html {height: 100%;
  }, body {
    height: 100vh;
  }
`;

const MessageBox = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  width: 400px;
  height: 200px;
  font-size: 40px;
  font-weight: 300;
  padding-left: 37px; //distance text to border
  padding-right: 37px;
  border-radius: 500px;
  transition: opacity 0.5s ease, transform 0.5s ease;
  background: linear-gradient(rgb(33,33,33), rgba(0,10,255,0));
  
`;
const GameManual = styled.div` 

  position: center;
  width:600px;
  height:600px;
  background: url(${Manual});
  background-size: cover;
  `;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
class Lobby extends React.Component {
    constructor(){
        super();
        this.state = {
            username: null,
            userId: null,
            gameBoard: null,
            toSelection: false
        };
    }
    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log(userId);
        this.token =localStorage.getItem("token");
        console.log(localStorage.getItem("token"));
    }

    lobby(){

        fetch(`${getDomain()}/gameboard/${localStorage.getItem("userId")}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200){
                    //other player found, redirect to game
                   this.setState({toSelection: true});
                } else if (response.status === 404) {
                    //fetch again after some delay
                    sleep(5000).then(() => {
                        this.lobby();
                    })
                } else {
                    throw Error(response.statusText);
                }
            })
            .catch(err => alert(err.message));
    }


    render() {
        if (this.state.toSelection){
            return (<Redirect
                        to={"/game/selection10"} />);
        }
        return (
            <FormContainer>

                <MessageBox>
                    Waiting for an other Player!
                    {this.lobby()}
                    <Spinner>
                    </Spinner>

                </MessageBox>
                <GameManual>

                </GameManual>

            </FormContainer>

        );
    }
}


export default withRouter(Lobby);
