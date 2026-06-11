import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';

export function makeMutable(value) {
  return {
    _isReanimatedSharedValue: true,
    value,
    addListener: () => {},
    removeListener: () => {},
    modify: () => {},
  };
}

export function useSharedValue(initialValue) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = makeMutable(initialValue);
  }
  return ref.current;
}

export function useAnimatedStyle(updater, dependencies) {
  return useMemo(updater, dependencies);
}

export function withTiming(toValue, config, callback) {
  if (callback) {
    setTimeout(() => callback({ finished: true }), 0);
  }
  return toValue;
}

export function withSpring(toValue, config, callback) {
  if (callback) {
    setTimeout(() => callback({ finished: true }), 0);
  }
  return toValue;
}

export function withDelay(delay, nextAnimation) {
  return nextAnimation;
}

export function withSequence(...animations) {
  return animations[animations.length - 1];
}

export function withRepeat(animation, numberOfReps, reverse, callback) {
  if (callback) {
    setTimeout(() => callback({ finished: true }), 0);
  }
  return animation;
}

export function cancelAnimation(sharedValue) {}

export function interpolate(value, inputRange, outputRange) {
  return outputRange[0];
}

export const Extrapolate = {
  CLAMP: 'clamp',
  IDENTITY: 'identity',
  EXTEND: 'extend',
};

export function runOnJS(fn) {
  return fn;
}

const mockAnimation = {
  duration: () => mockAnimation,
  delay: () => mockAnimation,
  springify: () => mockAnimation,
};

export const FadeIn = mockAnimation;
export const FadeInDown = mockAnimation;
export const FadeInUp = mockAnimation;
export const ZoomIn = mockAnimation;
export const SlideInRight = mockAnimation;
export const FlipInEasyX = mockAnimation;

export const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t,
  cubic: (t) => t,
  poly: (n) => (t) => t,
  sin: (t) => t,
  circle: (t) => t,
  exp: (t) => t,
  elastic: (bounciness) => (t) => t,
  back: (s) => (t) => t,
  bounce: (t) => t,
  bezier: (x1, y1, x2, y2) => (t) => t,
  in: (easing) => easing,
  out: (easing) => easing,
  inOut: (easing) => easing,
};

export function getAnimatedStyle(val) {
  return {};
}

export function setUpTests() {}

export default Animated;
