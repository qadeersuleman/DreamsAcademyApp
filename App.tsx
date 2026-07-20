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
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "./src/theme/Colors";
import { HomeIcon, TestsIcon, NotesIcon, VideosIcon, ProgressIcon } from "./src/shared/widgets/Icons";
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from "./src/features/auth/AuthScreens";
import { HomeScreen } from "./src/features/home/HomeScreen";
import { TestsScreen } from "./src/features/tests/TestsScreen";
import { NotesScreen } from "./src/features/notes/NotesScreen";
import { YouTubeVideosScreen } from "./src/features/youtube/YouTubeVideosScreen";
import { ProgressScreen } from "./src/features/progress/ProgressScreen";
import { SubjectsScreen } from "./src/features/subjects/SubjectsScreen";
import { Subject } from "./src/data/mockData";
import { ExitConfirmModal } from "./src/shared/components/ExitConfirmModal";

const TABS = [
  { label: "Home", icon: HomeIcon },
  { label: "Tests", icon: TestsIcon },
  { label: "Notes", icon: NotesIcon },
  { label: "Videos", icon: VideosIcon },
  { label: "Progress", icon: ProgressIcon },
];

const TAB_BAR_MARGIN = 16;
const TAB_CONTAINER_WIDTH = Dimensions.get("window").width - (TAB_BAR_MARGIN * 2);
const TAB_BAR_PADDING_H = 8; // paddingHorizontal on the pill container (each side)
const TAB_WIDTH = TAB_CONTAINER_WIDTH / TABS.length;
// Actual width per tab button (accounting for pill's paddingHorizontal on both sides)
const INNER_TAB_WIDTH = (TAB_CONTAINER_WIDTH - TAB_BAR_PADDING_H * 2) / TABS.length;

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.background}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<"login" | "signup" | "forgot">("login");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  // Animated sliding indicator position
  const indicatorX = useRef(new Animated.Value(0)).current;
  // Pure slide — NO opacity, so no white flash ever
  const contentSlideX = useRef(new Animated.Value(0)).current;
  // Track previous tab for slide direction
  const prevTabRef = useRef(0);

  // Scale variables for tab icons to create a nice micro-animation
  const tabScales = useRef(TABS.map(() => new Animated.Value(1))).current;

  const handleNavigateToTab = (tabIndex: number) => {
    if (tabIndex === activeTab) return;

    const direction = tabIndex > prevTabRef.current ? 1 : -1;
    prevTabRef.current = tabIndex;
    const SCREEN_W = Dimensions.get('window').width;

    // Tab icon pulse
    Animated.sequence([
      Animated.timing(tabScales[tabIndex], {
        toValue: 1.25,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(tabScales[tabIndex], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Slide out current screen instantly off-screen,
    // then instantly position new screen on the incoming side,
    // then spring it into place — ZERO opacity change, ZERO flash
    Animated.timing(contentSlideX, {
      toValue: -direction * SCREEN_W,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setSelectedSubject(null);
      setActiveTab(tabIndex);
      contentSlideX.setValue(direction * SCREEN_W);

      Animated.spring(indicatorX, {
        toValue: tabIndex * INNER_TAB_WIDTH,
        useNativeDriver: true,
        bounciness: 6,
        speed: 12,
      }).start();

      Animated.spring(contentSlideX, {
        toValue: 0,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSelectSubject = (subject: Subject | null) => {
    const SCREEN_W = Dimensions.get('window').width;
    if (subject) {
      // Open detail — slide out left, bring in from right
      Animated.timing(contentSlideX, {
        toValue: -SCREEN_W,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setSelectedSubject(subject);
        contentSlideX.setValue(SCREEN_W);
        Animated.spring(contentSlideX, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Go back — slide out right, bring in from left
      Animated.timing(contentSlideX, {
        toValue: SCREEN_W,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setSelectedSubject(null);
        contentSlideX.setValue(-SCREEN_W);
        Animated.spring(contentSlideX, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  // Init indicator position on mount
  useEffect(() => {
    indicatorX.setValue(activeTab * INNER_TAB_WIDTH);
  }, [activeTab,indicatorX]);

  // ─── Android Physical Back Button Handler ───────────────────────────────────
  useEffect(() => {
    const backAction = () => {
      // 1) Agar subject detail screen open hai → animated wapasi
      if (selectedSubject) {
        handleSelectSubject(null);
        return true;
      }

      // 2) Agar Home tab nahi hai → Home tab pe aao
      if (activeTab !== 0) {
        handleNavigateToTab(0);
        return true;
      }

      // 3) Home tab pe hain → custom animated exit confirmation modal
      setExitModalVisible(true);
      return true; // system ko back event handle karne se rokta hai
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup on unmount
    return () => backHandler.remove();
  }, [activeTab, selectedSubject,]);

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
    if (selectedSubject) {
      return (
        <SubjectsScreen
          selectedSubject={selectedSubject}
          onSelectSubject={handleSelectSubject}
        />
      );
    }

    switch (activeTab) {
      case 0:
        return (
          <HomeScreen
            onNavigateToTab={handleNavigateToTab}
            onSelectSubject={handleSelectSubject}
          />
        );
      case 1:
        return <TestsScreen />;
      case 2:
        return <NotesScreen onBack={() => handleNavigateToTab(0)} />;
      case 3:
        return <YouTubeVideosScreen onBack={() => handleNavigateToTab(0)} />;
      case 4:
        return <ProgressScreen onBack={() => handleNavigateToTab(0)} />;
      default:
        return (
          <HomeScreen
            onNavigateToTab={handleNavigateToTab}
            onSelectSubject={handleSelectSubject}
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
      {/* Tab content — pure slide, no opacity flash */}
      <Animated.View
        style={{
          flex: 1,
          overflow: 'hidden',
          transform: [{ translateX: contentSlideX }],
        }}
      >
        {renderTabContent()}
      </Animated.View>

      {/* Floating pill navigation bar (only show if not inside a selected subject detail view) */}
      {!selectedSubject && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom ,
            left: TAB_BAR_MARGIN,
            right: TAB_BAR_MARGIN,
            backgroundColor: "#FFFFFF",
            borderRadius: 32,
            paddingVertical: 10,
            paddingHorizontal: 8,
            shadowColor: Colors.textDark,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 10,
            borderWidth: 1,
            borderColor: Colors.primary + "20",
          }}
        >
          {/* Sliding capsule indicator background */}
          <Animated.View
            style={{
              position: "absolute",
              top: 8,
              left: TAB_BAR_PADDING_H,
              width: INNER_TAB_WIDTH,
              height: 44,
              backgroundColor: Colors.accent + "12", // Tinted glass highlight
              borderRadius: 22,
              borderWidth: 1,
              borderColor: Colors.accent + "18",
              transform: [{ translateX: indicatorX }],
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {TABS.map((tab, index) => {
              const isActive = activeTab === index;
              const IconComp = tab.icon;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleNavigateToTab(index)}
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                  }}
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
                      size={18}
                    />
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: isActive ? "800" : "600",
                        color: isActive ? Colors.accent : Colors.textLight,
                        marginTop: 2.5,
                        letterSpacing: 0.2,
                      }}
                    >
                      {tab.label}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

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

export default App;
