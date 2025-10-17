import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Example Usage:
 * <GrowAndShrink
 *   minScale={ 2 }
 *   maxScale={ 4 }
 *   growDuration={ 1000 }
 *   shrinkDuration={ 2000 }
 *   delay={ 500 }>
 *   <Text>Hi</Text>
 * </GrowAndShrink>
 */

/**
 * Grow and shrink the children once
 * @param {Object} props
 * @param {ReactNode | ReactNode[]} props.children
 * @param {number} props.minScale The scale the view starts at
 * @param {number} props.maxScale The scale the view finishes at
 * @param {number} props.growDuration The duration of the growing animation
 * @param {number} props.shrinkDuration The duration of the shrinking animation
 * @param {number} props.delay The delay between the growing and shrinking
 */
const GrowAndShrink = ({
  children,
  minScale,
  maxScale,
  growDuration,
  shrinkDuration,
  delay,
}) => {
  const scaleAnimation = useRef(new Animated.Value(minScale)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: maxScale,
        duration: growDuration,
        useNativeDriver: true,
      }),
      Animated.delay(delay),
      Animated.timing(scaleAnimation, {
        toValue: minScale,
        duration: shrinkDuration,
        useNativeDriver: true,
      }),
      Animated.delay(delay),
    ]).start();
  }, [scaleAnimation]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnimation }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default GrowAndShrink;
