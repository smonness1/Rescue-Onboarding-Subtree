import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Example Usage:
 * <BreathingAnimation
 *     source={require("./emphasis-ball.png")}
 *     startColor="rgb(250, 223, 214)"
 *     endColor="rgb(180, 189, 212)"
 *     minScale={0.5}
 *     maxScale={1.5}
 *     growDuration={2000}
 *     shrinkDuration={3000}
 *     delay={1000}
 * />
 */

/**
 * An animation of a breathing ball
 * @param {Object} props
 * @param {ImageURISource} props.source The source of the breathing ball, e.g. `require("./emphasis-ball.png")` or `{ uri: "asset:/..." }`
 * @param {string} props.startColor The color of the breathing ball when it's small
 * @param {string} props.endColor The color of the breathing ball when it's large
 * @param {number} props.minScale The scale of the breathing ball when it's small (multiplied by the image resolution)
 * @param {number} props.maxScale The scale of the breathing ball when it's large (multiplied by the image resolution)
 * @param {number} props.growDuration The duration of the growing animation
 * @param {number} props.shrinkDuration The duration of the shrinking animation
 * @param {number} props.delay The delay between the growing and shrinking and vice versa
 * @param {object} props.additionalImageStyles Aditional styles props to add to the image
 */
const BreathingAnimation = ({
  source,
  startColor,
  endColor,
  minScale,
  maxScale,
  growDuration,
  shrinkDuration,
  delay,
  additionalImageStyles,
}) => {
  const scaleAnimation = useRef(new Animated.Value(minScale)).current;
  const tintColorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
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
      ])
    ).start();
  }, [scaleAnimation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(tintColorAnimation, {
          toValue: 1,
          duration: growDuration,
          useNativeDriver: true,
        }),
        Animated.delay(delay),
        Animated.timing(tintColorAnimation, {
          toValue: 0,
          duration: shrinkDuration,
          useNativeDriver: true,
        }),
        Animated.delay(delay),
      ])
    ).start();
  }, [tintColorAnimation]);

  return (
    <Animated.Image
      source={source}
      style={[
        {
          tintColor: tintColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [startColor, endColor],
          }),
          transform: [{ scale: scaleAnimation }],
        },
        additionalImageStyles,
      ]}
    />
  );
};

export default BreathingAnimation;
