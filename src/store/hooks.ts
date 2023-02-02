import { useContext } from 'react';

import { TodoContext } from '~/store/todo-context';

export const useTodoList = () => {
    const state = useContext(TodoContext);
    if (state === null) {
        throw new Error(`Tried to read context outside of TodoProvider`);
    }
    return state;
};

export const useTodo = (todoId: string) => {
    const todo = useTodoList().todos.find(({ id }) => id === todoId);
    if (!todo) throw new Error(`Trying to read a todo [${todoId}] that doesn't exist`);
    return todo;
};
