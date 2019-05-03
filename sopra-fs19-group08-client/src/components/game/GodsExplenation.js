import React from 'react';
import styled from "styled-components";
import explanation from "../../views/images/Manual_2.PNG";


const BaseContainer = styled.div`

`;

class GodsExplenation extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <BaseContainer>
                <img src={explanation}></img>
            </BaseContainer>
        );
    }
}
export default GodsExplenation;