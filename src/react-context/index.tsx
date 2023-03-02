import { extendTheme, ProvideMolecules } from '@bambooapp/bamboo-molecules';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { components } from './components';
import { theme } from './components/styles';
import { NavigationContainer } from './Navigation';

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
