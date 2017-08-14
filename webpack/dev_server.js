import webpack from 'webpack'
import webpackConfig from './webpack.dev'

const bundler = webpack(webpackConfig)

bundler.run()
