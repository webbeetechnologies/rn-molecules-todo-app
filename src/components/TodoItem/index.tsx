import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useCallback } from 'react';
import { FC, useMemo } from 'react';
import type { TextStyle } from 'react-native';

import type { TodoItem } from '~/store';
import { useTodo } from '~/store/hooks';

export const Todo: FC<Pick<TodoItem, 'id'>> = ({ id }: { id: string }) => {
    const {
        todo: { isDone, label },
        markAsDone,
    } = useTodo(id);
    const { ListItem, Checkbox } = useMolecules();

    const style = useMemo(
        () =>
            isDone
                ? ({
                      color: 'red',
                      textDecorationLine: 'line-through',
                  } as TextStyle)
                : {},
        [isDone],
    );

    const handleToggle = useCallback(() => {
        markAsDone({ id, isDone: !isDone });
    }, [markAsDone, id, isDone]);

    const right = useMemo(() => {
        return <Checkbox status={isDone ? 'checked' : 'unchecked'} onChange={handleToggle} />;
    }, [Checkbox, isDone, handleToggle]);

    return (
        <ListItem right={right}>
            <ListItem.Title style={style}>{label}</ListItem.Title>
        </ListItem>
    );
};
