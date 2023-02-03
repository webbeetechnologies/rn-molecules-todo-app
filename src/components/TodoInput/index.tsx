import { TextInputProps, useComponentStyles } from '@bambooapp/bamboo-molecules';
import { FC, useCallback } from 'react';

import { useMolecules } from '../hooks';

type TodoInputProps = TextInputProps & {
    onCancel: () => void;
    onSave: () => void;
    value: string;
};

export const defaultStyles = {
    inputContainer: { flexGrow: 1 },
    saveButton: { height: 56, width: 50, borderWidth: 1, borderLeftWidth: 0 },
};

export const TodoInput: FC<TodoInputProps> = ({ style, onCancel, onSave, ...inputProps }) => {
    const { IconButton, ElementGroup, TextInput } = useMolecules();

    const right = useCallback(() => {
        return <IconButton name="cancel" onPress={onCancel} />;
    }, [IconButton, onCancel]);

    const { inputContainer, saveButton } = useComponentStyles('TodoInput');

    return (
        <ElementGroup style={style}>
            <TextInput
                variant="outlined"
                containerStyle={inputContainer}
                right={inputProps.value ? right : null}
                {...inputProps}
            />
            <IconButton
                name="content-save-all"
                variant="contained"
                style={saveButton}
                onPress={onSave}
            />
        </ElementGroup>
    );
};
