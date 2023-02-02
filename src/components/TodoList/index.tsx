import { FC, useMemo } from 'react';

import type { TodoItem, TodoListState } from '~/store';
import { useTodoState } from '~/store/hooks';

import { useMolecules } from '../hooks';

type Props = {
    filter?: (records: TodoListState['todos']) => TodoListState['todos'];
};

const defaultFilter = (record: TodoItem[]) => record;

export const TodoList: FC<Props> = props => {
    const { filter = defaultFilter } = props;
    const { todos } = useTodoState();
    const { FlatList, Todo } = useMolecules();
    const records = useMemo(() => filter(todos), [filter, todos]);

    const renderItem = ({ item }: { item: TodoItem }) => <Todo id={item.id} />;

    return <FlatList data={records} renderItem={renderItem} />;
};
