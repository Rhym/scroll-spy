const package = require('./package');
const webpack = require('webpack');

const banner = `${package.name} ${package.version} - ${package.description}\n${package.author} - ${package.homepage}\nLicense: ${package.license}`;

module.exports = {
  context: `${__dirname}/src`,
  entry: "./index.js",
  output: {
    path: `${__dirname}/dist`,
    filename: `scroll-spy.min.js`,
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
  ]
};