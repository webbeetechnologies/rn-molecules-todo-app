import uniqueId from 'lodash/uniqueId';
import { FC, memo, PropsWithChildren, useCallback, useMemo, useReducer } from 'react';

import {
    EnumTodoAction,
    PartialTodo,
    TodoAction,
    TodoItem,
    TodoListState,
} from '~/react-context/store/state.types';
import { TodoContext } from '~/react-context/store/todo-context';

const todoReducer = (state: TodoListState['todos'], action: TodoAction) => {
    const now = new Date();
    switch (action.type) {
        case EnumTodoAction.ADD:
            state = [
                ...state,
                {
                    id: uniqueId(),
                    label: action.payload.label,
                    isDone: false,
                    createdAt: now,
                    updatedAt: now,
                },
            ];
            break;
        case EnumTodoAction.REMOVE:
            state = state.filter(({ id }) => id !== action.payload.id);
            break;
        case EnumTodoAction.UPDATE:
            state = state.map(item =>
                item.id !== action.payload.id
                    ? item
                    : {
                          ...item,
                          ...action.payload,
                      },
            );
            break;
    }

    return state;
};

const todosMocks: TodoItem[] = [
    {
        id: uniqueId(),
        label: 'Item One',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDone: false,
    },
    {
        id: uniqueId(),
        label: 'Item Two',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDone: false,
    },
    {
        id: uniqueId(),
        label: 'Item Three',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDone: false,
    },
    {
        id: uniqueId(),
        label: 'Item Four',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDone: true,
    },
];

export const TodoProvider: FC<PropsWithChildren> = memo(props => {
    const [todoList, dispatch] = useReducer(todoReducer, todosMocks);

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
        (payload: PartialTodo) => dispatch({ type: EnumTodoAction.UPDATE, payload }),
        [dispatch],
    );

    const markAsDone = useCallback(
        (payload: PartialTodo) =>
            dispatch({
                type: EnumTodoAction.UPDATE,
                payload: { id: payload.id, isDone: payload.isDone ?? false },
            }),
        [dispatch],
    );

    const memoizedState = useMemo(
        () => ({
            todos: todoList,
            addTodo,
            removeTodo,
            updateTodo,
            markAsDone,
        }),
        [todoList, addTodo, removeTodo, markAsDone, updateTodo],
    );

    return <TodoContext.Provider value={memoizedState} {...props} />;
});
