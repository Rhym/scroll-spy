module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          "presets": [
            "es2015"
          ],
          "plugins": []
        }
      }
    ]
  }
};