import React, { useState, useEffect } from "react";
import { Animated, Text } from "react-native";

export default function RevealingText({
  text,
  duration,
  startColor,
  endColor,
  textStyle,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();

    if (currentIndex < text.length) {
      const interval = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      }, duration);
      return () => clearTimeout(interval);
    }
  }, [currentIndex, fadeValue, text]);

  const fadeColor = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startColor, endColor],
  });

  fadeValue.setValue(0);
  return (
    <Text style={textStyle}>
      <Text style={{ color: endColor }}>
        {text.substring(0, currentIndex - 1)}
      </Text>
      <Animated.Text style={{ color: fadeColor }}>
        {text[currentIndex - 1]}
      </Animated.Text>
      <Text style={{ color: startColor }}>{text.substring(currentIndex)}</Text>
    </Text>
  );
}
