const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    development: "./src/target/development/index.js",
    public: "./src/target/public/index.js",
    firefox: "./src/target/firefox/index.js",
    "firefox/popup": "./src/target/firefox/popup/index.js"
  },
  output: {
    filename: data => {
      switch (data.chunk.name) {
        default:
          return "[name]/index.js";
      }
    },
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
  },
  node: {
    global: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "sass-loader"
        ]
      },
      {
        type: "javascript/auto",
        test: /(?!popup)\.(json|svg)/,
        use: {
          loader: "file-loader",
          options: {
            name(file) {
              return file.replace(/^.+target\//, "");
            }
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: "window" // Placeholder for global used in any node_modules
    }),
    new HtmlWebpackPlugin({
      template: "src/target/development/index.html",
      filename: "development/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: "src/target/public/index.html",
      filename: "public/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: "src/target/firefox/popup/index.html",
      filename: "firefox/popup/index.html",
      chunks: []
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    })
  ]
};
