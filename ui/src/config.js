const config = {
  API_BASE_URL: 'http://localhost:5000/',
  API_STOCKS_URL: 'http://localhost:5000/stocks',
  NUMBER_OF_VALUES: 20,
  CAC40: 'CAC40',
  NASDAQ: 'NASDAQ'
};

config.get = function(key) {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env[`REACT_APP_${key}`];
    case 'development':
    default:
      return this[key];
  }
}

export default config;