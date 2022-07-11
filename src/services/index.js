import axios from "axios";
import RequestInterceptor from "./request_interceptor";
import ResponseInterceptor from "./response_interceptor";
import ResponseErrorInterceptor from "./response_error_interceptor";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(RequestInterceptor);
API.interceptors.response.use(ResponseInterceptor, ResponseErrorInterceptor);

export default API;
