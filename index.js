class AxiosError {
  /**
   * Initialize error instance
   *
   * @param error error object
   * @param log_errors indicate whether to show logs upon initialization or not
   */
  constructor(error, log_errors = false) {
    if (error.response) {
      const response = error.response

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this._error_data = response.data
      this._error_status = response.status
      this._error_headers = response.headers

      if (log_errors) {
        console.error(response.data)
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this._error_request = error.request

      if (log_errors) {
        console.error(error.request)
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      this._error_message = error.message

      if (log_errors) {
        console.error(error.message)
      }
    }

    this._error_config = error.config
  }

  get data () {
    return this._error_data
  }

  get error_message () {
    if (this._error_data && typeof this._error_data.error_message !== 'undefined')
      return this._error_data.error_message

    return null
  }

  get error_messages () {
    if (this._error_data && typeof this._error_data.errors !== 'undefined') {
      return Object.keys(this._error_data.errors).map(key => this._error_data.errors[key][0])
    }

    return false
  }

  get status () {
    return this._error_status
  }

  get headers () {
    return this._error_headers
  }
}

export default AxiosError