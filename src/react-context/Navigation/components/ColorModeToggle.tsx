import { useColorMode, useMolecules } from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ colorModeIcon: { marginHorizontal: 'spacings.2' } });

export const ColorModeToggle = () => {
    const { IconButton } = useMolecules();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            onPress={toggleColorMode}
            name={colorMode === 'light' ? 'weather-night' : 'weather-sunny'}
            style={styles.colorModeIcon}
        />
    );
};
