const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackBaseConfig = require("./webpack.config");

const BUILD_DIR = path.resolve(__dirname, "dist");
const {PORT} = process.env;

const webpackDevelopment = merge(webpackBaseConfig, {
  output: {
    publicPath: `http://localhost:${PORT}/`,
  },

  mode: "development",

  devtool: "inline-source-map",

  cache: false,

  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: BUILD_DIR,
    port: process.env.PORT,
    host: process.env.HOST,
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = webpackDevelopment;
