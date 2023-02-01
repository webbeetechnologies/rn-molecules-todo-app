import { ProvideMolecules } from '@bambooapp/bamboo-molecules';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '~/Navigation';

export default function () {
    return (
        <SafeAreaProvider>
            <ProvideMolecules>
                <NavigationContainer />
            </ProvideMolecules>
        </SafeAreaProvider>
    );
}
