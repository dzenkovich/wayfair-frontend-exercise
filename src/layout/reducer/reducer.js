import initialState from './initialState'
import Types from '../constants/actionTypes'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case Types.LOGOUT_USER:
      return {
        ...state,
        user: null,
      }
    default:
      return { ...state }
  }
}

export default reducer
