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
} from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Particle Background Component
const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    startX: Math.random() * width,
    startY: Math.random() * height,
    opacity: new Animated.Value(0),
  }));

  useEffect(() => {
    particles.forEach((particle, index) => {
      Animated.timing(particle.opacity, {
        toValue: 0.2,
        duration: 1000,
        delay: index * 80,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View className="absolute w-full h-full overflow-hidden">
      {/* Decorative Blur Blobs */}
      <View 
        className="absolute w-72 h-72 rounded-full bg-indigo-600/10"
        style={{ top: -80, left: -60 }}
      />
      <View 
        className="absolute w-80 h-80 rounded-full bg-purple-600/10"
        style={{ bottom: -120, right: -60 }}
      />

      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          className="absolute bg-white/10 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.startX,
            top: particle.startY,
            opacity: particle.opacity,
          }}
        />
      ))}
    </View>
  );
};

// Modern Input Field with Floating Label
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
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const labelTranslateY = useRef(new Animated.Value(0)).current;
  const labelScale = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(translateY, {
      toValue: -4,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    Animated.spring(scale, {
      toValue: 1.02,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    Animated.spring(labelTranslateY, {
      toValue: -24,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    Animated.spring(labelScale, {
      toValue: 0.85,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    if (!value) {
      Animated.spring(labelTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        mass: 1,
        stiffness: 150,
      }).start();
      Animated.spring(labelScale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        mass: 1,
        stiffness: 150,
      }).start();
    }
  };

  const renderIcon = () => {
    const iconColor = isFocused ? "#7C5CFF" : "#9CA3AF";
    switch (icon) {
      case "user":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
            <Circle cx="12" cy="7" r="4" stroke={iconColor} strokeWidth="2"/>
          </Svg>
        );
      case "mail":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={iconColor} strokeWidth="2"/>
            <Path d="M22 6l-10 7L2 6" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
          </Svg>
        );
      case "lock":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" stroke={iconColor} strokeWidth="2"/>
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View 
      className="mb-6"
      style={{ transform: [{ translateY: translateY }, { scale: scale }] }}
    >
      <Animated.Text
        style={[
          {
            position: "absolute",
            left: 48,
            top: 14,
            zIndex: 1,
            fontSize: 13,
            fontWeight: "bold",
            transform: [{ translateY: labelTranslateY }, { scale: labelScale }],
          },
          { color: isFocused ? "#7C5CFF" : "#9CA3AF" }
        ]}
      >
        {label}
      </Animated.Text>
      <View
        className={`flex-row items-center rounded-2xl border-2 px-4 py-1.5 ${
          isFocused ? "border-accent bg-accent/5" : "border-white/10 bg-white/5"
        }`}
      >
        <View className="mr-3">
          {renderIcon()}
        </View>
        <TextInput
          className="flex-1 py-3 text-white font-semibold text-base"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="transparent"
        />
      </View>
    </Animated.View>
  );
};

// Modern Button with Animation
const ModernButton: React.FC<{
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  icon?: "log-in" | "user-plus" | "send" | "arrow-left";
}> = ({ title, onPress, variant = "primary", icon }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    onPress();
  };

  const renderIcon = () => {
    if (!icon) return null;
    const color = variant === "primary" ? "#FFFFFF" : "#7C5CFF";
    return (
      <View className="mr-2">
        <Text style={{ color, fontSize: 14 }}>
          {icon === "log-in" ? "→" : icon === "user-plus" ? "+" : icon === "send" ? "✉️" : "←"}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      className="mb-4"
    >
      <Animated.View
        style={{ transform: [{ scale }] }}
        className={`rounded-2xl py-4 px-6 flex-row items-center justify-center border ${
          variant === "primary" 
            ? "bg-accent border-accent/25" 
            : "bg-white/10 border-white/10"
        }`}
      >
        {renderIcon()}
        <Text
          className={`font-extrabold text-sm tracking-wider uppercase ${
            variant === "primary" ? "text-white" : "text-accent"
          }`}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main Login Screen
export const LoginScreen: React.FC<{
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
  onNavigateToForgot: () => void;
}> = ({ onLoginSuccess, onNavigateToSignup, onNavigateToForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    Animated.spring(logoScale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }).start();
    
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    onLoginSuccess();
  };

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" />
      <ParticleBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View className="px-6 py-8" style={{ opacity: fadeAnim }}>
            {/* Animated Logo Section */}
            <Animated.View 
              style={[
                { transform: [{ scale: logoScale }], opacity: logoOpacity },
                { alignItems: "center", marginBottom: 48 }
              ]}
            >
              <View className="w-20 h-20 rounded-3xl bg-accent items-center justify-center shadow-lg mb-4 border border-white/10">
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="white" />
                  <Path d="M6 12.5V17C6 19 8.67 20.5 12 20.5C15.33 20.5 18 19 18 17V12.5L12 15.5L6 12.5Z" fill="white" />
                </Svg>
              </View>
              <Text className="text-2xl font-black text-white text-center tracking-tight uppercase">
                Dreams Academy
              </Text>
              <Text className="text-[10px] text-accent font-extrabold text-center mt-1 uppercase tracking-widest">
                Where Dreams Take Flight
              </Text>
            </Animated.View>

            {/* Input Fields */}
            <View className="mb-4">
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
            </View>

            {/* Forgot Password Link */}
            <View className="items-end mb-8">
              <TouchableOpacity onPress={onNavigateToForgot}>
                <Text className="text-accent font-extrabold text-xs uppercase tracking-wide">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <ModernButton title="Sign In" onPress={handleLogin} icon="log-in" />

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400 text-xs font-semibold">Don't have an account? </Text>
              <TouchableOpacity onPress={onNavigateToSignup}>
                <Text className="text-accent font-extrabold text-xs uppercase tracking-wide">Create One</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login Section */}
            <View className="mt-10">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-white/10" />
                <Text className="text-gray-500 px-4 text-[9px] font-extrabold uppercase tracking-widest">OR CONTINUE WITH</Text>
                <View className="flex-1 h-px bg-white/10" />
              </View>
              <View className="flex-row justify-center space-x-4">
                {["G", "A", "F"].map((social, index) => (
                  <TouchableOpacity
                    key={social}
                    onPress={() => {}}
                    className="w-11 h-11 bg-white/5 border border-white/10 rounded-full items-center justify-center"
                  >
                    <Text className="text-gray-400 text-lg font-black">
                      {social}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// Sign Up Screen
export const SignupScreen: React.FC<{
  onLoginSuccess: () => void;
  onNavigateToLogin: () => void;
}> = ({ onLoginSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    onLoginSuccess();
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ParticleBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-12 pb-8">
            {/* Animated Header */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-3xl bg-accent items-center justify-center mb-4 border border-white/10">
                <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <Circle cx="9" cy="7" r="4" />
                  <Line x1="19" y1="8" x2="19" y2="14" />
                  <Line x1="16" y1="11" x2="22" y2="11" />
                </Svg>
              </View>
              <Text className="text-2xl font-black text-white text-center uppercase tracking-tight">
                Join the Journey
              </Text>
              <Text className="text-[10px] text-accent font-extrabold text-center mt-1 uppercase tracking-widest">
                Start your learning adventure today
              </Text>
            </View>

            {/* Form Fields */}
            <View className="mt-4">
              <ModernInput
                icon="user"
                label="Full Name"
                value={name}
                onChangeText={setName}
              />
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
            </View>

            {/* Terms and Conditions */}
            <View className="flex-row items-center justify-center mb-8">
              <View className="w-3.5 h-3.5 border border-accent rounded bg-accent/10 mr-2" />
              <Text className="text-gray-400 text-[9px] font-semibold">
                I agree to the{" "}
                <Text className="text-accent font-extrabold">Terms of Service</Text> and{" "}
                <Text className="text-accent font-extrabold">Privacy Policy</Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <ModernButton title="Create Account" onPress={handleSignup} icon="user-plus" />

            {/* Login Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400 text-xs font-semibold">Already have an account? </Text>
              <TouchableOpacity onPress={onNavigateToLogin}>
                <Text className="text-accent font-extrabold text-xs uppercase tracking-wide">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// Forgot Password Screen
export const ForgotPasswordScreen: React.FC<{
  onNavigateToLogin: () => void;
}> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;

  const handleSubmit = () => {
    if (!email) {
      Animated.sequence([
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    } else {
      setSubmitted(true);
    }
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ParticleBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <Animated.View style={{ transform: [{ translateX: shake }] }}>
          {!submitted ? (
            <>
              <View className="items-center mb-10">
                <View className="w-20 h-20 bg-white/5 border border-white/10 rounded-full items-center justify-center mb-4">
                  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </Svg>
                </View>
                <Text className="text-2xl font-black text-white text-center uppercase tracking-tight">
                  Forgot Password?
                </Text>
                <Text className="text-[10px] text-gray-400 text-center mt-1 uppercase tracking-wider">
                  Don't worry, it happens to the best of us
                </Text>
              </View>

              <View className="mt-4">
                <ModernInput
                  icon="mail"
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mt-8">
                <ModernButton
                  title="Send Reset Link"
                  onPress={handleSubmit}
                  icon="send"
                />
                <ModernButton
                  title="Back to Sign In"
                  onPress={onNavigateToLogin}
                  variant="secondary"
                  icon="arrow-left"
                />
              </View>
            </>
          ) : (
            <View className="items-center">
              <View className="w-24 h-24 rounded-full bg-green-500/15 items-center justify-center mb-6 border border-green-500/30">
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#3DBE7A" strokeWidth="2">
                  <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </View>
              <Text className="text-2xl font-black text-white text-center mb-2 uppercase tracking-tight">
                Check Your Email!
              </Text>
              <Text className="text-[10px] text-gray-400 text-center mb-8 leading-4">
                We've sent password reset instructions to{"\n"}
                <Text className="text-accent font-extrabold">{email}</Text>
              </Text>
              <ModernButton
                title="Return to Sign In"
                onPress={onNavigateToLogin}
                icon="log-in"
              />
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles for any missing Tailwind classes
const styles = {
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
  },
  blob1: {
    position: 'absolute',
    width: 288,
    height: 288,
    borderRadius: 999,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  blob2: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
};