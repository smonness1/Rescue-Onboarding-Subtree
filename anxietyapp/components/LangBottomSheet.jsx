import React, {forwardRef,useRef, useCallback, useImperativeHandle, useState} from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity, Text,
} from 'react-native';
import {COLORS, FONTS, LANGS, SIZES} from "../constants";
import {usePreferencesContext} from "../hooks";
import RadioGroup from "./RadioGroup";
import GenericButton from "./GenericButton";
import { components as localization } from '../localization';

const LangBottomSheet = forwardRef((props, ref) => {
    const { selectText, isRTL, setLanguage, language } = usePreferencesContext();
    const [isVisible, setIsVisible] = useState(false);
    const selectedLangRef = useRef(language)

    function close() {
        selectedLangRef.current = language;
        // setSelectedLang(language);
        setIsVisible(false)
    }

    const handleApprove = useCallback(() => {
        setLanguage(selectedLangRef.current)
        close()
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
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={close}
        >
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={close}
              style={styles.overlay(isRTL)}>
                <View style={[styles.bottomSheet]}>
                    <Text style={styles.title}>{selectText(localization.langBottomSheet.choose)}</Text>

                        <View style={{height: 12}}/>
                        {/*<TouchableOpacity>*/}
                        {/*    <Text>Hebrew</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity>*/}
                        {/*    <Text>English</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <RadioGroup
                          options={LANGS}
                          onSelectedOption={(lang) => {
                              selectedLangRef.current = lang;
                          }}
                          initialValue={language}
                        />
                        <View style={{height: 24}}/>
                        <GenericButton
                          additionalButtonStyles={styles.approveBtn}
                          onPress={handleApprove} text={selectText(localization.langBottomSheet.approve)} />
                    </View>
                </TouchableOpacity>
        </Modal>
    );
});

const styles = StyleSheet.create({
    overlay: (isRTL) => ({
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.33)',
        justifyContent: isRTL ? 'flex-start' : 'flex-end',
        alignItems: isRTL ? 'flex-end' : 'flex-start',
    }),
    bottomSheet: {
        width: '100%',
        height: 'auto',
        backgroundColor: COLORS.sidebar,
        padding: 24,
        elevation: 30,
        position: "absolute",
        bottom: 0,
        justifyContent: 'center',
    },
    navTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        textAlign: "center",
        color: '#000',
        fontFamily: 'Heebo_500Medium',
        fontSize: SIZES.md,
    },
    approveBtn: {
        width: 'auto',
        alignSelf: 'center'
    }
});


export default LangBottomSheet;
