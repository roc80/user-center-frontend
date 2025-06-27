// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse<T> = {
    code: number;
    message: string;
    data?: T;
    description: string;
    dateTime: string;
  };

  type User = {
    userName: string;
    avatarUrl?: string;
    userId: number;
    gender?: string;
    email?: string;
    phone?: string;
    userRole: string;
    createDatetime: string;
    state: string;
  };

  type LoginResponse = {
    user: User;
    redirectUrl: string;
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
    redirectUrl?: string;
  };

  type RegisterParams = {
    username?: string;
    password?: string;
    repeatPassword?: string;
  };

  type PageResponse<T> = {
    records: T[],
    pageNum: number,
    pageSize: number,
    totalNum: number,
  }
}
