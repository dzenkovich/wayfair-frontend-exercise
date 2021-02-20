export const goTo = hash => {
  window.location.hash = hash
}

/**
 * create action helper (borrowed from here https://github.com/keuller/redux-action-help)
 * @param name
 * @returns {Function}
 */
export const createAction = name =>
  function (data, err) {
    return { type: name, payload: data, error: err }
  }

/**
 * create thunk action helper (borrowed from here https://github.com/keuller/redux-action-help)
 * @param type
 * @param fn
 * @param errorHandler
 * @returns {Function}
 */
export const createAsyncAction = (type, fn, errorHandler) =>
  function (data) {
    return function (dispatch) {
      let customType = type
      const result = data === null || data === undefined ? fn(dispatch) : fn(dispatch, data)
      if (result && !!result.then) {
        return result
          .then(resp => {
            customType = `${type}_SUCCESS`
            dispatch({ type: customType, payload: resp, data, error: null })
            // return json response up in promise chain
            return resp
          })
          .catch(err => {
            customType = `${type}_FAIL`
            dispatch({ type: customType, payload: null, data, error: err })
            // trigger error handling (this can be redux-form SubmissionError emitter or etc)
            if (errorHandler) return errorHandler(dispatch, err)
            // re-throw the error if no error handling was provided
            throw err
          })
      }
      return result
    }
  }

export const readServerError = response => {
  let error = 'Server error.'
  if (response) {
    if (response.body) error = response.body.errorMessage || response.body.error
    else if (response.error) error = response.error.message
  }
  return error
}