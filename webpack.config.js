const path = require('path')

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/Public');

const config = {
    // app.ts represents the entry point into your webapp
    // webpack will recursively go through every 'require' statement in app.ts
    entry: `${SRC_DIR}/Containers/root.jsx`,
    // tells webpack in what folder to store the bundled
    // javascript files and what name to give to final
    // bundled Javascript file
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    // lets webpack know what file extensions you plan on requiring
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extensions 
            // will be handles by ts-loader
            {
                test: /\.(js|jsx)$/, 
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0']
                }
            }
        ]
    }
}

module.exports = config