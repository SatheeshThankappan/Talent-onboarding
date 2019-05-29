module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        Index: "./Index.jsx",
        test: "./test.js",
        Customers: "./Customers.jsx", 
        Products: "./Products.jsx",
        Stores: "./Stores.jsx",
        Sales: "./Sales.jsx",
       
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name]_bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    }
}

