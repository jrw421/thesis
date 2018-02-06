const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const SRC_DIR = path.join(__dirname, '/main_src');
const GUEST_SRC_DIR = path.join(__dirname, '/guest_src')
const DIST_DIR = path.join(__dirname, '/Public');

const config = {
    // app.ts represents the entry point into your webapp
    // webpack will recursively go through every 'require' statement in app.ts
    entry: {
        'main_dist': './main_src/index.jsx',
        'guest_dist': './guest_src/index.jsx'
    },
    // tells webpack in what folder to store the bundled
    // javascript files and what name to give to final
    // bundled Javascript file
    output: {
        path: __dirname,
        filename: '[name]/bundle.js'
    },
    // plugins: [
    //     new HTMLWebpackPlugin({
    //         inject: false,
    //         chunks: ['main_src'],
    //         filename: 'SRC/bundle.js'
    //     }),
    //     new HTMLWebpackPlugin({
    //         inject: false,
    //         chunks: ['SRC'],
    //         filename: 'Guest/bundle.js'
    //     })
    // ],
    // lets webpack know what file extensions you plan on requiring
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extensions
            // will be handles by ts-loader
            {
                test: /\.(js|jsx)$/,
                include: [SRC_DIR, GUEST_SRC_DIR],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0']
                }
            }
        ]
    },
    watch: true
}

module.exports = config
