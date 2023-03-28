const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebTools = require('./src/global/web-tools')
const webpack = require('webpack')

// const fs = require("fs");

const isProduction = process.env.NODE_ENV == 'production'

// ⚠️ This is the dinamic import of components and layouts ⚠️

// function getDirectories(srcPath) {
//   return fs.readdirSync(srcPath).filter((file) => {
//     return fs.statSync(path.join(srcPath, file)).isDirectory();
//   });
// }

// const componentsPath = "./src/components";
// const layoutsPath = "./src/layouts";
// const componentFolders = getDirectories(componentsPath);
// const layoutFolders = getDirectories(layoutsPath);

// const componentsEntryPoints = componentFolders.reduce((entry, folder) => {
//   entry[`${folder}.component`] =`./${path.join(componentsPath, folder, "index.js")}`;
//   return entry;
// }, {});

// const layoutsEntryPoints = layoutFolders.reduce((entry, folder) => {
//   entry[`${folder}.layout`] =`./${path.join(layoutsPath, folder, "index.js")}`;
//   return entry;
// }, {});

// Dinamic bundles:
// The main entry point only has global imports, because the components and layouts have separate entry points
// The components and layouts are dinamically bundled individually

// Full bundle:
// The main entry point has global imports and all components and layouts (Easy importing all from one file/link)

// TODO: Add a flag to choose between full bundle and dinamic bundles

const config = {
  entry: {
    main: './src/index.js',

    // ⚠️ This is the dinamic import of components and layouts ⚠️
    // ...componentsEntryPoints,
    // ...layoutsEntryPoints,
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
  ],
  module: {
    rules: [
      // Rule for loading component/ CSS files using raw-loader
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/layout'),
        ],
        use: ['raw-loader'],
      },
      {
        test: /\.css$/i,
        exclude: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/layout'),
        ],
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
