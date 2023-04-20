const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

console.log('Environment is production: ', isProduction)

// Entry point for webpack bundler
const entry = {
  main: './src/index.js',
}

// Output path and filename for webpack bundler
const output = {
  path: path.resolve(__dirname, 'dist'),
}

// Webpack dev server configuration
const devServer = {
  open: true,
  host: 'localhost',
}

// Webpack plugins
const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
  new CleanWebpackPlugin(),
]

// Webpack loaders
const moduleRules = [
  {
    test: /\.css$/i,
    include: [path.resolve(__dirname, 'src/components')],
    use: ['raw-loader'],
  },
  {
    test: /\.css$/i,
    exclude: [path.resolve(__dirname, 'src/components')],
    include: [path.resolve(__dirname, 'src/lib')],
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.html$/i,
    loader: 'html-loader',
  },
]

// Webpack configuration
const config = {
  entry,
  output,
  devServer,
  plugins,
  module: {
    rules: moduleRules,
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}
