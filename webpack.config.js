module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./index.tsx",
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
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
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: "web",
}
