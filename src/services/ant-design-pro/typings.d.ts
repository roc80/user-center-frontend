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

  type CurrentUser = {
    userName: string;
    avatarUrl?: string;
    id: string;
    gender?: number;
    email?: string;
    phone?: string;
    userRole: number;
    createDatetime: string;
    isValid: number;
  };

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
  };

  type RegisterParams = {
    username?: string;
    password?: string;
    repeatPassword?: string;
  };
}
