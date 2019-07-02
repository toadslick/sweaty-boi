const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    "dist/development": "./src/target/development/index.js",
    docs: "./src/target/docs/index.js",
    "dist/firefox": "./src/target/firefox/index.js",
    "dist/firefox/popup": "./src/target/firefox/popup/index.js",
    "dist/chrome": "./src/target/chrome/index.js",
    "dist/chrome/popup": "./src/target/chrome/popup/index.js"
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname)
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
        test: /(?!popup)\.(json|svg|png)/,
        use: {
          loader: "file-loader",
          options: {
            name(file) {
              const dir = file.match(/\/docs\//) ? "" : "dist/";
              return file.replace(/^.+target\//, dir);
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
      filename: "dist/development/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: "src/target/docs/index.html",
      filename: "docs/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: "src/target/firefox/popup/index.html",
      filename: "dist/firefox/popup/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: "src/target/chrome/popup/index.html",
      filename: "dist/chrome/popup/index.html",
      chunks: []
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    })
  ]
};
