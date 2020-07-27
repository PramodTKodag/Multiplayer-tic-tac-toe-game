import React, { Component } from 'react';
import Game from '../component/Game'
import { connect } from 'dva'


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'user/fetchCurrent',
        });
    }
    render() { 
        return ( 
            <Game />
         );
    }
}
 
export default connect(({ game, user }) => ({
    grids: game.grids,
    user: user.currentUser,
}))(Register);