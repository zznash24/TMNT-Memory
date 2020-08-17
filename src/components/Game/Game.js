import React, { Component } from 'react';
import classes from './Game.module.css';
import { images as Images } from '../Images/Images';
import Card from '../Card/Card';
import { Col } from 'reactstrap';


class Game extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showField: true,
        }
        Images.sort(() => Math.random() - 0.5);
        
    }

    componentDidMount() {
        setTimeout(() => this.setState({showField: false}), 2000);
    }
    
        cardPair = [];
    onCoverClick = (event) => {
        const card = event.target;
        const [...cards] = document.getElementsByClassName('Card');

        if(card.getAttribute('check') === 'true') {
            return;
        }

        if (card.getAttribute('check') === 'false') {
            card.classList.remove("Card_blank");
            card.setAttribute('check', 'true');
            this.cardPair.push(card.getAttribute('data-name'));
            console.log(this.cardPair.length);
        }
         
        if (this.cardPair[0] !== this.cardPair[1] && this.cardPair.length === 2) {
            
            console.log(cards);
            cards.map((card) => {
                return setTimeout(() => {
                    card.setAttribute('check', 'false');
                    card.classList.add("Card_blank");
                    this.cardPair = [];
                }, 1000);
            });
            
        } else if (this.cardPair[0] === this.cardPair[1] && this.cardPair.length === 2)
        {
            console.log('match');
            cards.map((card) => {
                if (card.getAttribute('data-name') === this.cardPair[0]) {
                    return card.remove();
                }
            })
            this.cardPair = [];
        }


    }

    render() {
        return (
            <div className={classes.Game}>
                {Images
                    .map((item, index) => {
                        return (
                            <Col xs='3' key={index}> 
                                <Card 
                                    className={this.state.showField ? true : false}
                                    name={item.name}
                                    image={item.pic}
                                    check={item.flipped}
                                    onCoverClick={this.onCoverClick}
                                />
                            </Col>
                        )
                })}
            </div>
        )
    }
}

export default Game;