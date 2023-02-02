import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import { useCallback } from 'react';
import { FC, useMemo } from 'react';

import type { TodoItem } from '~/store';
import { useTodo } from '~/store/hooks';

export const defaultStyles = {
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
    } = useTodo(id);
    const { ListItem, Checkbox } = useMolecules();

    const styles = useComponentStyles('Todo', null, {
        states: {
            isDone,
            isPending: !isDone,
        },
    });

    const handleToggle = useCallback(() => {
        markAsDone({ id, isDone: !isDone });
    }, [markAsDone, id, isDone]);

    const right = useMemo(() => {
        return <Checkbox status={isDone ? 'checked' : 'unchecked'} onChange={handleToggle} />;
    }, [Checkbox, isDone, handleToggle]);

    return (
        <ListItem right={right}>
            <ListItem.Title style={styles}>{label}</ListItem.Title>
        </ListItem>
    );
};
