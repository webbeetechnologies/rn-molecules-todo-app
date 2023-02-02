import { useMolecules } from '@bambooapp/bamboo-molecules';
import { FC, useMemo } from 'react';
import type { TextStyle } from 'react-native';

import type { TodoItem } from '~/store';
import { useTodo } from '~/store/hooks';

export const Todo: FC<Pick<TodoItem, 'id'>> = ({ id }: { id: string }) => {
    const todo = useTodo(id);
    const { Text } = useMolecules();

    const style = useMemo(
        () =>
            todo.isDone
                ? ({
                      color: 'red',
                      textDecorationLine: 'line-through',
                  } as TextStyle)
                : {},
        [todo.isDone],
    );

    return <Text style={style}>{todo.label}</Text>;
};
