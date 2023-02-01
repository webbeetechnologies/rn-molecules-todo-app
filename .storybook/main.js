module.exports = {
    stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
        'storybook-addon-performance/register',
        {
            name: "@storybook/addon-coverage",
            options: {
                istanbul: {
                    excludeNodeModules: true,
                },
            },
        },
    ],
    features: {
        interactionsDebugger: true,
    },
    framework: '@storybook/react',
};
