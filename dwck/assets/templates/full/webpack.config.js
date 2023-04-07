const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

// Entry point for webpack bundler
const entry = {
  main: './src/index.js',
};

// Output path and filename for webpack bundler
const output = {
  path: path.resolve(__dirname, 'dist'),
};

// Webpack dev server configuration
const devServer = {
  open: true,
  host: 'localhost',
};

// Webpack plugins
const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
  new CleanWebpackPlugin(),
];

// Webpack loaders
const moduleRules = [
  {
    test: /\.css$/i,
    include: [
      // include all the css files meant to be imported in js files
    ],
    use: ['raw-loader'],
  },
  {
    test: /\.css$/i,
    exclude: [
      // exclude all the css files meant to be imported in js files
    ],
    include: [
      // include all the css files meant to be imported in html files
    ],
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.html$/i,
    loader: 'html-loader',
  },
];

// Webpack configuration
const config = {
  entry,
  output,
  devServer,
  plugins,
  module: {
    rules: moduleRules,
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
