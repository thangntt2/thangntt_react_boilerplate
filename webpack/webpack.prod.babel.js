import webpack from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
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
      './index.jsx',
    ],
  },
  plugins: [
    // // Moves files
    new CopyWebpackPlugin([{
      from: '../client/index.html', to: '../dist/index.html',
    }], {}),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') },
    }),
  ],
}
