var path = require('path');

module.exports = {
  entry: { 'main-client': './ClientApp/app.js' },
  output: {
    path: path.resolve(__dirname, './wwwroot/dist'),
    publicPath: '/dist/',
    filename: 'main-client.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { 
          test: /\.css$/, 
          loader: "style-loader!css-loader" 
      }
    ]
  }
}
