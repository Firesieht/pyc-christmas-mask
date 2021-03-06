const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.wasm'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: 'assets/favicon.png',
      title: 'PYC AR Face mask',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/mask.html',
      filename: 'mask.html',
      favicon: 'assets/favicon.png',
      title: 'PYC AR Face mask',
    }),
  ],
  devServer: {
    contentBase: './dist/',
    historyApiFallback: true,
    https: true,
    host: '0.0.0.0',
    hot: true,
    open: true,
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader' },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(zpt|png|gif|glb|gltf|jpe?g|ogg|mp3|obj|fbx|wav|ttf|fnf|woff|stl|mp4|hdr|webm)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            name: '[sha256:hash:base64:16].[ext]',
          },
        }],
      },
      {
        test: /zcv\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
      },
    ],
  },
};
