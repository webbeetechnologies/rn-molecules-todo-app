import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import { useCallback } from 'react';
import { FC, useMemo } from 'react';

import type { TodoItem } from '~/store';
import { useTodo } from '~/store/hooks';

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

export const Todo: FC<Pick<TodoItem, 'id'>> = ({ id }: { id: string }) => {
    const {
        todo: { isDone, label },
        markAsDone,
        removeTodo,
    } = useTodo(id);
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
                <Checkbox status={isDone ? 'checked' : 'unchecked'} onChange={handleToggle} />
                <IconButton onPress={handleRemove} name="delete" />
            </View>
        );
    }, [Checkbox, IconButton, View, isDone, handleToggle, handleRemove, rightIcons]);

    return (
        <ListItem right={right}>
            <ListItem.Title style={styles}>{label}</ListItem.Title>
        </ListItem>
    );
};
