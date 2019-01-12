import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, getInfo } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response
      });
      const info = yield call(getInfo);
      // Login successfully
      if (response.code === 200 || response.code === 250) {
        reloadAuthorized();
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;
        // console.log('1=' + redirect);
        window.location.href = '/';
        // if (redirect) {
        //   console.log(0);
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     console.log(1);
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     console.log(2);
        //     window.location.href = redirect;
        //     return;
        //   }
        // }
        // yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest'
        }
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        })
      );
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.code === 200 || payload.code === 250) {
        payload.status = true;
        payload.currentAuthority = 'admin';
      }
      const token = payload.data ? payload.data.token : '';
      localStorage.setItem('access_token', token);
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type
      };
    }
  }
};
