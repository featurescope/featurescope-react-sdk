module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./index.tsx",
  },
  externals: {
    React: "react",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    path: __dirname,
    filename: "browser.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: "web",
}
