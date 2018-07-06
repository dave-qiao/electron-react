import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import { dependencies as possibleExternals } from '../package.json';

function filterDepWithoutEntryPoints(dep) {
  console.log(3);
  try {
    if (
      fs.existsSync(path.join(__dirname, `../node_modules/${dep}/index.js`))
    ) {
      return false;
    }
    const pgkString = fs
      .readFileSync(path.join(__dirname, `../node_modules/${dep}/package.json`))
      .toString();
    const pkg = JSON.parse(pgkString);
    const fields = ['main', 'module', 'jsnext:main', 'browser'];
    return !fields.some(field => field in pkg);
  } catch (e) {
    console.log(e);
    return true;
  }
}
console.log(2);
export default {
  externals: [
    ...Object.keys(possibleExternals || {}).filter(filterDepWithoutEntryPoints)
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '../app'),
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
