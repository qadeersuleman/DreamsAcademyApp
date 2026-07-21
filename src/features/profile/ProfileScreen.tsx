import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Animated,
  StatusBar,
} from "react-native";
import Svg, { Path, Circle, Rect, Line, Text as SvgText, G } from "react-native-svg";
import { MOCK_USER } from "../../data/mockData";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const BackIcon = ({ size = 20, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UserIcon = ({ size = 20, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TrophyIcon = ({ size = 18, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 3h12v6a6 6 0 1 1-12 0V3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 18v3M9 21h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ size = 14, color = "#94A3B8" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = ({ size = 14, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} />
  </Svg>
);

const CheckCircleIcon = ({ size = 18, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M22 4L12 14.01l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SparklesIcon = ({ size = 18, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3v3M12 18v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M3 12h3M18 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const SettingsIcon = ({ size = 18, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LogoutIcon = ({ size = 18, color = "#EF4444" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17l5-5-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Chart Bar Sub-component ──────────────────────────────────────────────────

interface ChartBarProps {
  percentage: number;
  color: string;
  xOffset: number;
  label: string;
  delay: number;
}

const ChartBar: React.FC<ChartBarProps> = ({ percentage, color, xOffset, label, delay }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: percentage,
      duration: 1000,
      delay,
      useNativeDriver: false,
    }).start();
  }, [percentage, delay, animValue]);

  const barHeight = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0.1, 90],
  });

  const yOffset = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [110, 20],
  });

  return (
    <G>
      <Rect
        x={xOffset}
        y="20"
        width="16"
        height="90"
        fill="rgba(51, 65, 85, 0.3)"
        rx="4"
      />
      <AnimatedRect
        x={xOffset}
        y={yOffset}
        width="16"
        height={barHeight}
        fill={color}
        rx="4"
      />
      <SvgText
        x={xOffset + 8}
        y="126"
        fill="#94A3B8"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
      >
        {label}
      </SvgText>
    </G>
  );
};

// ─── Main Profile Screen ─────────────────────────────────────────────────────

interface ProfileProps {
  onLogout: () => void;
  onBack?: () => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ onLogout, onBack }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const chartData = [
    { label: "Maths", percentage: 55, color: "#10B981" },
    { label: "Phys", percentage: 70, color: "#3DBE7A" },
    { label: "Chem", percentage: 40, color: "#FFB020" },
    { label: "Comp", percentage: 85, color: "#7C5CFF" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
            <BackIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}
        <View style={styles.headerCenter}>
          <View style={styles.roleBadge}>
            <UserIcon size={12} color="#7C5CFF" />
            <Text style={styles.roleBadgeText}>STUDENT PROFILE</Text>
          </View>
          <Text style={styles.headerTitle}>Account & Performance</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: MOCK_USER.avatar }}
              style={styles.avatarImage}
            />
            <View style={styles.onlineBadge} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
            <View style={styles.userMetaRow}>
              <View style={styles.metaChip}>
                <Text style={styles.metaChipText}>FSc Class 12th</Text>
              </View>
              <View style={[styles.metaChip, styles.metaChipGold]}>
                <StarIcon size={10} color="#F59E0B" />
                <Text style={[styles.metaChipText, { color: '#F59E0B', marginLeft: 3 }]}>
                  {MOCK_USER.totalPoints} XP
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <ClockIcon color="#7C5CFF" size={16} />
              <Text style={styles.statLabel}>Study Volume</Text>
            </View>
            <Text style={styles.statValue}>6.4 hrs</Text>
            <Text style={styles.statSub}>Revision & Videos</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <SparklesIcon color="#10B981" size={16} />
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <Text style={styles.statValue}>82%</Text>
            <Text style={styles.statSub}>Syllabus coverage</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <StarIcon color="#F59E0B" size={14} />
              <Text style={styles.statLabel}>Quiz Accuracy</Text>
            </View>
            <Text style={styles.statValue}>91%</Text>
            <Text style={styles.statSub}>Average scores</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <TrophyIcon color="#EC4899" size={16} />
              <Text style={styles.statLabel}>Badges</Text>
            </View>
            <Text style={styles.statValue}>4 Unlocked</Text>
            <Text style={styles.statSub}>Out of 6 available</Text>
          </View>
        </View>

        {/* Subject Mastery Analytics Chart */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeading}>📊 Subject Mastery Analytics</Text>
          <View style={styles.chartContainer}>
            <Svg width="260" height="140" viewBox="0 0 260 140">
              <Line x1="40" y1="20" x2="240" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <Line x1="40" y1="65" x2="240" y2="65" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <Line x1="40" y1="110" x2="240" y2="110" stroke="#475569" strokeWidth="1.5" />

              <SvgText x="30" y="23" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">100%</SvgText>
              <SvgText x="30" y="68" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">50%</SvgText>
              <SvgText x="30" y="113" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">0%</SvgText>

              {chartData.map((data, index) => {
                const xOffset = 58 + index * 48;
                return (
                  <ChartBar
                    key={index}
                    percentage={data.percentage}
                    color={data.color}
                    xOffset={xOffset}
                    label={data.label}
                    delay={200 + index * 100}
                  />
                );
              })}
            </Svg>
          </View>
        </View>

        {/* Achievements Section */}
        <Text style={styles.sectionHeading}>🏆 Achievements & Badges</Text>
        <View style={styles.badgeList}>
          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconContainer, { borderColor: '#10B98125', backgroundColor: '#10B98110' }]}>
              <CheckCircleIcon size={20} color="#10B981" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>Quick Starter</Text>
              <Text style={styles.badgeDesc}>Completed your first study guide revision notes.</Text>
            </View>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconContainer, { borderColor: '#7C5CFF25', backgroundColor: '#7C5CFF10' }]}>
              <SparklesIcon size={20} color="#7C5CFF" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>Perfect Evaluator</Text>
              <Text style={styles.badgeDesc}>Scored 100% on a science diagnostic test module.</Text>
            </View>
          </View>
        </View>

        {/* App Settings / Preferences */}
        <Text style={styles.sectionHeading}>⚙️ App Preferences</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Dark Interface Theme</Text>
              <Text style={styles.settingSub}>Optimal reading mode for night study</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#334155", true: "#7C5CFF" }}
              thumbColor={darkMode ? "#FFFFFF" : "#94A3B8"}
            />
          </View>

          <View style={[styles.settingItem, styles.settingItemBorder]}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Study Reminders</Text>
              <Text style={styles.settingSub}>Notifications for daily test practice</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#334155", true: "#7C5CFF" }}
              thumbColor={notifications ? "#FFFFFF" : "#94A3B8"}
            />
          </View>

          <View style={[styles.settingItem, styles.settingItemBorder]}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Offline Mode Cache</Text>
              <Text style={styles.settingSub}>Access saved notes without active internet</Text>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: "#334155", true: "#7C5CFF" }}
              thumbColor={offlineMode ? "#FFFFFF" : "#94A3B8"}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={onLogout}
          activeOpacity={0.85}
        >
          <LogoutIcon size={20} color="#EF4444" />
          <Text style={styles.logoutBtnText}>LOG OUT OF ACCOUNT</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <View style={styles.versionFooter}>
          <Text style={styles.versionTitle}>DREAMS VIRTUAL ACADEMY</Text>
          <Text style={styles.versionSub}>Version 1.0.0 • Production Build</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C5CFF18',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#7C5CFF30',
  },
  roleBadgeText: {
    fontSize: 9,
    color: '#7C5CFF',
    fontWeight: '800',
    marginLeft: 5,
    letterSpacing: 0.6,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.2,
  },
  headerPlaceholder: {
    width: 38,
    height: 38,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  // User Card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#7C5CFF',
    backgroundColor: '#334155',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.2,
  },
  userEmail: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  metaChip: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaChipGold: {
    backgroundColor: '#F59E0B18',
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  metaChipText: {
    fontSize: 9,
    color: '#CBD5E1',
    fontWeight: '700',
  },
  // Section Card
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F1F5F9',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  statSub: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },
  // Achievements
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F1F5F9',
    marginTop: 8,
    marginBottom: 12,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  badgeList: {
    marginBottom: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    marginBottom: 10,
  },
  badgeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  badgeDesc: {
    fontSize: 10,
    color: '#94A3B8',
    lineHeight: 14,
  },
  // Settings Card
  settingsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  settingSub: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF444415',
    borderWidth: 1.5,
    borderColor: '#EF444440',
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 20,
  },
  logoutBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 0.6,
  },
  // Footer
  versionFooter: {
    alignItems: 'center',
    marginVertical: 8,
  },
  versionTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
  },
  versionSub: {
    fontSize: 8,
    color: '#475569',
    marginTop: 2,
  },
});

export default ProfileScreen;
