import { useComponentStyles, useControlledValue, useToggle } from '@bambooapp/bamboo-molecules';
import { useCallback, useEffect } from 'react';
import { FC, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import type { TodoItem } from '~/react-context/store';
import { useTodo } from '~/react-context/store/hooks';

import { useMolecules } from '../hooks';

export const defaultStyles = {
    rightIconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 'spacings.2',
    },
    states: {
        isPending: {},
        isDone: {
            color: 'red',
            textDecorationLine: 'line-through',
        },
    },
};

type EditValueProps = {
    todo: TodoItem;
    style: ViewStyle;
    onChange: (arg: Partial<TodoItem> & Pick<TodoItem, 'id'>) => void;
};

export const MaybeEditValue: FC<EditValueProps> = ({ style, todo, onChange }) => {
    const { ListItem, TodoInput } = useMolecules();
    const { state: isEdit, onToggle: toggleIsEdit, setState: setIsEdit } = useToggle();

    const [value, setValue] = useControlledValue({
        defaultValue: todo.label,
    });

    const handleSave = useCallback(() => {
        setIsEdit(false);
        onChange({ label: value, id: todo.id });
    }, [setIsEdit, onChange, value, todo.id]);

    const handleChange = useCallback(
        (label: string) => {
            setValue(label);
        },
        [setValue],
    );

    const handleCancel = useCallback(() => {
        setIsEdit(false);
        setValue(todo.label);
    }, [setIsEdit, setValue, todo.label]);

    useEffect(() => {
        setIsEdit(false);
    }, [setIsEdit, todo.isDone]);

    if (!isEdit || todo.isDone) {
        return (
            <ListItem.Title onPress={todo.isDone ? undefined : toggleIsEdit} style={style}>
                {todo.label}
            </ListItem.Title>
        );
    }

    return (
        <TodoInput
            value={value}
            onCancel={handleCancel}
            onSave={handleSave}
            onChangeText={handleChange}
        />
    );
};

export const Todo: FC<Pick<TodoItem, 'id'>> = ({ id }: { id: string }) => {
    const { todo, markAsDone, removeTodo, updateTodo } = useTodo(id);

    const isDone = todo.isDone;
    const { Checkbox, IconButton, ListItem, View } = useMolecules();

    const componentStyles = useComponentStyles(
        'Todo',
        {},
        {
            states: {
                isDone,
                isPending: !isDone,
            },
        },
    );

    const { styles, rightIcons } = useMemo(() => {
        const { rightIconContainer, ..._styles } = componentStyles;
        return {
            styles: _styles,
            rightIcons: rightIconContainer,
        };
    }, [componentStyles]);

    const handleToggle = useCallback(() => {
        markAsDone({ id, isDone: !isDone });
    }, [markAsDone, id, isDone]);

    const handleRemove = useCallback(() => {
        removeTodo({ id });
    }, [removeTodo, id]);

    const right = useMemo(() => {
        return (
            <View style={rightIcons}>
                <Checkbox value={isDone} onChange={handleToggle} />
                <IconButton onPress={handleRemove} name="delete" />
            </View>
        );
    }, [Checkbox, IconButton, View, isDone, handleToggle, handleRemove, rightIcons]);

    return (
        <ListItem right={right}>
            <MaybeEditValue todo={todo} style={styles} onChange={updateTodo} />
        </ListItem>
    );
};
