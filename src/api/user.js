import request from '@/utils/http/index'
import {post_array} from '@/utils/http/index'

export function login(data) {
  return post_array('/authentication/loginBusiness',data)
}

export function getInfo(token) {
  return post_array('/authentication/infoBusiness',{token})
}

export function logout() {
  return post_array('/authentication/logout')
}
