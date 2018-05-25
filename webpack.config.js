module.exports = {
  entry: './app/static/js/background.js',
  output: {
    path: __dirname + '/dist',
    filename: './app/static/js/prod.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
