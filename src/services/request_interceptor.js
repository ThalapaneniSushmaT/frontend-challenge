/**
 * This method will perform excess task by adding excess headers
 * globally for authentication.
 * @param {Object} reqConfig - Request config object
 */
const RequestInterceptor = (reqConfig) => {
  try {
    reqConfig.headers = {
      ...reqConfig.headers,
      "x-api-key": process.env.REACT_APP_API_KEY,
    };
    return reqConfig;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default RequestInterceptor;
