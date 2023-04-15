const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    entry: "./src/js/index.js", // js 파일의 진입점
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"), // 절대경로 찾을 수 있도록
        clean: true
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        host: "localhost",
        port: 8080,
        open: true, // 새창열기
        watchFiles: 'index.html'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "keyboard",
            template: "./index.html",
            inject: "body", // 자바스크립느를 body에 넣겠다는 의미 (넣지않으면 header에 들어감)
            favicon: "./favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // css 파일을
                use: [MiniCssExtractPlugin.loader, "css-loader"] // 이 로더를 사용하여 불러들이겠다는 의미
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}