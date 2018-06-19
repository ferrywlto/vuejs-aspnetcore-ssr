const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.css$/,
          oneOf: [
            // this matches `<style module>`
            {
              resourceQuery: /module/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]'
                  }
                }
              ]
            },
            // this matches plain `<style>` or `<style scoped>`
            {
              use: [
                'vue-style-loader',
                'css-loader'
              ]
            }
          ]

        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
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
