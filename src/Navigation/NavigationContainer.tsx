import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { FC } from 'react';
import { useMemo } from 'react';

import { Example } from '~/Example';
import type { TodoListState } from '~/store/state.types';

const getScreen =
    (props): FC =>
    _props => {
        return <Example {...props} />;
    };

const Drawer = createDrawerNavigator();

export default function Navigator() {
    const { listScreen, completedScreen } = useMemo(
        () => ({
            listScreen: getScreen({
                filter: (records: TodoListState['todos']) => records,
            }),
            completedScreen: getScreen({
                filter: (records: TodoListState['todos']) => records.filter(({ isDone }) => isDone),
            }),
        }),
        [],
    );

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="all" children={listScreen} />
                <Drawer.Screen name="completed" children={completedScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
