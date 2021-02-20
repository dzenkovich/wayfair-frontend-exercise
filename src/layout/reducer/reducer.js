import initialState from './initialState'
import Types from '../constants/actionTypes'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.LOAD_LAYOUT_SUCCESS:
      return {
        ...state,
        layout: action.payload,
      }
    default:
      return { ...state }
  }
}
