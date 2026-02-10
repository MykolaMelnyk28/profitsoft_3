import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN"
});

api.interceptors.request.use(config => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  }
  return config;
});


const addAxiosInterceptors = ({
  onSignOut,
}) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.data
        ?.some(beError => beError?.code === 'INVALID_TOKEN')
      ) {
        onSignOut();
      }
      throw error?.response?.data;
    }
  );
};

export {
  addAxiosInterceptors,
};

export default api;
