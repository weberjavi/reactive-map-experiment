module.exports = {
  resolve: {
    extensions: ['.js']
  },
  context: __dirname,
  entry: {
    app:['./index.js']
  },
  output: {
    path: __dirname +'/build',
    filename: 'app.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  }
}
