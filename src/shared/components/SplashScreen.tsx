import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

export const SplashScreen: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance animation for the emblem
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Subtle pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // 3. Fade in text and indicator
    Animated.timing(contentFade, {
      toValue: 1,
      duration: 800,
      delay: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Background Decorative Glow Blobs */}
      <View style={styles.glowBlob1} />
      <View style={styles.glowBlob2} />

      <View style={styles.centerContent}>
        {/* Animated Brand Emblem & Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: Animated.multiply(logoScale, pulseAnim) }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Image
            source={require("../../assets/logo-yellow.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tagline & Subtitle */}
        <Animated.View style={{ opacity: contentFade, alignItems: "center" }}>
          <Text style={styles.tagline}>WHERE DREAMS TAKE FLIGHT</Text>

          {/* Minimalist Modern Loading Dots */}
          <View style={styles.loadingContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotDim]} />
            <View style={[styles.dot, styles.dotFaint]} />
          </View>
        </Animated.View>
      </View>

      {/* Footer Branding */}
      <Animated.View style={[styles.footer, { opacity: contentFade }]}>
        <Text style={styles.footerText}>Smart Education • FSc & Matric Prep</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  glowBlob1: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(245, 166, 35, 0.08)",
  },
  glowBlob2: {
    position: "absolute",
    bottom: -80,
    right: -40,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(124, 92, 255, 0.09)",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: width * 0.72,
    height: width * 0.65,
    maxWidth: 320,
    maxHeight: 280,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  tagline: {
    color: "#F5A623",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: 4,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#F5A623",
  },
  dotDim: {
    backgroundColor: "rgba(245, 166, 35, 0.45)",
  },
  dotFaint: {
    backgroundColor: "rgba(245, 166, 35, 0.2)",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    alignItems: "center",
  },
  footerText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

