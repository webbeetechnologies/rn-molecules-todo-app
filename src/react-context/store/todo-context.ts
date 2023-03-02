import { createContext } from 'react';

import type { TodoListState } from '~/react-context/store/state.types';

export const TodoContext = createContext<TodoListState | null>(null);
