import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.detailsPage]: `${config.UI_URL_PREFIX}/${pages.detailsPage}`,
  [pages.newPage]: `${config.UI_URL_PREFIX}/${pages.newPage}`,
};

export default result;
