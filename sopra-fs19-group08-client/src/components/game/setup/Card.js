import React from 'react';
import styled from "styled-components";


const CardContainer = styled.div`
  display: inline-block;
  border: ${props => props.isSelected && props.allowed ? "orange dashed" : null };
  border-radius: 10px;
  height: 100%;
  padding: 5px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  img{max-width: 100%; max-height: 100%};
  &:hover {
    transform: translateY(-3px);
    cursor: pointer;
  } 
`;



class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: false,
            nrSelected: this.props.nr,
            allowedToClick: this.props.isPlayer1 || this.props.isPlayer2,
            oneSelected: this.props.isOneSelected
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            nrSelected: nextProps.nr,
            allowedToClick: nextProps.isPlayer1 || nextProps.isPlayer2,
            oneSelected: nextProps.isOneSelected
        });
    }

    render() {
        return(
            <CardContainer allowed={this.state.allowedToClick} isSelected={this.state.isSelected} onClick={this.click.bind(this)}>
                <img src={this.props.src}/>
            </CardContainer>
        );
    }

    click(){

        console.log("call click function in Card component!");

        if (this.props.intwoselection) {

            console.log("two selection mode!")

            if (!this.state.oneSelected){
                console.log("no card selected before");
                this.setState({isSelected: true});
                this.props.onClick(this.props.src);
            }

        } else if (!this.state.isSelected && this.state.nrSelected < 2){
            this.setState({isSelected: true});
            this.props.onClick(this.props.god);
        }
    }

}
export default Card;