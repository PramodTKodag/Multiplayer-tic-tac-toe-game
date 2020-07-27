import React, { Component } from 'react'
import { connect } from 'dva'
import socketIOClient from "socket.io-client";

class SymbolSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        const socket = socketIOClient(this.props.endpoint);
        socket.on('update_symbol', (symbol) => {
            const sb = {
                uuid: symbol.uuid,
                symbol: symbol.symbol
            }
            if (this.props.user.uuid === symbol.uuid) {
                dispatch({
                    type: 'game/setSymbol',
                    payload: sb
                });
            } else {
                dispatch({
                    type: 'game/setOpponentSelectedSymbol',
                    payload: sb
                });
            }
        })
    }

    selectSymbol = (symbol) => {
        const sb = {
            uuid: this.props.user.uuid,
            symbol: symbol
        }
        const socket = socketIOClient(this.props.endpoint);
        socket.emit('update_symbol', sb)
        // alert(`You selected ${sb.symbol}`)
        const { dispatch } = this.props;
        dispatch({
            type: 'game/setSymbol',
            payload: sb
        });
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.props.OpponentSelectedSymbol.symbol === "" ?
                    <div>
                        <button onClick={() => this.selectSymbol('x')}>Cross</button>
                        <button onClick={() => this.selectSymbol('0')}>Zero</button></div> : 
                        this.props.OpponentSelectedSymbol.symbol === "x" ?
                        <button onClick={() => this.selectSymbol('0')}>Zero</button> :
                        <button onClick={() => this.selectSymbol('x')}>Cross</button>
                }

            </React.Fragment>
        );
    }
}

export default connect(({ game, user }) => ({
    user: user.currentUser,
    endpoint: game.constant.endpoint,
    SelectedSymbol: game.SelectedSymbol,
    OpponentSelectedSymbol: game.OpponentSelectedSymbol
}))(SymbolSelector);