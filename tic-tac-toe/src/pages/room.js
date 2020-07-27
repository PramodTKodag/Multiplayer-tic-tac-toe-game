import React, { Component } from 'react';
import { Tabs, Button, Typography, Input } from 'antd';
import { connect } from 'dva'
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { Search } = Input;

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    callback(key) {
        console.log(key);
    }

    componentWillMount = () => {
        console.log("props");
        console.log(this.props);
    }

    createRoom = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'game/createRoom'
        })
    }

    joinRoom = (value) => {
        console.log(value);
        const {dispatch} = this.props;
        dispatch({
            type: "game/joinRoom",
            payload: value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Create Room" key="1">
                        <Button type="primary" onClick={() => this.createRoom()}>Create</Button>
                        <div>
                            {
                                this.props.roomDetails.shortid !== ""
                                    ?
                                    <><span>Your room code is : </span><Paragraph copyable={{ text: this.props.roomDetails.room.shortid }}>{this.props.roomDetails.room.shortid}</Paragraph></>
                                    :
                                    ""
                            }
                        </div>
                    </TabPane>
                    <TabPane tab="Join Room" key="2">
                        <Search style={{width: '40%'}} placeholder="input search text" onSearch={value => this.joinRoom(value)} enterButton />
                    </TabPane>
                </Tabs>


            </React.Fragment>
        );
    }
}

export default connect(({ user, game }) => ({
    roomDetails: game.roomDetails
}))(Room);