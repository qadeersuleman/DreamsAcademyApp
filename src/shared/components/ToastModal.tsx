import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

export type ToastType = "success" | "error" | "info";

export interface ToastConfig {
  visible: boolean;
  message: string;
  type?: ToastType;
  title?: string;
}

interface ToastModalProps {
  toast: ToastConfig;
  onHide: () => void;
}

export const ToastModal: React.FC<ToastModalProps> = ({ toast, onHide }) => {
  const slideAnim = useRef(new Animated.Value(-120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast.visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [toast.visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -120,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  if (!toast.visible) return null;

  const type = toast.type || "success";

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "#064E3B"; // Dark Emerald
      case "error":
        return "#7F1D1D"; // Dark Red
      case "info":
      default:
        return "#312E81"; // Dark Indigo
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "#10B981";
      case "error":
        return "#EF4444";
      case "info":
      default:
        return "#6366F1";
    }
  };

  const renderIcon = () => {
    if (type === "success") {
      return (
        <View style={[styles.iconBox, { backgroundColor: "#10B98125" }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
            <Path d="M8 12l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      );
    }
    if (type === "error") {
      return (
        <View style={[styles.iconBox, { backgroundColor: "#EF444425" }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
            <Path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      );
    }
    return (
      <View style={[styles.iconBox, { backgroundColor: "#6366F125" }]}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="2" />
          <Path d="M12 16v-4M12 8h.01" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        </Svg>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {renderIcon()}
      <View style={styles.textContainer}>
        {toast.title ? (
          <Text style={styles.titleText}>{toast.title}</Text>
        ) : null}
        <Text style={styles.messageText}>{toast.message}</Text>
      </View>
      <TouchableOpacity onPress={hideToast} activeOpacity={0.7} style={styles.closeBtn}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  messageText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "600",
  },
  closeBtn: {
    padding: 6,
    marginLeft: 8,
  },
  closeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "bold",
  },
});
