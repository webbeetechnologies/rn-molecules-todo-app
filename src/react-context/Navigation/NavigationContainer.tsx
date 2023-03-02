import { useColorMode } from '@bambooapp/bamboo-molecules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import type { ComponentProps, FC } from 'react';
import { useMemo } from 'react';

import { TodoList } from '~/react-context/components/TodoList';
import { TodoProvider } from '~/react-context/store';
import type { TodoListState } from '~/react-context/store/state.types';

import { ColorModeToggle } from './components/ColorModeToggle';
import { DrawerIcon } from './components/DrawerIcon';

const getScreen =
    (props: Partial<ComponentProps<typeof TodoList>>): FC =>
    _props => {
        return <TodoList {...props} />;
    };

const Drawer = createDrawerNavigator();

const screenOptions: ComponentProps<typeof Drawer.Navigator>['screenOptions'] = _props => ({
    headerRight: _headerRightProps => <ColorModeToggle />,
    headerLeft: _headerLeftProps => <DrawerIcon />,
});

export default function Navigator() {
    const { colorMode } = useColorMode();

    const { listScreen, completedScreen } = useMemo(
        () => ({
            listScreen: {
                options: { title: 'All' },
                children: getScreen({
                    filter: (records: TodoListState['todos']) => records,
                }),
            },
            completedScreen: {
                options: { title: 'Completed' },
                children: getScreen({
                    filter: (records: TodoListState['todos']) =>
                        records.filter(({ isDone }) => isDone),
                }),
            },
        }),
        [],
    );

    return (
        <TodoProvider>
            <NavigationContainer theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
                <Drawer.Navigator screenOptions={screenOptions}>
                    <Drawer.Screen name="all" {...listScreen} />
                    <Drawer.Screen name="completed" {...completedScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}
