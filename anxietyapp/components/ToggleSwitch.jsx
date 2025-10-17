import React, {useEffect, useRef} from "react";
import {
    StyleSheet,
    View,
    Animated,
    Pressable,
} from "react-native";

const dimensions = {
    width: 60,
    padding: 16,
    circleWidth: 18,
    circleHeight: 18,
    translateX: 36,
};

export default function ToggleSwitch({
  isOn,
  onBgColor,
  offBgColor,
  thumbOnStyle,
  thumbOffStyle,
  trackOnStyle,
  trackOffStyle,
  onChange,
  icon,
  disabled,
  animationSpeed,
  circleColor,
  circleColorOff,
  hitSlop,
  borderRadius,
  isRTL,
}) {
    const offsetX = useRef(new Animated.Value(0)).current;

    const createToggleSwitchStyle = () => [
        {
            justifyContent: "center",
            width: dimensions.width,
            borderRadius: borderRadius ?? 10,
            borderColor: onBgColor,
            borderWidth: 2,
            padding: dimensions.padding,
            backgroundColor: isOn ? onBgColor : offBgColor,
            paddingBottom: dimensions.padding,
        },
        isOn ? trackOnStyle : trackOffStyle,
    ];

    const createInsideCircleStyle = () => [
        {
            alignItems: "center",
            justifyContent: "center",
            margin: 4,
            left: 4,
            position: "absolute",
            backgroundColor: isOn ? circleColor : (circleColorOff ?? circleColor),
            transform: [{translateX: offsetX}],
            width: dimensions.circleWidth,
            height: dimensions.circleHeight,
            borderRadius: dimensions.circleWidth / 2,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.5,
            elevation: 1.5,
        },
        isOn ? thumbOnStyle : thumbOffStyle,
    ];

    useEffect(() => {
        let toValue;
        if (isOn) {
            toValue = dimensions.width - dimensions.translateX;
        }

        Animated.timing(offsetX, {
            toValue,
            duration: animationSpeed,
            useNativeDriver: true
        }).start();
    }, [isOn]);

    return (
        <View>

            <View style={{  }}>
                <View
                    style={{
                        backgroundColor: isOn ? onBgColor : 'transparent',
                        width: 61,
                        height: 36,
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity:  0.4,
                        shadowRadius: 3,
                        elevation: isOn ? 5 : 0,
                        borderRadius: borderRadius,
                    }}
                >
                    <View style={[styles.container(isRTL)]}>
                        <Pressable
                            style={createToggleSwitchStyle()}
                            activeOpacity={0.8}
                            hitSlop={hitSlop}
                            onPress={() => (disabled ? null : onChange(!isOn))}
                        >
                            <Animated.View style={createInsideCircleStyle()}>{icon}</Animated.View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>

    );
};



const styles = StyleSheet.create({
    container: (isRTL) => ({
        flexDirection: "row",
        alignItems: "center",
        overflow: 'hidden',
        zIndex: 100,
        transform: [{rotateY: isRTL ? '180deg' : "0deg"}],
    }),
    labelStyle: {
        marginHorizontal: 10,
    },
});
