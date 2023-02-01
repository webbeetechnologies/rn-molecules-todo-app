import { useMolecules } from '@bambooapp/bamboo-molecules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FC, useMemo } from 'react';

import { Example } from '~/Example';

const HomeScreen: FC = _props => {
    const { View } = useMolecules();
    const style = useMemo(() => ({ padding: 'spacings.8' }), []);
    return (
        <View style={style}>
            <Example />
        </View>
    );
};

const Drawer = createDrawerNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
