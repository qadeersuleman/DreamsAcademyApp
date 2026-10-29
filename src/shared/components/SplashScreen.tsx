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
import Colors from "../../theme/Colors";

const { width } = Dimensions.get("window");

export const SplashScreen: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance animation
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
            toValue: 1.04,
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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

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
            resizeMode="cover"
          />
        </Animated.View>

        {/* Tagline & Subtitle */}
        <Animated.View style={{ opacity: contentFade, alignItems: "center" }}>
          <Text style={styles.academyTitle}>DREAMS VIRTUAL ACADEMY</Text>
          <Text style={styles.sindhiSubtitle}>
            سنڌي شاگردن لاءِ سائنس ۽ نوڪرين جي تياري
          </Text>
          <Text style={styles.tagline}>WHERE DREAMS TAKE FLIGHT</Text>

          {/* Minimalist Modern Loading Dots */}
          <View style={styles.loadingContainer}>
            <View style={[styles.dot, styles.dotPurple]} />
            <View style={[styles.dot, styles.dotGold]} />
            <View style={[styles.dot, styles.dotDim]} />
          </View>
        </Animated.View>
      </View>

      {/* Footer Branding */}
      <Animated.View style={[styles.footer, { opacity: contentFade }]}>
        <Text style={styles.footerText}>Sindh's Premier Science & STS Academy • v2.0</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  glowBlob1: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(244, 196, 127, 0.35)",
  },
  glowBlob2: {
    position: "absolute",
    bottom: -80,
    right: -40,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(124, 92, 255, 0.12)",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 130,
    height: 125,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: "rgba(244, 196, 127, 0.6)",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  academyTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: Colors.textDark,
    letterSpacing: 0.6,
    textAlign: "center",
    marginBottom: 4,
  },
  sindhiSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.accent,
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 18,
  },
  tagline: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.textLight,
    letterSpacing: 1.2,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 20,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotPurple: {
    backgroundColor: Colors.accent,
  },
  dotGold: {
    backgroundColor: Colors.primaryDark,
  },
  dotDim: {
    backgroundColor: "#E2E8F0",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

export default SplashScreen;
