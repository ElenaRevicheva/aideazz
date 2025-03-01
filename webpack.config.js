const path = require('path');

module.exports = {
  mode: 'production', // Ensure it's production mode
  entry: './bundle.js',
  output: {
    filename: 'fleek-sdk.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
};
