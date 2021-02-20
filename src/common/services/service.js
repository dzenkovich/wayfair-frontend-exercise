import request from 'superagent'

class Service {
  /**
   * Running request
   *
   * @param method {String} - post, get, put, etc
   * @param url {String} - url name from 'config.src'
   * @param data {Object} - query (get) or body (post) request params
   * @returns {*}
   */
  request(method, url, data) {
    const call = request(method, url).set('Accept', 'application/json')

    return call[method === 'get' ? 'query' : 'send'](data).then(
      response => {
        const body = response.body || response.text
        if (response.status !== 200 && response.status !== 201) {
          throw body
        }
        // if new response format
        if (body.errormessage) {
          throw body.errormessage
        }
        // if another weird error format (why not to update response status!?)
        if (body.errors) {
          throw body.errors
        }
        return body.results ? body.results : body
      },
      error => {
        // make sure we throw passed json error object and fallback to default message
        throw error.response || error.toString()
      },
    )
  }

  get(...rest) {
    return this.request('get', ...rest)
  }

  post(...rest) {
    return this.request('post', ...rest)
  }

  put(...rest) {
    return this.request('put', ...rest)
  }

  delete(...rest) {
    return this.request('delete', ...rest)
  }

  download(url, postData) {
    return request
      .post(url)
      .responseType('blob')
      .send(postData)
      .then(
        response => response.body,
        error => {
          throw error.response || error.toString()
        },
      )
  }

  upload(url, data) {
    const formData = new FormData()
    // eslint-disable-next-line
    for (let name in data) {
      if (data.hasOwnProperty(name)) {
        formData.append(name, data[name])
      }
    }

    return this.request('post', url, formData)
  }
}

export default new Service()

export const agentRequest = request
