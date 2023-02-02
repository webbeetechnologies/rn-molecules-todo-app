import { FC, memo, PropsWithChildren, useCallback, useMemo, useReducer } from 'react';

import {
    EnumTodoAction,
    PartialTodo,
    TodoAction,
    TodoItem,
    TodoListState,
} from '~/store/state.types';
import { TodoContext } from '~/store/todo-context';

const todoReducer = (state: TodoListState['todos'], action: TodoAction) => {
    switch (action.type) {
        case EnumTodoAction.ADD:
            break;
        case EnumTodoAction.REMOVE:
            break;
        case EnumTodoAction.UPDATE:
            break;
    }
    return state;
};

export const TodoProvider: FC<PropsWithChildren> = memo(props => {
    const [todoList, dispatch] = useReducer(todoReducer, []);

    const addTodo = useCallback(
        ({ label }: Pick<TodoItem, 'label'>) =>
            dispatch({ type: EnumTodoAction.ADD, payload: { label } }),
        [dispatch],
    );

    const removeTodo = useCallback(
        ({ id }: PartialTodo) => dispatch({ type: EnumTodoAction.REMOVE, payload: { id } }),
        [dispatch],
    );

    const updateTodo = useCallback(
        (payload: PartialTodo) => dispatch({ type: EnumTodoAction.REMOVE, payload }),
        [dispatch],
    );

    const memoizedState = useMemo(
        () => ({
            todos: todoList,
            addTodo,
            removeTodo,
            updateTodo,
        }),
        [todoList, addTodo, removeTodo, updateTodo],
    );

    return <TodoContext.Provider value={memoizedState} {...props} />;
});
