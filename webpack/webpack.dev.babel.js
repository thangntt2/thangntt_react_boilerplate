import webpack from 'webpack'
import baseConfig from './webpack.config.babel'

module.exports = {
  ...baseConfig,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
    ],
    jsx: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './index.jsx',
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
  ],
  devServer: {
    contentBase: './client',
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
}
