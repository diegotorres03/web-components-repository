const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

// Entry point for webpack bundler
const entry = {
  dWCk: './src/index.js',
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
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src/layouts'),
      path.resolve(__dirname, 'src/workshop'),
    ],
    use: ['raw-loader'],
  },
  {
    test: /\.css$/i,
    exclude: [
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src/layouts'),
      path.resolve(__dirname, 'src/workshop'),
    ],
    include: [path.resolve(__dirname, 'src/global')],
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.html$/i,
    loader: 'html-loader',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/sw.js', to: 'sw.js' },
      ],
    }),
  ],
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
