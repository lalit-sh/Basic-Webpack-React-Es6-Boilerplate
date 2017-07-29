const path = require('path');
//process.env.NODE_ENV can be set using  (NODE_ENV='production') in terminal and command prompt.
const env = process.env.NODE_ENV || 'devlopment';

module.exports = {
    entry: './src/index.js', //single entry system
//  entry: ['./src/entry1.js', './src/entry2.js'], //multiple entry system using array, will use all the file defined in the array.
//  entry: {
//      entry1: './src/entery1.js',
//      entery2: './src/entery2.js
//  }, // multi entry system using object will use key as the file name when creating file.

    output: {
        path: path.resolve(__dirname, 'dist'), //output will be served on the dist directory at present at root level. You can set any path you want to save output.
        filename: 'bundle.js' //for single entry. Will save compiled file by name of bundle.js at dist directory.
//      filename: "[name].js" //for multi entry. Will output all the file defined by multiple entry points. Will use original file name in case of array and will use key as name in case of object.
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                // will test for js and jsx files while importing and will apply suitable loader for it
                test: /(\.jsx?$|\.js$)/,

                // will include all the files in app directory for the test
                //remove include to include all the files and folder in project.

//              include: [path.resolve(__dirname, "app"), path.resolve(__dirname, "src")],

                // will exclude the files and folders of directory defined in exclude.
                //use array for multiple values and absolute path for single values
                exclude: [path.resolve(__dirname, "node_modules")], 

                //will use babel-loader for the js and jsx file to compile
                loader: "babel-loader",

                //options for the loader
                //seprate .babelrc file can also be used in case of babel
                options: {
                    presets: ["es2015", "react"]
                },
            },
            // {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            //css loader
            {
				test   : /\.css$/,
				loader: "style-loader!css-loader?sourceMap"
			},
            //sass loader
            // {
			// 	test: /(\.sass$|\.scss$)/,
			// 	loader: ExtractTextPlugin.extract(
			// 		'style', // The backup style loader
			// 		'css?sourceMap!resolve-url!sass?sourceMap&includePaths[]=./sass',
			// 		{ publicPath: '../'}
			// 	)
			// },
        ]
    },
    //configuration for devlopment server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8080
    },
    //defining different plugins for production and development enviroment.
    plugins: env == 'production' ? [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: env // setting webpack env.
            }
        }),
        //plugins to reduce the file size by comprasing and uglifiying js for production
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
        }),
    ] : []
    //using null plugins for development.
}