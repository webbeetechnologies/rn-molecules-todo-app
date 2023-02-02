import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { ComponentProps, FC } from 'react';
import { useMemo } from 'react';

import { TodoList } from '~/components/TodoList';
import { TodoProvider } from '~/store';
import type { TodoListState } from '~/store/state.types';

const getScreen =
    (props: Partial<ComponentProps<typeof TodoList>>): FC =>
    _props => {
        return <TodoList {...props} />;
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
        <TodoProvider>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="all" children={listScreen} />
                    <Drawer.Screen name="completed" children={completedScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}
