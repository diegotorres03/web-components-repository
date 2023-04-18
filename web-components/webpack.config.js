const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production'

// TODO: Add a flag to choose between full bundle and dinamic bundles

const config = {
  entry: {
    dWCk: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
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
    rules: [
      // Rule for loading component/ CSS files using raw-loader
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/layouts'),
        ],
        use: ['raw-loader'],
      },
      {
        test: /\.css$/i,
        exclude: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/layouts'),
        ],
        include: [path.resolve(__dirname, 'src/global')],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
}

module.exports = () => {
  config.plugins.push(new CleanWebpackPlugin())
  if (isProduction) {
    config.mode = 'production'
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
