export type TodoListState = {
    todos: TodoItem[];
    addTodo: Action<AddTodo['payload']>;
    removeTodo: Action<RemoveTodo['payload']>;
    updateTodo: Action<UpdateTodo['payload']>;
};

type Action<T> = (args: T) => void;

export interface TodoItem {
    label: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDone: boolean;
}

export enum EnumTodoAction {
    ADD,
    REMOVE,
    UPDATE,
}

export type TodoAction = UpdateTodo | RemoveTodo | AddTodo;

export interface TodoActionBase {
    type: EnumTodoAction;
    payload?: unknown;
}

export type PartialTodo = Omit<Partial<TodoItem>, 'createdAt' | 'updatedAt'> & Pick<TodoItem, 'id'>;

export interface AddTodo extends TodoActionBase {
    type: EnumTodoAction.ADD;
    payload: Pick<TodoItem, 'label'>;
}

export interface RemoveTodo extends TodoActionBase {
    type: EnumTodoAction.REMOVE;
    payload: PartialTodo;
}

export interface UpdateTodo extends TodoActionBase {
    type: EnumTodoAction.UPDATE;
    payload: PartialTodo;
}
