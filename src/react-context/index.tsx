import { extendTheme, ProvideMolecules } from '@bambooapp/bamboo-molecules';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '~/Navigation';

import { components } from './components';
import { theme } from './components/styles';

const extendedTheme = extendTheme(theme);

export default function () {
    return (
        <SafeAreaProvider>
            <ProvideMolecules components={components} theme={extendedTheme}>
                <NavigationContainer />
            </ProvideMolecules>
        </SafeAreaProvider>
    );
}
