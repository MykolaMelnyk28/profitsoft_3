const config = {
  // Services
  API_BASE_URL: 'http://localhost:8080',
  OAUTH2_GOOGLE_AUTHORIZATION_URL: 'http://localhost:8080/api/oauth2/authorization/google',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
