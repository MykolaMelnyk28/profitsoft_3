const config = {
  // Services
  API_BASE_URL: process.env.API_BASE_URL ?? '',
  OAUTH2_GOOGLE_AUTHORIZATION_URL: process.env.OAUTH2_GOOGLE_AUTHORIZATION_URL ?? '',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
