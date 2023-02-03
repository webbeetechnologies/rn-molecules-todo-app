import { useControlledValue } from '@bambooapp/bamboo-molecules';
import { FC, useCallback, useMemo } from 'react';

import type { TodoItem, TodoListState } from '~/store';
import { useTodoState } from '~/store/hooks';

import { useMolecules } from '../hooks';

type Props = {
    filter?: (records: TodoListState['todos']) => TodoListState['todos'];
};

const defaultFilter = (record: TodoItem[]) => record;

const ListFooter = () => {
    const { TodoInput } = useMolecules();
    const { addTodo } = useTodoState();
    const [value, setValue] = useControlledValue({
        defaultValue: '',
    });

    const handleCancel = useCallback(() => {
        setValue('');
    }, [setValue]);

    const onSave = useCallback(() => {
        addTodo({ label: value });
        setValue('');
    }, [value, addTodo, setValue]);

    return (
        <TodoInput value={value} onChangeText={setValue} onSave={onSave} onCancel={handleCancel} />
    );
};

export const TodoList: FC<Props> = props => {
    const { filter = defaultFilter } = props;
    const { todos } = useTodoState();
    const { FlatList, Todo } = useMolecules();
    const records = useMemo(() => filter(todos), [filter, todos]);

    const renderItem = ({ item }: { item: TodoItem }) => <Todo id={item.id} />;

    return <FlatList data={records} renderItem={renderItem} ListFooterComponent={ListFooter} />;
};
