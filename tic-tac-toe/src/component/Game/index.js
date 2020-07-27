import React, { Component, useState, memo } from 'react';
import { checkWinner } from '../../functions/chekWinner'
import {
    PageBackground,
    FormWrapper,
    GridBox
} from './Game.style'
import { connect } from 'dva'
import socketIOClient from "socket.io-client";
import SelectSymbol from "../Symbol";
// console.log(TodoActionCreators);


class Game extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        const userID = "123";
        const selectedIcon = "cross";
        this.state = {}
    }

    componentDidMount = () => {
        const socket = socketIOClient(this.props.endpoint);
        const { uuid } = this.props.user;
        const { dispatch } = this.props;

        socket.on('update_grid', (grid) => {
            console.log(grid);
            dispatch({
                type: 'game/SocketupdateGrids',
                payload: grid
            });
        })

        socket.on('player_turn', (uuid) => {
            console.log(uuid);
            dispatch({
                type: 'game/playerTurn',
                payload: uuid
            });
        })

        socket.on('winner', (user) => {
            console.log(user);
            if(this.props.user.uuid === user.uuid){
                alert("Winner winner! Chicken Dinner");
            } else {
                alert(`Better luck next time..${user.name} Won the game...`)
            }
            
        })



        socket.on('user_ready', (uuid) => {
            console.log(uuid);
            if (this.props.user.uuid === uuid) {
                console.log("user");
                dispatch({
                    type: 'game/userReady',
                    payload: uuid
                });
            } else {
                console.log("Opponent");

                dispatch({
                    type: 'game/opponentUserReady',
                    payload: uuid
                });
            }
        })
        // const socket = socketIOClient(this.props.endpoint);
        // socket.emit('init_grid', this.props.grids)
    }
    handleClick = (item) => {
        const { dispatch } = this.props;
        const selectedGrid = {
            ...item,
            selected: true,
            owner: this.props.user.uuid,
            value: this.props.SelectedSymbol.symbol
        }
        dispatch({
            type: 'game/updateGrids',
            payload: selectedGrid
        });
        const socket = socketIOClient(this.props.endpoint);
        socket.emit('player_turn', this.props.user.uuid);
        setTimeout(() => {
            const isWinner = checkWinner(this.props.possibleWin, this.props.grids, this.props.SelectedSymbol.uuid)
            console.log("Winner winner");
            
            console.log(isWinner);
            if(isWinner === true){
                socket.emit('winner', this.props.user);
            }
            
        }, 500);
    }

    onReady = () => {
        const { uuid } = this.props.user;
        const { dispatch } = this.props;
        dispatch({
            type: 'game/userReadyEffects',
            payload: uuid
        });
    }
    render() {

        return (
            <PageBackground>
                {
                    this.props.SelectedSymbol.symbol !== "" ? "" : <SelectSymbol />
                }

                <FormWrapper
                    active={this.props.playerTurn !== "" ? this.props.playerTurn !== this.props.user.uuid ? true : false : true}
                >
                    {
                        this.props.grids.map(item => {
                            return (
                                <GridBox
                                    Selected={item.selected}
                                    onClick={() => this.handleClick(item)}
                                    key={item.key}
                                    id={item.name}
                                >
                                    {
                                        item.value
                                    }
                                </GridBox>
                            )
                        })
                    }

                </FormWrapper>
                {
                    this.props.SelectedSymbol.ready
                        ?
                        ""
                        :
                        <button onClick={() => this.onReady()}>Ready</button>
                }

            </PageBackground>
        );
    }
}

export default connect(({ game, user }) => ({
    grids: game.grids,
    user: user.currentUser,
    endpoint: game.constant.endpoint,
    SelectedSymbol: game.SelectedSymbol,
    playerTurn: game.playerTurn,
    possibleWin: game.possibleWin
}))(Game);