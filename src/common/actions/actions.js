import { createAction, readServerError } from '../utilities'
import Types from '../constants/actionTypes'

export const serverErrorHandler = (dispatch, response) => {
  dispatch(serverError(readServerError(response)))
}

export const serverError = createAction(Types.SERVER_ERROR)
