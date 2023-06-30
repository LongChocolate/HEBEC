module.exports = {
    presets: ['module:metro-react-native-babel-preset'],

    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        // ['@babel/plugin-proposal-class-properties', {loose: false}],
        ['@babel/plugin-proposal-export-namespace-from'],
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: {
                    '@': './src',
                },
            },
        ],
    ],
};
