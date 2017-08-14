import path from 'path'

module.exports = {
  devtool: 'eval',
  context: path.join(__dirname, '../client'),
  entry: {},
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'file?name=[name].[ext]' }],
      },
      {
        test: /\.css$/,
        include: /client/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /client/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [],
}
