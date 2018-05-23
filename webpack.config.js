var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/client/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{ loader: 'css-loader', options: { url: false, sourceMap: true } }
			]
		  },{
              test: /\.scss$/,
              //loaders:['style-loader','css-loader','sass-loader']
              use:  [
                  MiniCssExtractPlugin.loader,
				  { loader: 'css-loader', options: { url: false, sourceMap: true } },
				  { loader: 'sass-loader', options: { sourceMap: true } }
                ],
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
    	  filename: `styles.css`
    	})
    ],
    watch: true
}
