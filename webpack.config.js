const path = require('path')

const config = {
    // app.ts represents the entry point into your webapp
    // webpack will recursively go through every 'require' statement in app.ts
    entry: ['./src/Containers/app.ts'],
    // tells webpack in what folder to store the bundled
    // javascript files and what name to give to final
    // bundled Javascript file
    output: {
        path: path.resolve(__dirname, 'Public'),
        filename: 'bundle.js'
    },
    // lets webpack know what file extensions you plan on requiring
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extensions 
            // will be handles by ts-loader
            {
                test: /\.tsx?$/, 
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config