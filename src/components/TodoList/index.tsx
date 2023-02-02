import { useMolecules } from '@bambooapp/bamboo-molecules';
import { FC, useMemo } from 'react';
import type { TextStyle } from 'react-native';

import type { TodoItem, TodoListState } from '~/store';
import { useTodo, useTodoState } from '~/store/hooks';

type Props = {
    filter?: (records: TodoListState['todos']) => TodoListState['todos'];
};

const defaultFilter = (record: TodoItem[]) => record;

const Todo = ({ id }: { id: string }) => {
    const todo = useTodo(id);
    const { Text } = useMolecules();
    const style = useMemo(
        () =>
            todo.isDone ? ({ color: 'red', textDecorationLine: 'line-through' } as TextStyle) : {},
        [todo.isDone],
    );
    return <Text style={style}>{todo.label}</Text>;
};

export const TodoList: FC<Props> = props => {
    const { filter = defaultFilter } = props;
    const { todos } = useTodoState();
    const { FlatList } = useMolecules();
    const records = useMemo(() => filter(todos), [filter, todos]);

    const renderItem = ({ item }: { item: TodoItem }) => <Todo id={item.id} />;

    return <FlatList data={records} renderItem={renderItem} />;
};
