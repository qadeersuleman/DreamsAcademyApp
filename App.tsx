import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "./src/theme/Colors";
import { HomeIcon, TestsIcon, NotesIcon, VideosIcon, ProgressIcon } from "./src/shared/widgets/Icons";
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from "./src/features/auth/AuthScreens";
import { HomeScreen } from "./src/features/home/HomeScreen";
import { TestsScreen } from "./src/features/tests/TestsScreen";
import { NotesScreen } from "./src/features/notes/NotesScreen";
import { VideosScreen } from "./src/features/videos/VideosScreen";
import { ProgressScreen } from "./src/features/progress/ProgressScreen";
import { SubjectsScreen } from "./src/features/subjects/SubjectsScreen";
import { Subject } from "./src/data/mockData";

const TABS = [
  { label: "Home", icon: HomeIcon },
  { label: "Tests", icon: TestsIcon },
  { label: "Notes", icon: NotesIcon },
  { label: "Videos", icon: VideosIcon },
  { label: "Progress", icon: ProgressIcon },
];

const TAB_BAR_MARGIN = 16;
const TAB_CONTAINER_WIDTH = Dimensions.get("window").width - (TAB_BAR_MARGIN * 2);
const TAB_WIDTH = TAB_CONTAINER_WIDTH / TABS.length;

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

  // Animated sliding indicator position
  const indicatorX = useRef(new Animated.Value(0)).current;
  // Fade in for the tab content
  const contentOpacity = useRef(new Animated.Value(1)).current;

  // Scale variables for tab icons to create a nice micro-animation
  const tabScales = useRef(TABS.map(() => new Animated.Value(1))).current;

  const handleNavigateToTab = (tabIndex: number) => {
    if (tabIndex === activeTab) return;

    // Pulse animation on the selected tab icon
    Animated.sequence([
      Animated.timing(tabScales[tabIndex], {
        toValue: 1.25,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(tabScales[tabIndex], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade out → switch → fade in
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setSelectedSubject(null);
      setActiveTab(tabIndex);
      
      // Bouncy sliding indicator transition
      Animated.spring(indicatorX, {
        toValue: tabIndex * TAB_WIDTH,
        useNativeDriver: true,
        bounciness: 6,
        speed: 12,
      }).start();

      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSelectSubject = (subject: Subject | null) => {
    setSelectedSubject(subject);
  };

  // Init indicator position on mount
  useEffect(() => {
    indicatorX.setValue(activeTab * TAB_WIDTH);
  }, []);

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
        return <NotesScreen />;
      case 3:
        return <VideosScreen />;
      case 4:
        return <ProgressScreen />;
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
      {/* Tab content with fade transition */}
      <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
        {renderTabContent()}
      </Animated.View>

      {/* Floating pill navigation bar (only show if not inside a selected subject detail view) */}
      {!selectedSubject && (
        <View
          style={{
            position: "absolute",
            bottom: Math.max(insets.bottom, 12) + 6,
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
              left: 8,
              width: TAB_WIDTH,
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
    </View>
  );
}

export default App;
