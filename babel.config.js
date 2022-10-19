module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['module:react-native-dotenv', { moduleName: '@env', path: './.env' }],
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '~Storage': './src/Storage',
                    '~Screens': './src/Screens',
                    '~Navigation': './src/Navigation',
                    '~Utils': './src/Utils',
                    '~Components': './src/Components',
                    '~Api': './src/Api',
                    '~Types': './src/Types',
                },
                extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
            },
        ],
    ],
};
