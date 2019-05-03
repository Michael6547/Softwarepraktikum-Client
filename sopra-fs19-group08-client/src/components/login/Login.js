import React from "react";
import styled from "styled-components";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import  Background  from "../../views/images/backgroundLogin.jpg";
import Redirect from "react-router-dom/es/Redirect";




const BackgroundContainer = styled.div`
  background-image: url( ${ Background });
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: normal;
  html {height: 100%;
  }, body {
    height: 100vh;
  }
`;

const FormContainer = styled.div`
  margin-top: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 50px;
  padding-right: 100px;
  border-radius: 5px;
  background: linear-gradient(rgb(33,33,33), rgba(0,10,255,0));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Title = styled.div`
  color: black;
  font-size: 80px;
  padding-top: 100px;
  margin-left: 100px;
  font-weight: bold;
`;


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  height: 35px;
  width: 150px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255,255,255,0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      playerName: null,
      userId: null,
      toLobby: false
    };
  }


  login() {
    fetch(`${getDomain()}/players/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerName: this.state.playerName,
      })
    })
      .then(response => {
          if(response.status === 201){
              response.json().then((json) => {
                  this.setState({userId: json.playerId});
                  localStorage.setItem("userId", this.state.userId);
                  this.setState({toLobby: true});
              });
          }
          else if (response.status === 409) {
              alert("Username already exists test!")
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


  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }


  componentDidMount() {}

  render() {
      if (this.state.toLobby){
          return (
          <Redirect to={"/lobby"} />
          )
      }


    return (
            <BackgroundContainer>
            <FormContainer>
              <Form>
                  <Label>Choose a Username!</Label>
                <InputField
                    placeholder="Enter here..."
                    onKeyPress={event => {
                        if (event.key === "Enter"){
                            this.login();
                        }
                    }}
                    onChange={e => {
                      this.handleInputChange("playerName", e.target.value);
                    }}
                />
                <ButtonContainer>
                  <Button
                      disabled={!this.state.playerName}
                      width="100%"
                      onClick={() => {
                        this.login();
                      }}
                  >
                    Start
                  </Button>
                </ButtonContainer>
              </Form>
            </FormContainer>
            <Title>Santorini - Webapp</Title>
            </BackgroundContainer>
          );
  }
}



export default withRouter(Login);
