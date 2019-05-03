import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../game/Game";
import AllGodSelection from "../../game/setup/AllGodSelection";
import TwoGodSelection from "../../game/setup/TwoGodSelection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Game />}
        />

        <Route
          exact
          path={`${this.props.base}/selection10`}
          render={() => <AllGodSelection />}
        />

          <Route
              exact
              path={`${this.props.base}/selection2`}
              render={() => <TwoGodSelection />}
          />

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
