import { createContext } from 'react';

import type { TodoListState } from '~/store/state.types';

export const TodoContext = createContext<TodoListState | null>(null);
