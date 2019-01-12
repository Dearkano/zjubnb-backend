import { stringify } from 'qs';
import request from '@/utils/request';
import moment from 'moment';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete'
    }
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post'
    }
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update'
    }
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete'
    }
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post'
    }
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update'
    }
  });
}

export async function accept(payload) {
  const headers = formHeaders();
  const body = {
    orderId: payload.order.orderId,
    status: 1
  };
  return request('/ssm/api/progress', { method: 'POST', headers, body });
}

export async function finish(payload) {
  const headers = formHeaders();
  const body = {
    orderId: payload.order.orderId,
    status: 2
  };
  return request('/ssm/api/progress', { method: 'POST', headers, body });
}

export async function queryOrderList(params) {
  const headers = formHeaders();
  return request(`/ssm/api/order/get?companyId=${params}`, { headers });
}

export async function queryOrderProgress(params) {
  const headers = formHeaders();
  return request(`/ssm/api/progress/${params}`, { headers });
}

export async function updateOrder(params) {
  const headers = formHeaders();
  const body = {
    orderId: params.order.orderId,
    date: moment(Date.now()).format('YYYY-MM-DD'),
    progressComment: params.comment
  };
  console.log(222222)
  return request(`/ssm/api/progress/new`, { method: 'POST', headers, body });
}

export async function fakeAccountLogin(params) {
  return request('/ssm/api/login', {
    method: 'POST',
    body: params
  });
}

export function formHeaders() {
  const token = localStorage.getItem('access_token') || '';
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  return { Authorization: token };
}
export async function getInfo(params) {
  const headers = formHeaders();
  return request('/ssm/api/get_information', {
    headers,
    method: 'GET',
    body: params
  });
}
export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
