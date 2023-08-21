//用户相关接口
import request from '@/utils/request'
//引入参数类型
import type { loginForm, loginRes, userInfoRes } from './type'
//统一管理接口
enum API {
  USER_LOGIN = '/user/login',
  USER_INFO = '/user/info',
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginRes>(API['USER_LOGIN'], data)
//获取用户信息方法
export const reqUserInfo = () =>
  request.post<any, userInfoRes>(API['USER_INFO'])
