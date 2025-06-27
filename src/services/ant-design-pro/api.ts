// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  const response = request<API.BaseResponse<API.User>>('/api/user/current', {
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
  return request<API.BaseResponse<API.LoginResponse>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

/** 查询所有用户接口 */
export async function searchAllUser(
  pageNum: number,
  pageSize: number,
  options?: { [key: string]: any }
): Promise<API.PageResponse<API.User>> {
  const res = await request<API.BaseResponse<API.PageResponse<API.User>>>('/api/user/search/all', {
    method: 'GET',
    params: {
      pageNum,
      pageSize,
    },
    ...(options || {}),
  });
  return res?.data ?? {records: [], pageNum: 1, pageSize: 20, totalNum: 0}
}
