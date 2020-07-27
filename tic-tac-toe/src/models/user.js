import { addUser, loginUser } from '../services/user';
import { setToken, getToken } from "../functions/tokenOpt";
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_token = 'ylZM7VHLvOFcohp01x@fXNr8P$tqin6RkgWGm4SIDdK5s2TAJebzQEBUwuY9j3aC';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *register(payload, { call, put }) {
      // console.log(payload);
      const response = yield call(addUser, payload.payload);
      if (response.status === 200) {
        alert("Account created successfully");
      }
    },

    *login(payload, { call, put }) {
      console.log(payload.payload);
      const response = yield call(loginUser, payload.payload);
      if (response && response.status === 200) {
        console.log("done");
        console.log(response.data.data.token);
        yield put({
          type: 'saveUserData',
          payload: response.data.data.token
        })
        // window.location.href = "/tic";
      } else {
        alert("error")
      }
    },

    *fetchCurrent(_, { call, put }) {
      yield put({
        type: 'fetchUserData',
      });
    },
  },
  reducers: {
    
    saveUserData(state, action) {
      const token = setToken(action);
      var decoded = jwt.verify(token, secret_token);
      console.log(decoded);

      return {
        ...state,
        currentUser: {
          ...decoded.data
        }
      }
    },

    fetchUserData(state, action) {
      const token = getToken();
      var decoded = jwt.verify(token, secret_token);
      console.log(decoded);

      return {
        ...state,
        currentUser: {
          ...decoded.data
        }
      }
    },

    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
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
