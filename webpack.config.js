const path = require("path");

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
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["transform-class-properties"]
          }
        }
      }
    ]
  }
};
