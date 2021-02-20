import { createAction, createAsyncAction } from '../../common/utilities'
import { serverErrorHandler } from '../../common/actions/actions'
import Service from '../../common/services/service'
import Types from '../constants/actionTypes'
import { URLS } from '../constants'

export const login = createAsyncAction(Types.LOGIN_USER, (dispatch) => {
  dispatch({ type: Types.LOGIN_USER })
  return Service.get(URLS.login)
}, serverErrorHandler)

export const logout = createAction(Types.LOGOUT_USER)
