const path = require('path')

// using webpack-merge so we don't have to repeat common configuration attributes twice
const merge = require('webpack-merge')

module.exports = (env) => {
  const sharedConfig = () => ({
    mode: "development",
    stats: { modules: false },
    resolve: { extensions: ['.js', '.vue'] },
    output: {
      filename: '[name].js',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: __dirname,
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    }
  })

  const clientBundleConfig = merge(sharedConfig(), {
    entry: { 'main-client': './ClientApp/client.js' },
    output: {
      path: path.join(__dirname, 'wwwroot/dist')
    }
  })

  const serverBundleConfig = merge(sharedConfig(), {
    target: 'node',
    entry: { 'main-server': './ClientApp/server.js' },
    output: {
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, 'wwwroot/dist')
    }
  })

  return [clientBundleConfig, serverBundleConfig]
}
