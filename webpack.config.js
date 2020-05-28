const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const pathSrc = './src/scripts';
const pathTemplates = './src/templates';
const pathDist = path.resolve(__dirname, './dist');
const pathPublic = './scripts/';
const pathModules = './node_modules';

module.exports = env => {
    let mode = 'production';
    let watch = false;
    let devtool = false;

    if ('dev' === env) {
        mode = 'development';
        watch = true;
        devtool = 'inline-source-map';
    }

    return {
        entry: {
            app: `${pathSrc}/index`
        },
        output: {
            path: `${pathDist}/scripts`,
            publicPath: pathPublic,
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        target: 'electron-renderer',
        mode,
        watch,
        devtool,
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: [
                        { loader: 'ts-loader' }
                    ],
                    include: path.resolve(pathSrc)
                },
                {
                    test: /\.[jt]sx?$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                failOnError: true,
                                cache: true
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attributes: false
                            }
                        }
                    ],
                    include: path.resolve(pathTemplates)
                }
            ]
        },
        plugins: [
            // disable React DevTools offer console message
            new webpack.DefinePlugin({
                __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
                __ENVIRONMENT__: JSON.stringify(env)
            }),
            new HtmlWebPackPlugin({
                template: `${pathTemplates}/index.html`,
                filename: `${pathDist}/index.html`,
                minify: {
                    collapseWhitespace: true
                }
            })
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: [
                path.resolve(pathSrc),
                path.resolve(pathModules)
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    libs: {
                        // node modules imported non-dynamically
                        name: 'libs',
                        chunks: 'initial',
                        test: /node_modules/
                    }
                }
            },
            minimizer: [
                new UglifyJSPlugin({
                    cache: true,
                    parallel: true
                })
            ]
        },
        performance: {
            hints: false
        },
        watchOptions: {
            ignored: /node_modules/
        }
    };
};
