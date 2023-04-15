const path = require("path");
module.exports = {
    entry: "./src/js/index.js", // js 파일의 진입점
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"), // 절대경로 찾을 수 있도록
        clean: true
    },
    devtool: "source-map",
    mode: "development"
}