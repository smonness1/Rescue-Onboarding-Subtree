import React, {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Pressable,
} from 'react-native';
import SideMenuButton from "./SideMenuButton";
import SideMenuItem from "./SideMenuItem";
import Divider from "./Divider";
import {COLORS} from "../constants";
import {usePreferencesContext} from "../hooks";
import {useNavigation} from "@react-navigation/native";
import { components as localization } from '../localization';

const SideMenuView = forwardRef((props, ref) => {
    const { selectText, isRTL } = usePreferencesContext();
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    function close() {
        setIsVisible(false)
    }

    const handleOpenExercises = useCallback(() => {
		    navigation.navigate('All');
    }, []);

    const handleOrderExercises = useCallback(() => {
        /**TODO: impl **/
    }, []);

    const handleMeditations = useCallback(() => {
        /**TODO: impl **/
    }, []);

    const handleContent = useCallback(() => {
        /**TODO: impl **/
    }, []);

    const handleSettings = useCallback(() => {
        navigation.navigate('Settings');
    }, []);


    // Expose methods to a parent component
    useImperativeHandle(ref, () => ({
        open: () => {
            setIsVisible(!isVisible);
        },
        close: () => {
            setIsVisible(false);
        },
    }));

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={close}
        >
            <Pressable style={styles.overlay(isRTL)} onPressOut={close} >
                <View style={[styles.sideNav]}>
                    <View style={styles.sideNavButton(isRTL)}>
                        <SideMenuButton sideNavRef={ref}/>
                    </View>

                    <View style={{height: 40}}/>
                    <SideMenuItem
                        title={selectText(localization.sideMenu.allExercises)}
                        handlePress={handleOpenExercises}
                    />
                    <SideMenuItem
                        enabled={false}
                        title={selectText(localization.sideMenu.sortExercises)}
                        handlePress={handleOrderExercises}
                    />
                    <Divider/>
                    <SideMenuItem
                        enabled={false}
                        title={selectText(localization.sideMenu.meditations)}
                        handlePress={handleMeditations}
                    />
                    <SideMenuItem
                        enabled={false}
                        title={selectText(localization.sideMenu.content)}
                        handlePress={handleContent}
                    />
                    {/*<Divider/>*/}
                    {/*<SideMenuItem*/}
                    {/*    title={selectText(localization.sideMenu.settings)}*/}
                    {/*    handlePress={handleSettings}*/}
                    {/*/>*/}
                </View>
            </Pressable>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        fontSize: 18,
        color: 'blue',
    },
    overlay: (isRTL) => ({
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.33)',
        justifyContent: isRTL ? 'flex-start' : 'flex-end',
        alignItems: isRTL ? 'flex-end' : 'flex-start',
    }),
    sideNav: {
        width: 212,
        height: '100%',
        backgroundColor: COLORS.sidebar,
        padding: 24,
        elevation: 30,
    },
    navTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sideNavButton: (isRTL) => ({
        alignSelf: isRTL ? 'flex-end': 'flex-start',
        top: 3,
        left: !isRTL ? 8 : null,
        right: isRTL ? 8 : null,
    })
});

export default SideMenuView;
