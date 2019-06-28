const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    development: "./src/target/development/index.js"
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
  devtool: "source-map",
  // watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/target/development/index.html",
      filename: "development/index.html",
      chunks: []
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    })
  ]
};
