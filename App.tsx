import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Animated,
  Dimensions,
  BackHandler,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "./src/theme/Colors";
import {
  HomeIcon,
  BatchesIcon,
  TestsIcon,
  NotesIcon,
  VideosIcon,
  TrophyIcon,
  SparklesIcon,
} from "./src/shared/widgets/Icons";
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from "./src/features/auth/AuthScreens";
import { HomeScreen } from "./src/features/home/HomeScreen";
import { BatchesScreen } from "./src/features/batches/BatchesScreen";
import { TestsScreen } from "./src/features/tests/TestsScreen";
import { NotesScreen } from "./src/features/notes/NotesScreen";
import { YouTubeVideosScreen } from "./src/features/youtube/YouTubeVideosScreen";
import { ProgressScreen } from "./src/features/progress/ProgressScreen";
import { ProfileScreen } from "./src/features/profile/ProfileScreen";
import { SplashScreen } from "./src/shared/components/SplashScreen";
import { ExitConfirmModal } from "./src/shared/components/ExitConfirmModal";
import { ToastModal, ToastConfig } from "./src/shared/components/ToastModal";
import { UstadAiModal } from "./src/shared/components/UstadAiModal";
import { supabase } from "./src/lib/supabase";

const TABS = [
  { label: "Home", icon: HomeIcon },
  { label: "Batches", icon: BatchesIcon },
  { label: "Tests", icon: TestsIcon },
  { label: "Notes", icon: NotesIcon },
  { label: "Videos", icon: VideosIcon },
  { label: "Progress", icon: TrophyIcon },
];

const TAB_BAR_MARGIN = 14;
const TAB_CONTAINER_WIDTH = Dimensions.get("window").width - TAB_BAR_MARGIN * 2;
const TAB_BAR_PADDING_H = 4;
const INNER_TAB_WIDTH = (TAB_CONTAINER_WIDTH - TAB_BAR_PADDING_H * 2) / TABS.length;

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<"login" | "signup" | "forgot">("login");
  const [activeTab, setActiveTab] = useState(0);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [toast, setToast] = useState<ToastConfig>({ visible: false, message: "" });
  const [ustadAiVisible, setUstadAiVisible] = useState(false);

  // ─── Supabase Auth Session Listener ───────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session);
      setInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session);
      setInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sliding indicator position
  const indicatorX = useRef(new Animated.Value(0)).current;
  const contentSlideX = useRef(new Animated.Value(0)).current;
  const prevTabRef = useRef(0);
  const tabScales = useRef(TABS.map(() => new Animated.Value(1))).current;

  const handleNavigateToTab = (tabIndex: number) => {
    if (tabIndex === activeTab) return;

    const direction = tabIndex > prevTabRef.current ? 1 : -1;
    prevTabRef.current = tabIndex;
    const SCREEN_W = Dimensions.get("window").width;

    if (tabIndex < TABS.length) {
      Animated.sequence([
        Animated.timing(tabScales[tabIndex], {
          toValue: 1.15,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.spring(tabScales[tabIndex], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }

    Animated.timing(contentSlideX, {
      toValue: -direction * SCREEN_W,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tabIndex);
      contentSlideX.setValue(direction * SCREEN_W);

      if (tabIndex < TABS.length) {
        Animated.spring(indicatorX, {
          toValue: tabIndex * INNER_TAB_WIDTH,
          useNativeDriver: true,
          bounciness: 4,
          speed: 14,
        }).start();
      }

      Animated.spring(contentSlideX, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }).start();
    });
  };

  // Init indicator position on mount
  useEffect(() => {
    if (activeTab < TABS.length) {
      indicatorX.setValue(activeTab * INNER_TAB_WIDTH);
    }
  }, [activeTab, indicatorX]);

  // ─── Android Physical Back Button Handler ───────────────────────────────────
  useEffect(() => {
    const backAction = () => {
      if (ustadAiVisible) {
        setUstadAiVisible(false);
        return true;
      }

      // If not on Home tab → Return to Home tab
      if (activeTab !== 0) {
        handleNavigateToTab(0);
        return true;
      }

      // On Home tab → Show exit modal
      setExitModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [activeTab, ustadAiVisible]);

  if (initializing) {
    return <SplashScreen />;
  }

  if (!isLoggedIn) {
    if (authScreen === "signup") {
      return (
        <SignupScreen
          onLoginSuccess={() => setIsLoggedIn(true)}
          onNavigateToLogin={() => setAuthScreen("login")}
        />
      );
    }
    if (authScreen === "forgot") {
      return (
        <ForgotPasswordScreen
          onNavigateToLogin={() => setAuthScreen("login")}
        />
      );
    }
    return (
      <LoginScreen
        onLoginSuccess={() => setIsLoggedIn(true)}
        onNavigateToSignup={() => setAuthScreen("signup")}
        onNavigateToForgot={() => setAuthScreen("forgot")}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <HomeScreen
            onNavigateToTab={handleNavigateToTab}
            user={user}
          />
        );
      case 1:
        return <BatchesScreen user={user} onBack={() => handleNavigateToTab(0)} />;
      case 2:
        return <TestsScreen user={user} onBack={() => handleNavigateToTab(0)} />;
      case 3:
        return <NotesScreen onBack={() => handleNavigateToTab(0)} />;
      case 4:
        return <YouTubeVideosScreen onBack={() => handleNavigateToTab(0)} />;
      case 5:
        return <ProgressScreen user={user} onBack={() => handleNavigateToTab(0)} onNavigateToTab={handleNavigateToTab} />;
      case 6:
        return (
          <ProfileScreen
            user={user}
            onLogout={async () => {
              setToast({
                visible: true,
                type: "info",
                title: "Signed Out",
                message: "You have been successfully logged out. See you soon! 👋",
              });
              setTimeout(() => supabase.auth.signOut(), 1200);
            }}
            onBack={() => handleNavigateToTab(0)}
            onNavigateToTab={handleNavigateToTab}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigateToTab={handleNavigateToTab}
            user={user}
          />
        );
      }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Math.max(insets.top, 0),
        paddingBottom: 0,
      }}
    >
      {/* Tab content animation */}
      <Animated.View
        style={{
          flex: 1,
          overflow: "hidden",
          transform: [{ translateX: contentSlideX }],
        }}
      >
        {renderTabContent()}
      </Animated.View>

      {/* Floating Ustad AI Trigger Pill */}
      <TouchableOpacity
        style={[styles.floatingAiBtn, { bottom: Math.max(insets.bottom, 10) + 68 }]}
        activeOpacity={0.88}
        onPress={() => setUstadAiVisible(true)}
      >
        <View style={styles.aiGlowDot} />
        <SparklesIcon size={14} color="#F59E0B" />
        <Text style={styles.floatingAiBtnText}>Ask Ustad AI</Text>
      </TouchableOpacity>

      {/* Modern Floating Bottom Navigation Bar */}
      <View
        style={[
          styles.tabBarContainer,
          { bottom: Math.max(insets.bottom, 10) },
        ]}
      >
        {/* Sliding capsule indicator background */}
        {activeTab < TABS.length && (
          <Animated.View
            style={[
              styles.slidingIndicator,
              {
                width: INNER_TAB_WIDTH,
                transform: [{ translateX: indicatorX }],
              },
            ]}
          />
        )}

        <View style={styles.tabRow}>
          {TABS.map((tab, index) => {
            const isActive = activeTab === index;
            const IconComp = tab.icon;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleNavigateToTab(index)}
                activeOpacity={0.7}
                style={styles.tabItem}
              >
                <Animated.View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ scale: tabScales[index] }],
                  }}
                >
                  <IconComp
                    color={isActive ? Colors.accent : Colors.textLight}
                    size={17}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? Colors.accent : Colors.textLight,
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Ustad AI Interactive Modal */}
      <UstadAiModal
        visible={ustadAiVisible}
        onClose={() => setUstadAiVisible(false)}
      />

      {/* Toast Notification */}
      <ToastModal toast={toast} onHide={() => setToast((t) => ({ ...t, visible: false }))} />

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        visible={exitModalVisible}
        onCancel={() => setExitModalVisible(false)}
        onConfirm={() => {
          setExitModalVisible(false);
          BackHandler.exitApp();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floatingAiBtn: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1A29",
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(124, 92, 255, 0.4)",
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 99,
  },
  aiGlowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  floatingAiBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.2,
  },
  tabBarContainer: {
    position: "absolute",
    left: TAB_BAR_MARGIN,
    right: TAB_BAR_MARGIN,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    paddingVertical: 5,
    paddingHorizontal: TAB_BAR_PADDING_H,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  slidingIndicator: {
    position: "absolute",
    top: 5,
    left: TAB_BAR_PADDING_H,
    height: 44,
    backgroundColor: Colors.accentLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(124, 92, 255, 0.2)",
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 2,
    letterSpacing: -0.1,
  },
});

export default App;
