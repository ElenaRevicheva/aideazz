const path = require('path');

module.exports = {
  mode: 'production',
  entry: './bundle.js',
  output: {
    filename: 'fleek-sdk.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
