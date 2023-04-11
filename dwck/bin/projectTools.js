import fs from 'fs'
import https from 'https'

function CreatePackageJSON(folderPath, projectName) {
  const packageJSON = {
    name: `${projectName}`,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      'build:prod': 'webpack --mode production --node-env production',
      'build:dev': 'webpack --mode development --node-env development',
      'serve': 'webpack serve --mode development --node-env development',
      'test': 'echo "Error: no test specified" && exit 1',
      'watch': 'webpack --mode development --watch',
    },
    author: '',
    license: 'ISC',
    dependencies: {},
    devDependencies: {
      '@webpack-cli/generators': '^3.0.1',
      'clean-webpack-plugin': '^4.0.0',
      'css-loader': '^6.7.3',
      'html-loader': '^4.2.0',
      'html-webpack-plugin': '^5.5.0',
      'raw-loader': '^4.0.2',
      'style-loader': '^3.3.2',
      'webpack': '^5.76.1',
      'webpack-cli': '^5.0.1',
      'webpack-dev-server': '^4.12.0',
    },
  }

  fs.writeFileSync(
    `${folderPath}/package.json`,
    JSON.stringify(packageJSON, null, 2),
  )
}

function CreateWebpackConfig(folderPath) {
  let webpackConfig = `
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  const isProduction = process.env.NODE_ENV == 'production';

  console.log('Environment is production: ', isProduction);

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
        path.resolve(__dirname, 'src/elements'),
      ],
      use: ['raw-loader'],
    },
    {
      test: /\.css$/i,
      exclude: [
        path.resolve(__dirname, 'src/elements'),
      ],
      include: [
        path.resolve(__dirname, 'src/lib'),
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
`
  fs.writeFileSync(`${folderPath}/webpack.config.js`, webpackConfig)
}

function CreateFolderStructure(folderPath) {
  const srcFolder = `${folderPath}/src`
  const elementsFolder = `${srcFolder}/elements`
  const libFolder = `${srcFolder}/lib`

  if (!fs.existsSync(srcFolder)) {
    fs.mkdirSync(srcFolder)
  }
  if (!fs.existsSync(elementsFolder)) {
    fs.mkdirSync(elementsFolder)
  }
  if (!fs.existsSync(libFolder)) {
    fs.mkdirSync(libFolder)
  }
}

function CopyLibraryFromGithub(folderPath) {
  const libFolder = `${folderPath}/src/lib`

  const styleToolsURl = 'https://raw.githubusercontent.com/diegotorres03/web-components-repository/main/web-components/src/global/style-tools.css'
  const webToolsURL = 'https://raw.githubusercontent.com/diegotorres03/web-components-repository/main/web-components/src/global/web-tools.js'

  https.get(styleToolsURl, (res) => {
    res.on('data', (d) => {
      fs.writeFileSync(`${libFolder}/style-tools.css`, d)
    })
  })

  https.get(webToolsURL, (res) => {
    res.on('data', (d) => {
      fs.writeFileSync(`${libFolder}/web-tools.js`, d)
    })
  })
}

export function CreateDwckProjectFolder(projectName) {
  const folderName = projectName
  const folderPath = `./${folderName}`
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
    CreatePackageJSON(folderPath, projectName)
    CreateWebpackConfig(folderPath)
    CreateFolderStructure(folderPath)
    CopyLibraryFromGithub(folderPath)
  }
  return folderPath
}
