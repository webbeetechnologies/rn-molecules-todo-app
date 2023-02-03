import { useComponentStyles } from '@bambooapp/bamboo-molecules';
import { FC, useCallback } from 'react';
import type { TextInputProps } from 'react-native';

import { useMolecules } from '../hooks';

type TodoInputProps = TextInputProps & {
    onCancel: () => void;
    onSave: () => void;
};

export const defaultStyles = {
    container: { padding: 'spacings.4' },
    inputContainer: { flexGrow: 1 },
    saveButton: { height: 56, width: 50, borderWidth: 1, borderLeftWidth: 0 },
};

export const TodoInput: FC<TodoInputProps> = ({ value, onChangeText, onCancel, onSave }) => {
    const { IconButton, ElementGroup, TextInput } = useMolecules();

    const right = useCallback(() => {
        return <IconButton name="cancel" onPress={onCancel} />;
    }, [IconButton, onCancel]);

    const { container, inputContainer, saveButton } = useComponentStyles('TodoInput');

    return (
        <ElementGroup style={container}>
            <TextInput
                variant="outlined"
                containerStyle={inputContainer}
                onChangeText={onChangeText}
                value={value}
                right={value ? right : null}
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
