import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from "react-native";
import Colors from "../../theme/Colors";

const { width: SCREEN_W } = Dimensions.get("window");

interface ExitConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

// ─── Animated Door Icon ────────────────────────────────────────────────────────
function DoorIcon({ swingAnim }: { swingAnim: Animated.Value }) {
  const rotate = swingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-30deg"],
  });

  return (
    <View style={styles.doorContainer}>
      {/* Door frame */}
      <View style={styles.doorFrame}>
        {/* Door panel that swings */}
        <Animated.View
          style={[
            styles.doorPanel,
            { transform: [{ perspective: 400 }, { rotateY: rotate }] },
          ]}
        >
          {/* Door knob */}
          <View style={styles.doorKnob} />
          {/* Door panel lines */}
          <View style={styles.doorPanelTop} />
          <View style={styles.doorPanelBottom} />
        </Animated.View>
      </View>
      {/* Arrow coming out */}
      <View style={styles.arrowContainer}>
        <View style={[styles.arrowLine]} />
        <View style={styles.arrowHead} />
      </View>
    </View>
  );
}

// ─── Floating Particles ────────────────────────────────────────────────────────
function Particle({
  delay,
  x,
  color,
}: {
  delay: number;
  x: number;
  color: string;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        { left: x, backgroundColor: color, transform: [{ translateY }], opacity },
      ]}
    />
  );
}

// ─── Main Modal Component ──────────────────────────────────────────────────────
export function ExitConfirmModal({
  visible,
  onCancel,
  onConfirm,
}: ExitConfirmModalProps) {
  // Backdrop fade
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  // Modal card scale + opacity
  const cardScale = useRef(new Animated.Value(0.7)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  // Icon container bounce
  const iconBounce = useRef(new Animated.Value(0)).current;
  // Door swing
  const doorSwing = useRef(new Animated.Value(0)).current;
  // Button shimmer
  const shimmer = useRef(new Animated.Value(0)).current;
  // Question mark pulse
  const qPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Reset
      backdropOpacity.setValue(0);
      cardScale.setValue(0.7);
      cardOpacity.setValue(0);
      iconBounce.setValue(0);
      doorSwing.setValue(0);

      // 1) Backdrop fade in
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      // 2) Card spring in
      Animated.parallel([
        Animated.spring(cardScale, {
          toValue: 1,
          bounciness: 14,
          speed: 10,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // 3) Icon bounce after card appears
      setTimeout(() => {
        Animated.sequence([
          Animated.spring(iconBounce, {
            toValue: -18,
            bounciness: 20,
            speed: 10,
            useNativeDriver: true,
          }),
          Animated.spring(iconBounce, {
            toValue: 0,
            bounciness: 8,
            speed: 12,
            useNativeDriver: true,
          }),
        ]).start();

        // Door swing animation (loop)
        Animated.loop(
          Animated.sequence([
            Animated.timing(doorSwing, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.back(2)),
              useNativeDriver: false,
            }),
            Animated.delay(400),
            Animated.timing(doorSwing, {
              toValue: 0,
              duration: 500,
              easing: Easing.in(Easing.back(1.5)),
              useNativeDriver: false,
            }),
            Animated.delay(600),
          ])
        ).start();
      }, 200);

      // 4) Button shimmer loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmer, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shimmer, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(800),
        ])
      ).start();

      // 5) Question mark pulse loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(qPulse, {
            toValue: 1.15,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(qPulse, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Dismiss animation
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 0.8,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const shimmerTranslate = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 260],
  });

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />

      <View style={styles.centeredView}>
        {/* Card */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardOpacity,
              transform: [{ scale: cardScale }],
            },
          ]}
        >
          {/* Floating particles */}
          <Particle delay={0} x={18} color={Colors.primary} />
          <Particle delay={400} x={SCREEN_W * 0.35} color={Colors.accentLight} />
          <Particle delay={800} x={SCREEN_W * 0.55} color={Colors.primary} />

          {/* Icon area */}
          <Animated.View
            style={[
              styles.iconWrapper,
              { transform: [{ translateY: iconBounce }] },
            ]}
          >
            {/* Glowing ring */}
            <View style={styles.iconGlowOuter}>
              <View style={styles.iconGlowInner}>
                <DoorIcon swingAnim={doorSwing} />
              </View>
            </View>

            {/* Question mark badge */}
            <Animated.View
              style={[styles.qBadge, { transform: [{ scale: qPulse }] }]}
            >
              <Text style={styles.qText}>?</Text>
            </Animated.View>
          </Animated.View>

          {/* Text */}
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.subtitle}>
            Do you want to exit the app?
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
              activeOpacity={0.75}
            >
              <Text style={styles.cancelText}>Stay</Text>
            </TouchableOpacity>

            {/* Exit — shimmer effect */}
            <TouchableOpacity
              style={styles.exitBtn}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              {/* Shimmer overlay */}
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerTranslate }] },
                ]}
              />
              <Text style={styles.exitText}>Exit App</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(74, 59, 47, 0.55)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  // ── Card ──
  card: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: 28,
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: Colors.primary + "60",
  },

  // ── Particles ──
  particle: {
    position: "absolute",
    top: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  // ── Icon ──
  iconWrapper: {
    marginTop: 12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlowOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary + "28",
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlowInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primary + "40",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Door SVG-like ──
  doorContainer: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },
  doorFrame: {
    width: 26,
    height: 38,
    borderWidth: 3,
    borderColor: Colors.textDark,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
  },
  doorPanel: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
    alignItems: "flex-end",
    paddingRight: 4,
    paddingTop: 10,
  },
  doorKnob: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.textDark,
  },
  doorPanelTop: {
    position: "absolute",
    top: 5,
    left: 4,
    right: 4,
    height: 11,
    borderRadius: 2,
    backgroundColor: Colors.primaryDark + "50",
  },
  doorPanelBottom: {
    position: "absolute",
    top: 20,
    left: 4,
    right: 4,
    height: 11,
    borderRadius: 2,
    backgroundColor: Colors.primaryDark + "50",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    marginTop: 6,
  },
  arrowLine: {
    width: 10,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 7,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: Colors.accent,
  },

  // ── Question Badge ──
  qBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.background,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  qText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 18,
  },

  // ── Text ──
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textDark,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  // ── Divider ──
  divider: {
    width: "85%",
    height: 1,
    backgroundColor: Colors.primary + "55",
    marginVertical: 22,
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textDark,
    letterSpacing: 0.3,
  },
  exitBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: [{ skewX: "-20deg" }],
  },
  exitText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
});

export default ExitConfirmModal;
