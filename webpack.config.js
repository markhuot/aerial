module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        contentBase: './public',
        proxy: {
            '/api/videos': {
                target: 'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json',
                ignorePath: true,
                changeOrigin: true,
                autoRewrite: true,
                protocolRewrite: true,
            }
        }
    }
}
