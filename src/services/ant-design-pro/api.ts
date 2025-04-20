// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  const response = request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
  return response.then((res) => res.data);
}

/** 退出登录接口 POST /api/user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponse<Boolean>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
