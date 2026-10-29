import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
  ActivityIndicator,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import Colors from "../../theme/Colors";
import { supabase } from "../../lib/supabase";
import { ToastModal, ToastConfig } from "../../shared/components/ToastModal";
import { WhatsAppIcon } from "../../shared/widgets/Icons";

const { width, height } = Dimensions.get("window");

// Warm Theme Background Glow Blobs
const ThemeBackground: React.FC = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.topGlowBlob} />
      <View style={styles.bottomGlowBlob} />
    </View>
  );
};

// Eye toggle icon for passwords
const EyeIcon: React.FC<{ visible: boolean; color: string }> = ({ visible, color }) => {
  if (visible) {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
      </Svg>
    );
  }
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
};

// Modern Input Field matching App Theme
const ModernInput: React.FC<{
  icon: "user" | "mail" | "lock";
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences";
}> = ({ icon, label, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(translateY, {
      toValue: -2,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
  };

  const renderIcon = () => {
    const iconColor = isFocused ? Colors.accent : Colors.textMuted;
    switch (icon) {
      case "user":
        return (
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round"/>
            <Circle cx="12" cy="7" r="4" stroke={iconColor} strokeWidth="1.8"/>
          </Svg>
        );
      case "mail":
        return (
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={iconColor} strokeWidth="1.8"/>
            <Path d="M22 6l-10 7L2 6" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round"/>
          </Svg>
        );
      case "lock":
        return (
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
            <Path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" stroke={iconColor} strokeWidth="1.8"/>
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round"/>
          </Svg>
        );
      default:
        return null;
    }
  };

  const isPassword = secureTextEntry !== undefined;

  return (
    <Animated.View style={[{ marginBottom: 12 }, { transform: [{ translateY }] }]}>
      <Text style={[styles.inputLabel, isFocused && { color: Colors.accent }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <View style={{ marginRight: 8 }}>{renderIcon()}</View>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword ? !showPassword : false}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholder={`Enter your ${label.toLowerCase()}`}
          placeholderTextColor={Colors.textMuted}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 4 }}
            activeOpacity={0.7}
          >
            <EyeIcon visible={showPassword} color={isFocused ? Colors.accent : Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// Modern Button with Animation
const ModernButton: React.FC<{
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}> = ({ title, onPress, variant = "primary", loading, disabled }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
    onPress();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.85}
      disabled={disabled || loading}
      style={{ marginBottom: 10 }}
    >
      <Animated.View
        style={[
          styles.btnBase,
          variant === "primary" ? styles.btnPrimary : styles.btnSecondary,
          { transform: [{ scale }], opacity: disabled || loading ? 0.7 : 1 },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variant === "primary" ? "#FFFFFF" : Colors.accent} />
        ) : (
          <Text
            style={[
              styles.btnText,
              variant === "primary" ? styles.btnTextPrimary : styles.btnTextSecondary,
            ]}
          >
            {title}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─── LOGIN SCREEN ──────────────────────────────────────────────────────────
export const LoginScreen: React.FC<{
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
  onNavigateToForgot: () => void;
}> = ({ onLoginSuccess, onNavigateToSignup, onNavigateToForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastConfig>({ visible: false, message: "" });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setToast({
        visible: true,
        type: "error",
        title: "Missing Fields",
        message: "Please enter your email and password.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setToast({
          visible: true,
          type: "error",
          title: "Login Failed",
          message: error.message,
        });
      } else if (data.user) {
        setToast({
          visible: true,
          type: "success",
          title: "Welcome Back!",
          message: `Good to see you, ${
            data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Student"
          }! 🎉`,
        });
        setTimeout(() => onLoginSuccess(), 1200);
      }
    } catch (err: any) {
      setToast({
        visible: true,
        type: "error",
        title: "Error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ToastModal toast={toast} onHide={() => setToast((t) => ({ ...t, visible: false }))} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ThemeBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[{ width: "100%", maxWidth: 420 }, { opacity: fadeAnim }]}>
            {/* Logo and Brand Header */}
            <View style={styles.headerArea}>
              <Animated.View
                style={[
                  styles.logoWrapper,
                  { transform: [{ scale: logoScale }] },
                ]}
              >
                <Image
                  source={require("../../assets/logo-yellow.png")}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </Animated.View>

              <Text style={styles.brandTitle}>DREAMS VIRTUAL ACADEMY</Text>
              <Text style={styles.brandSindhi}>
                سنڌي شاگردن لاءِ سائنس، فزڪس ۽ نوڪرين جي تياري
              </Text>
              <Text style={styles.brandSubtitle}>Sign in to access your batches & mock tests</Text>
            </View>

            {/* Auth Form Card */}
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>Student Sign In</Text>

              <ModernInput
                icon="mail"
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <ModernInput
                icon="lock"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* Forgot Password Link */}
              <View style={styles.forgotRow}>
                <TouchableOpacity onPress={onNavigateToForgot} activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <ModernButton
                title="Sign In to Account"
                onPress={handleLogin}
                loading={loading}
              />

              {/* Switch to Signup */}
              <View style={styles.switchRow}>
                <Text style={styles.switchText}>Don't have an account? </Text>
                <TouchableOpacity onPress={onNavigateToSignup} activeOpacity={0.7}>
                  <Text style={styles.switchLink}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* WhatsApp Admission Assistance */}
            <TouchableOpacity
              style={styles.whatsappHelpPill}
              onPress={() =>
                Linking.openURL(
                  "https://wa.me/923018183624?text=Salam%20Sir%20Dilshad!%20I%20need%20help%20logging%20in%20to%20Dreams%20Academy."
                ).catch(() => {})
              }
              activeOpacity={0.8}
            >
              <WhatsAppIcon size={15} color="#10B981" />
              <Text style={styles.whatsappHelpText}>
                Need Help? Contact Sir Dilshad on WhatsApp (0301-8183624)
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// ─── SIGNUP SCREEN ─────────────────────────────────────────────────────────
export const SignupScreen: React.FC<{
  onLoginSuccess: () => void;
  onNavigateToLogin: () => void;
}> = ({ onLoginSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastConfig>({ visible: false, message: "" });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setToast({
        visible: true,
        type: "error",
        title: "Missing Fields",
        message: "Please fill in all fields.",
      });
      return;
    }

    if (password.length < 6) {
      setToast({
        visible: true,
        type: "error",
        title: "Weak Password",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        setToast({
          visible: true,
          type: "error",
          title: "Sign Up Failed",
          message: error.message,
        });
      } else if (data.user) {
        setToast({
          visible: true,
          type: "success",
          title: "Account Created!",
          message: `Welcome to Dreams Academy, ${name.trim()}! 🎓`,
        });
        setTimeout(() => onLoginSuccess(), 1400);
      }
    } catch (err: any) {
      setToast({
        visible: true,
        type: "error",
        title: "Error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ToastModal toast={toast} onHide={() => setToast((t) => ({ ...t, visible: false }))} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ThemeBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[{ width: "100%", maxWidth: 420 }, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.headerArea}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../assets/logo-yellow.png")}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </View>

              <Text style={styles.brandTitle}>Join Dreams Academy</Text>
              <Text style={styles.brandSindhi}>
                سنڌي ٻوليءَ ۾ آسان ترين تعليم — اڄ ئي داخلا وٺو
              </Text>
              <Text style={styles.brandSubtitle}>Create your free student account</Text>
            </View>

            {/* Form Card */}
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>Student Registration</Text>

              <ModernInput
                icon="user"
                label="Full Name (شاگرد جو نالو)"
                value={name}
                onChangeText={setName}
              />

              <ModernInput
                icon="mail"
                label="Email Address (اي ميل)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <ModernInput
                icon="lock"
                label="Password (پاسورڊ)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View style={styles.termsRow}>
                <Text style={styles.termsText}>
                  By creating an account, you agree to Dreams Virtual Academy's study guidelines.
                </Text>
              </View>

              {/* Submit Button */}
              <ModernButton
                title="Create Student Account"
                onPress={handleSignup}
                loading={loading}
              />

              {/* Switch to Login */}
              <View style={styles.switchRow}>
                <Text style={styles.switchText}>Already have an account? </Text>
                <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
                  <Text style={styles.switchLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// ─── FORGOT PASSWORD SCREEN ────────────────────────────────────────────────
export const ForgotPasswordScreen: React.FC<{
  onNavigateToLogin: () => void;
}> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMsg(null);
    if (!email.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ThemeBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ width: "100%", maxWidth: 420 }}>
            {/* Header */}
            <View style={styles.headerArea}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../assets/logo-yellow.png")}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.brandTitle}>Password Recovery</Text>
              <Text style={styles.brandSindhi}>پنهنجو اڪائونٽ پاسورڊ بحال ڪريو</Text>
            </View>

            <View style={styles.cardContainer}>
              {!submitted ? (
                <>
                  <Text style={styles.cardTitle}>Reset Your Password</Text>
                  <Text style={styles.cardSubtitle}>
                    Enter your email and we'll send you instructions to reset your password.
                  </Text>

                  {errorMsg && (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
                    </View>
                  )}

                  <ModernInput
                    icon="mail"
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <ModernButton
                    title="Send Reset Instructions"
                    onPress={handleSubmit}
                    loading={loading}
                  />

                  <ModernButton
                    title="Return to Sign In"
                    onPress={onNavigateToLogin}
                    variant="secondary"
                  />
                </>
              ) : (
                <View style={{ alignItems: "center", paddingVertical: 10 }}>
                  <View style={styles.successIconCircle}>
                    <Text style={{ fontSize: 28 }}>✉️</Text>
                  </View>
                  <Text style={styles.successTitle}>Check Your Inbox!</Text>
                  <Text style={styles.successDesc}>
                    We've sent password reset instructions to:{"\n"}
                    <Text style={{ fontWeight: "bold", color: Colors.accent }}>{email}</Text>
                  </Text>
                  <ModernButton
                    title="Back to Sign In"
                    onPress={onNavigateToLogin}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  topGlowBlob: {
    position: "absolute",
    top: -50,
    left: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(244, 196, 127, 0.35)",
  },
  bottomGlowBlob: {
    position: "absolute",
    bottom: -60,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(124, 92, 255, 0.12)",
  },
  headerArea: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoWrapper: {
    width: 76,
    height: 72,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "rgba(244, 196, 127, 0.7)",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.textDark,
    letterSpacing: 0.5,
    textAlign: "center",
    marginBottom: 2,
  },
  brandSindhi: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
    textAlign: "center",
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: "center",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 14,
    lineHeight: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textDark,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainerFocused: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentLight,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textDark,
    padding: 0,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 14,
    marginTop: 2,
  },
  forgotText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.accent,
  },
  btnBase: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    backgroundColor: Colors.accent,
  },
  btnSecondary: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  btnTextPrimary: {
    color: "#FFFFFF",
  },
  btnTextSecondary: {
    color: Colors.textDark,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  switchText: {
    fontSize: 11,
    color: Colors.textLight,
  },
  switchLink: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.accent,
  },
  termsRow: {
    marginBottom: 14,
  },
  termsText: {
    fontSize: 10,
    color: Colors.textMuted,
    lineHeight: 14,
    textAlign: "center",
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "700",
    textAlign: "center",
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.textDark,
    marginBottom: 6,
  },
  successDesc: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 16,
  },
  whatsappHelpPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  whatsappHelpText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textDark,
  },
});

export default LoginScreen;
