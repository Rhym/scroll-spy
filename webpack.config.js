const package = require('./package');
const webpack = require('webpack');
const path    = require('path');

const banner = `${package.name} ${package.version} - ${package.description}\n${package.author} - ${package.homepage}\nLicense: ${package.license}`;

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'docs': './docs.js',
    'scroll-spy': ['./scroll-spy.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'ScrollSpy',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: true,
    }),
  ]
};