import { useMolecules } from '@bambooapp/bamboo-molecules';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ drawerIcon: { marginHorizontal: 'spacings.2' } });

export const DrawerIcon = () => {
    const { IconButton } = useMolecules();
    const navigation = useNavigation();

    const toggleDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }, [navigation]);

    return <IconButton name={'menu'} onPress={toggleDrawer} style={styles.drawerIcon} />;
};
