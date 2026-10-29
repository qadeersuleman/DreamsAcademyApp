import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Linking,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import Colors from "../../theme/Colors";
import {
  WhatsAppIcon,
  SparklesIcon,
  TrophyIcon,
  BackIcon,
  BatchesIcon,
  NotesIcon,
} from "../../shared/widgets/Icons";

const UserIcon = ({ size = 18, color = Colors.accent }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
  </Svg>
);

const LogoutIcon = ({ size = 16, color = "#EF4444" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17l5-5-5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

interface ProfileProps {
  user?: any;
  onLogout: () => void;
  onBack?: () => void;
  onNavigateToTab?: (tab: number) => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({
  user,
  onLogout,
  onBack,
  onNavigateToTab,
}) => {
  const [notifications, setNotifications] = useState(true);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.dva_name ||
    (user?.email ? user.email.split("@")[0] : "Student");
  const displayEmail = user?.email || "student@dreams.com";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {onBack ? (
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
              <BackIcon size={18} color={Colors.textDark} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 32 }} />
          )}
          <View style={styles.headerCenter}>
            <View style={styles.roleBadge}>
              <UserIcon size={11} color={Colors.accent} />
              <Text style={styles.roleBadgeText}>STUDENT PROFILE</Text>
            </View>
            <Text style={styles.headerTitle}>Account & Settings</Text>
          </View>
          <View style={{ width: 32 }} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.userCard}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.avatarImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{displayEmail}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <Text style={styles.metaChipText}>Academy Scholar 🎓</Text>
              </View>
              <View style={[styles.metaChip, { backgroundColor: "#ECFDF5" }]}>
                <Text style={[styles.metaChipText, { color: "#059669" }]}>STS / Sindh Board</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Hub Navigation Cards */}
        {onNavigateToTab && (
          <View style={styles.quickNavRow}>
            <TouchableOpacity
              style={styles.quickNavBtn}
              onPress={() => onNavigateToTab(5)}
              activeOpacity={0.8}
            >
              <TrophyIcon size={18} color={Colors.accent} />
              <Text style={styles.quickNavBtnText}>Progress Center</Text>
              <Text style={styles.quickNavBtnSub}>View scores & streak</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickNavBtn}
              onPress={() => onNavigateToTab(1)}
              activeOpacity={0.8}
            >
              <BatchesIcon size={18} color="#059669" />
              <Text style={styles.quickNavBtnText}>Live Batches</Text>
              <Text style={styles.quickNavBtnSub}>Admissions open</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* WhatsApp Academy Support Card */}
        <View style={styles.supportCard}>
          <View style={styles.supportHeader}>
            <WhatsAppIcon size={20} color="#10B981" />
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Direct WhatsApp Guidance</Text>
              <Text style={styles.supportSub}>Connect directly with Sir Dilshad Murtaza</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.supportActionBtn}
            onPress={() =>
              Linking.openURL(
                "https://wa.me/923018183624?text=Salam%20Sir!%20I%20need%20guidance%20regarding%20Dreams%20Academy."
              ).catch(() => {})
            }
            activeOpacity={0.85}
          >
            <WhatsAppIcon size={15} color="#FFFFFF" />
            <Text style={styles.supportActionBtnText}>Chat on WhatsApp (0301-8183624)</Text>
          </TouchableOpacity>
        </View>

        {/* About Dreams Virtual Academy Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeading}>About Dreams Virtual Academy</Text>
          <Text style={styles.aboutSindhi}>
            ڊريمز ورچوئل اڪيڊمي: سنڌي ٻوليءَ ۾ سائنس، فزڪس ۽ نوڪرين جي امتحانن جي تياري جو سڀ کان وڏو مرڪز
          </Text>
          <Text style={styles.aboutDesc}>
            Dreams Virtual Academy is Sindh's premier online learning initiative dedicated to making quality science, physics, chemistry, mathematics, and competitive exam preparation accessible to every student in easy Sindhi and English.
          </Text>
          <View style={styles.aboutStatsRow}>
            <View style={styles.aboutStatItem}>
              <Text style={styles.aboutStatNum}>15,000+</Text>
              <Text style={styles.aboutStatLabel}>Students</Text>
            </View>
            <View style={styles.aboutStatDivider} />
            <View style={styles.aboutStatItem}>
              <Text style={styles.aboutStatNum}>85+</Text>
              <Text style={styles.aboutStatLabel}>Lectures</Text>
            </View>
            <View style={styles.aboutStatDivider} />
            <View style={styles.aboutStatItem}>
              <Text style={styles.aboutStatNum}>4</Text>
              <Text style={styles.aboutStatLabel}>Mentors</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeading}>App Preferences</Text>

          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Study Reminders</Text>
              <Text style={styles.settingSub}>Daily notifications for practice tests</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#E2E8F0", true: Colors.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={onLogout}
          activeOpacity={0.85}
        >
          <LogoutIcon size={16} color="#EF4444" />
          <Text style={styles.logoutBtnText}>Log Out of Account</Text>
        </TouchableOpacity>

        <View style={styles.versionFooter}>
          <Text style={styles.versionTitle}>DREAMS VIRTUAL ACADEMY</Text>
          <Text style={styles.versionSub}>Official Mobile Application • Version 2.0.0</Text>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  headerCenter: {
    alignItems: "center",
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accentLight,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 2,
    gap: 4,
  },
  roleBadgeText: {
    fontSize: 8,
    color: Colors.accent,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textDark,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
    gap: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textDark,
  },
  userEmail: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  metaChip: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  metaChipText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.accent,
  },
  quickNavRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  quickNavBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  quickNavBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textDark,
    marginTop: 4,
  },
  quickNavBtnSub: {
    fontSize: 9,
    color: Colors.textLight,
  },
  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
  },
  supportHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
  },
  supportSub: {
    fontSize: 10,
    color: Colors.textLight,
  },
  supportActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  supportActionBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
  },
  cardHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 6,
  },
  aboutSindhi: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.accent,
    lineHeight: 16,
    marginBottom: 6,
  },
  aboutDesc: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
    marginBottom: 10,
  },
  aboutStatsRow: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  aboutStatItem: {
    flex: 1,
    alignItems: "center",
  },
  aboutStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E2E8F0",
  },
  aboutStatNum: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
  },
  aboutStatLabel: {
    fontSize: 9,
    color: Colors.textLight,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  settingTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textDark,
  },
  settingSub: {
    fontSize: 10,
    color: Colors.textLight,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginBottom: 14,
  },
  logoutBtnText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 11,
  },
  versionFooter: {
    alignItems: "center",
    marginBottom: 10,
  },
  versionTitle: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  versionSub: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 2,
  },
});

export default ProfileScreen;
