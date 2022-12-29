const path = require('path');

module.exports = {
    entry: "./src/Main.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.css', '.ts', '.js']
    },
    output: {
        publicPath: '',
        filename: "index.js",
        path: path.resolve(__dirname,"")
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        }
    }
}