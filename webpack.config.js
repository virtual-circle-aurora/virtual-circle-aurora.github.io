const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const StyleLintPlugin = require("stylelint-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  //entry: "./src/index.js",
  entry: "./src/bundle.ts",

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/bundle.js"
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true, //autofixモードの有効化
          failOnError: true //エラー検出時にビルド中断
        }
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              url: false
            }
          },

          "postcss-loader"
        ]
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },

          "postcss-loader",

          "sass-loader"
        ]
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true
            }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, "docs"),
    open: true, //起動時にブラウザを開く
    overlay: true //エラーをオーバーレイ表示
  },

  plugins: [
    new CleanWebpackPlugin({ verbose: true }),

    new MiniCssExtractPlugin({
      filename: "css/bundle.css"
    }),

    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "img" },
        { from: "./src/favicon.png", to: "favicon.png" },
        { from: "./src/favicon.svg", to: "favicon.svg" }
      ]
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "70-80"
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256
      },
      svgo: {},
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true
        })
      ]
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug", //変換元のPugファイルの指定
      filename: "index.html", //出力するHTMLのファイル名
      inject: false, //バンドルしたjsファイルを読み込むscriptタグを自動出力しない
      minify: false //minifyしない
    }),

    new StyleLintPlugin({
      configFile: ".stylelintrc",
      fix: true //自動修正可能なものは修正
    })
  ],

  //import文で拡張子が.tsのファイルを解決する
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  }
};
