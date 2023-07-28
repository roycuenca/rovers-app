import axios, { AxiosInstance } from 'axios';

const NASA_API_BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: NASA_API_BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
