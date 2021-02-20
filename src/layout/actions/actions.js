import { createAsyncAction } from '../../common/utils'
import { serverErrorHandler } from '../../common/actions/actions'
import Service from '../../common/services/service'
import Types from '../constants/actionTypes'
import { URLS } from '../constants'

export const loadLayout = createAsyncAction(Types.LOAD_LAYOUT, (dispatch, data) => {
  dispatch({ type: Types.LOAD_LAYOUT, payload: data })
  return Service.get(URLS.layout, {})
}, serverErrorHandler)
