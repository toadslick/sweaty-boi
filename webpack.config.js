const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    development: "./src/target/development/index.js",
    public: "./src/target/public/index.js",
    firefox: "./src/target/firefox/index.js"
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        loader: "url-loader"
      },
      {
        type: "javascript/auto",
        test: /\.json/,
        use: {
          loader: "file-loader",
          options: {
            name: "[folder]/[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
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
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    })
  ]
};
