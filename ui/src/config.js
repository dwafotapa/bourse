const config = {
  API_BASE_URL: 'http://localhost:5000/',
  API_STOCKS_URL: 'http://localhost:5000/stocks'
};

config.getUrl = function(key) {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env[`REACT_APP_${key}`];
    case 'development':
    default:
      return this[key];
  }
}

export default config;