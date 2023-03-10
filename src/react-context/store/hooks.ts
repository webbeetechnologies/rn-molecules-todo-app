import { useContext, useMemo } from 'react';

import { TodoContext } from '~/react-context/store/todo-context';

export const useTodoState = () => {
    const state = useContext(TodoContext);
    if (state === null) {
        throw new Error(`Tried to read context outside of TodoProvider`);
    }
    return state;
};

export const useTodo = (todoId: string) => {
    const { todos, markAsDone, removeTodo, updateTodo } = useTodoState();
    const todo = todos.find(({ id }) => id === todoId);
    if (!todo) throw new Error(`Trying to read a todo [${todoId}] that doesn't exist`);

    return useMemo(
        () => ({ todo, markAsDone, removeTodo, updateTodo }),
        [todo, markAsDone, removeTodo, updateTodo],
    );
};
