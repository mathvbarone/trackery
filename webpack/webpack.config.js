const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const dotenv = require("dotenv");
const deps = require("../package.json").dependencies;

// Import and read .env file
dotenv.config();

// Set paths
const APP_DIR = path.join(__dirname, "../src");
const BUILD_DIR = path.resolve(__dirname, "../dist");
const PUBLIC_PATH = path.resolve(__dirname, "../public");
const STATIC_PATH = path.resolve(__dirname, "../src/assets");

const webpackBaseConfig = {
  name: "simple_component",

  entry: {
    app: path.join(APP_DIR, "index.js"),
  },

  output: {
    path: BUILD_DIR,
    filename: "[name].bundle.js",
    uniqueName: "simple-component",
  },

  resolve: { extensions: [".js", ".jsx", ".json", ".scss"] },

  stats: {
    chunks: true,
    modules: false,
    chunkModules: false,
    chunkRootModules: true,
    chunkOrigins: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: "file-loader?name=assets/[name]-[hash].[ext]",
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: ["url-loader?limit=20480&name=assets/[name]-[hash].[ext]"],
        include: STATIC_PATH,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].bundle.css",
    }),

    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_PATH, "index.html"),
      scriptLoading: "defer",
    }),

    new ModuleFederationPlugin({
      name: "simple_component",
      library: { type: "var", name: "simple_component" },
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {},
      shared: {
        react: {
          eager: false,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: false,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],

  optimization: {
    moduleIds: "deterministic",
    chunkIds: "deterministic",
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
};

module.exports = webpackBaseConfig;
