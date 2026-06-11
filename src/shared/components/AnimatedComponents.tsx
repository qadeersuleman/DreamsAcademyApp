import React, { useRef, useEffect } from "react";
import { Animated, Pressable, View, StyleProp, ViewStyle } from "react-native";

interface BouncyPressableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
}

export const BouncyPressable: React.FC<BouncyPressableProps> = ({
  onPress,
  style,
  children,
  disabled,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 60,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 12,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

interface FadeInUpProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  delay = 0,
  duration = 400,
  children,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        speed: 12,
        bounciness: 3,
      }),
    ]).start();
  }, [delay, duration]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

interface BreathingViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const BreathingView: React.FC<BreathingViewProps> = ({ children, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.04,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      {children}
    </Animated.View>
  );
};

interface AnimatedProgressBarProps {
  progress: number; // 0 to 1
  color: string;
  height?: number;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  color,
  height = 4,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 650,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthPercent = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="w-full bg-textLight/10 rounded-full overflow-hidden" style={{ height }}>
      <Animated.View
        className="h-full rounded-full"
        style={{
          backgroundColor: color,
          width: widthPercent,
        }}
      />
    </View>
  );
};
