import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styles from './index.css';
import { connect } from 'dva'
import { getToken } from "../functions/tokenOpt";

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    
  }
  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay {this.props.user.name}! Welcome to Tic Tac Toe</h1>
        {this.props.children}
      </div>
    );
  }
}

export default connect(({ game, user }) => ({
  user: user.currentUser,
}))(BasicLayout);
