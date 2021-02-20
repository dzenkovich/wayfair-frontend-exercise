import { createAsyncAction } from '../../common/utils'
import { serverErrorHandler } from '../../common/actions/actions'
import Service from '../../common/services/service'
import Types from '../constants/actionTypes'
import { URLS } from '../constants'

export const loadCommon = createAsyncAction(Types.LOAD_COMMON, (dispatch, data) => {
  dispatch({ type: Types.LOAD_COMMON, payload: data })
  return Service.get(URLS.common, {})
}, serverErrorHandler)
