/**
 * This method will perform excess task if needed. Like, on authentication
 * failure it navigates to login page.
 * @param {Object} error - Denotes API error
 */
const ResponseErrorInterceptor = (reqConfig) => {
  if (reqConfig.response) {
    if (reqConfig.response.status === 401) {
      window.location.href = "/";
    } else {
      return Promise.reject(reqConfig.response);
    }
  }
};

export default ResponseErrorInterceptor;
