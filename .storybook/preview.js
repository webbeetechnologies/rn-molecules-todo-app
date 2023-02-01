import { View } from 'react-native';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import isChromatic from 'chromatic/isChromatic';
import MoleculesProvider from "./addons/MoleculesProvider";



export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    MoleculesProvider,
    Story => (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Story />
        </View>
    ),
    isChromatic() ? mockDateDecorator : Story => <Story />,
];
