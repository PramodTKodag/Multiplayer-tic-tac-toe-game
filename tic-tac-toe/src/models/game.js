import { addUser, loginUser } from '../services/user';
import socketIOClient from "socket.io-client";
import { createRoom } from "../services/room";
import { setToken, getToken } from "../functions/tokenOpt";
const jwt = require('jsonwebtoken');

const secret_token = 'ylZM7VHLvOFcohp01x@fXNr8P$tqin6RkgWGm4SIDdK5s2TAJebzQEBUwuY9j3aC';
const UserModel = {
  namespace: 'game',
  state: {
    roomDetails: {
      shortid: ""
    },
    SelectedSymbol: {
      uuid: "",
      symbol: "",
      ready: false,
    },
    playerTurn: "",
    winner: "",
    OpponentSelectedSymbol: {
      uuid: "",
      symbol: "",
      ready: false,
    },
    constant: {
      endpoint: "localhost:4001",
    },
    possibleWin: [
      ['grid1', 'grid2', 'grid3'],
      ['grid1', 'grid4', 'grid7'],
      ['grid1', 'grid5', 'grid9'],
      ['grid2', 'grid5', 'grid8'],
      ['grid3', 'grid6', 'grid9'],
      ['grid3', 'grid5', 'grid7'],
      ['grid4', 'grid5', 'grid6'],
      ['grid7', 'grid8', 'grid9'],
    ],
    grids: [
      {
        key: 'azxsw1',
        name: 'grid1',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'wsxcde2',
        name: 'grid2',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'edcvfr3',
        name: 'grid3',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'rfvgt4',
        name: 'grid4',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'vfrtgb5',
        name: 'grid5',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'tgbnhy6',
        name: 'grid6',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'yhnmju7',
        name: 'grid7',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'nhyujm8',
        name: 'grid8',
        value: '',
        selected: false,
        owner: "",
      }, {
        key: 'mjuikl9',
        name: 'grid9',
        value: '',
        selected: false,
        owner: "",
      },
    ],
  },
  effects: {
    *createRoom({ payload }, { call, put, select }) {
      const token = getToken();
      const response = yield call(createRoom, { token: token });

      if (response.status === 200) {
        const shortid = response.data.room.shortid;
        const endpoint = yield select(state => state.game.constant.endpoint);
        const socket = socketIOClient(endpoint);
        socket.emit('create_room', shortid)
        yield put({
          type: "setRoom",
          payload: response.data
        })
      }

    },
    *joinRoom({ payload }, { call, put }) {

    },
    *userReadyEffects({ payload }, { call, put, select }) {
      const endpoint = yield select(state => state.game.constant.endpoint);
      const socket = socketIOClient(endpoint);
      socket.emit('user_ready', payload)
    },
    *updateGrids(payload, { call, put, select }) {
      const grids = yield select(state => state.user.grids);
      yield put({
        type: 'updateGridReducer',
        payload
      })
    },

    *SocketupdateGrids(payload, { call, put, select }) {
      yield put({
        type: 'SocketupdateGridReducer',
        payload: payload.payload
      })
    },
  },
  reducers: {
    setRoom(state, { payload }) {
      return {
        ...state,
        roomDetails: {
          ...payload
        }
      }
    },
    playerTurn(state, { payload }) {
      return {
        ...state,
        playerTurn: payload
      }
    },
    userReady(state, { payload }) {
      return {
        ...state,
        SelectedSymbol: {
          ...state.SelectedSymbol,
          ready: true,
        }
      }
    },

    opponentUserReady(state, { payload }) {
      return {
        ...state,
        OpponentSelectedSymbol: {
          ...state.OpponentSelectedSymbol,
          ready: true,
        }
      }
    },

    setOpponentSelectedSymbol(state, { payload }) {
      return {
        ...state,
        OpponentSelectedSymbol: {
          uuid: payload.uuid,
          symbol: payload.symbol
        }
      }
    },
    setSymbol(state, { payload }) {
      return {
        ...state,
        SelectedSymbol: {
          uuid: payload.uuid,
          symbol: payload.symbol
        }
      }
    },
    updateGridReducer(state, action) {
      const newVal = [...state.grids.map(item => {
        if (item.key === action.payload.payload.key) {
          return {
            ...item,
            selected: action.payload.payload.selected,
            owner: action.payload.payload.owner,
            value: action.payload.payload.value,
          }
        } else {
          return item
        }
      })];
      const socket = socketIOClient(state.constant.endpoint);
      socket.emit('update_grid', newVal)
      return {
        ...state,
        grids: [
          ...newVal
        ]
      }
    },


    SocketupdateGridReducer(state, action) {
      // console.log(action.payload);

      return {
        ...state,
        grids: [
          ...action.payload
        ]
      }
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
