import { query as queryUsers, queryCurrent } from '@/services/user';
import { getInfo } from '@/services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const info = yield call(getInfo);
      const data = {
        ...response,
        ...info.data.company_information,
        name: info.data.company_information.company_name,
        avatar: info.data.company_information.head_image
      };
      console.log(data);
      yield put({
        type: 'saveCurrentUser',
        payload: data
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
