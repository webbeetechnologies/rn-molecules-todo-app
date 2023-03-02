import { useControlledValue } from '@bambooapp/bamboo-molecules';
import { FC, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import type { TodoItem, TodoListState } from '~/react-context/store';
import { useTodoState } from '~/react-context/store/hooks';

import { useMolecules } from '../hooks';

type Props = {
    filter?: (records: TodoListState['todos']) => TodoListState['todos'];
};

const defaultFilter = (record: TodoItem[]) => record;

const styles = StyleSheet.create({ container: { padding: 'spacings.4' } });

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
        <TodoInput
            style={styles.container}
            value={value}
            onChangeText={setValue}
            onSave={onSave}
            onCancel={handleCancel}
        />
    );
};

export const TodoList: FC<Props> = props => {
    const { filter = defaultFilter } = props;
    const { todos } = useTodoState();
    const { FlatList, Todo } = useMolecules();
    const records = useMemo(() => filter(todos), [filter, todos]);

    const renderItem = useCallback(({ item }: { item: TodoItem }) => <Todo id={item.id} />, [Todo]);

    const keyExtractor = useCallback((item: TodoItem) => item.id, []);

    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={records}
            renderItem={renderItem}
            ListFooterComponent={ListFooter}
        />
    );
};
