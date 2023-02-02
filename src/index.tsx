import { ProvideMolecules } from '@bambooapp/bamboo-molecules';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '~/Navigation';

import { components } from './components';

export default function () {
    return (
        <SafeAreaProvider>
            <ProvideMolecules components={components}>
                <NavigationContainer />
            </ProvideMolecules>
        </SafeAreaProvider>
    );
}
