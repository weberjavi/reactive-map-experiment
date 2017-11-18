module.exports = {
  resolve: {
    extensions: ['.js', '.html', '.css']
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
    host: 'localhost',
    port: 8080
  }
}
