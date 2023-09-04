//用户相关接口
import request from '@/utils/request'
//引入参数类型
import type { loginFormData, loginResData, userInfoResData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = 'users/login',
  USERINFO_URL = 'users/info',
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResData>(API.USERINFO_URL)
