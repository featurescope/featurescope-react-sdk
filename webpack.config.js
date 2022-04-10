module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./index.tsx",
  },
  externals: {
    react: "react",
    ["react-dom"]: "react-dom",
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
