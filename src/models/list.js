import {
  queryOrderList,
  removeFakeList,
  addFakeList,
  updateFakeList,
  queryOrderProgress,
  accept,
  finish,
  updateOrder
} from '@/services/api';

export default {
  namespace: 'list',

  state: {
    list: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      const data = response ? response.data.orders : [];
      yield put({
        type: 'queryList',
        payload: data
      });
    },
    *fetchProgress({ payload }, { call, put }) {
      const response = yield call(queryOrderProgress, payload);
      const data = response ? response.data.Progress : [];
      yield put({
        type: 'queryProgress',
        payload: data
      });
    },
    *accept({ payload }, { call, put }) {
      yield call(accept, payload);
    },
    *finish({ payload }, { call, put }) {
      yield call(finish, payload);
    },
    *update({ payload }, { call, put }) {
      yield call(updateOrder, payload);
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : []
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback =
          Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    },
    queryProgress(state, action) {
      return {
        ...state,
        progress: action.payload
      };
    }
  }
};
