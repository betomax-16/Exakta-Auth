const Dotenv = require('dotenv-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    return {
        entry: './src/index.ts',
        mode: argv.mode,
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
              {
                test: /\.ts$/,
                use: [
                  'ts-loader',
                ]
              }
            ]
        },
        externals: [ nodeExternals() ],
        externalsPresets: {
            node: true 
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "./src/pages", to: "pages" },
                    { context: '.', from: "swagger", to: "swagger" }
                ],
            }),
            new Dotenv({
                path: `./${argv.mode}.env`
            })
        ],
    }
}