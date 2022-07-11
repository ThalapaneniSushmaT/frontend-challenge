/**
 * This method will perform excess task if needed. Like, on authentication
 * failure it navigates to login page.
 * @param {Object} error - Denotes API error
 */
const ResponseInterceptor = (resConfig) => {
  try {
    return resConfig;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default ResponseInterceptor;
