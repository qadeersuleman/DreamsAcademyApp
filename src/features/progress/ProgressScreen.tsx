import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Colors from "../../theme/Colors";
import { supabase } from "../../lib/supabase";
import {
  FlameIcon,
  TrophyIcon,
  SparklesIcon,
  BackIcon,
  CheckIcon,
  ClockIcon,
} from "../../shared/widgets/Icons";
import Svg, { Circle, Line } from "react-native-svg";

const BarChartIcon = ({ size = 16, color = Colors.accent }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

const TargetIcon = ({ size = 16, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.8" />
    <Circle cx="12" cy="12" r="2" fill={color} />
  </Svg>
);

interface ProgressScreenProps {
  user?: any;
  onBack?: () => void;
  onNavigateToTab?: (tab: number) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  user,
  onBack,
  onNavigateToTab,
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [streakDays, setStreakDays] = useState(1);

  const fetchProgressData = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id || user?.id;

      if (!currentUserId) {
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const { data: attempts } = await supabase
        .from("user_attempts")
        .select("*")
        .eq("user_id", currentUserId)
        .order("completed_at", { ascending: false });

      if (attempts && attempts.length > 0) {
        const totalPct = attempts.reduce((acc, curr) => {
          const pct =
            curr.total_questions > 0 ? (curr.score / curr.total_questions) * 100 : 0;
          return acc + pct;
        }, 0);

        setTestCount(attempts.length);
        setAvgScore(Math.round(totalPct / attempts.length));
        setRecentAttempts(attempts.slice(0, 8));
        setStreakDays(Math.min(attempts.length + 1, 14));
      } else {
        setTestCount(0);
        setAvgScore(0);
        setRecentAttempts([]);
        setStreakDays(1);
      }
    } catch (e) {
      console.log("Failed to load progress:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgressData();
  };

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.dva_name ||
    (user?.email ? user.email.split("@")[0] : "Student");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.accent}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                <BackIcon size={18} color={Colors.textDark} />
              </TouchableOpacity>
            )}
            <View style={styles.badgeRow}>
              <BarChartIcon size={13} color={Colors.accent} />
              <Text style={styles.badgeText}>PERFORMANCE TRACKER</Text>
            </View>
          </View>

          <Text style={styles.title}>Student Progress & Analytics</Text>
          <Text style={styles.sindhiTitle}>
            شاگردن جي ڪارڪردگي ۽ روزاني ترقي جو مرڪز
          </Text>
          <Text style={styles.subtitle}>
            Track your test scores, view quiz streaks, and analyze your subject mastery across Physics, Chemistry, Science & STS preparation.
          </Text>
        </View>

        {loading ? (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <ActivityIndicator size="small" color={Colors.accent} />
            <Text style={{ marginTop: 8, fontSize: 12, color: Colors.textLight }}>
              Loading your academic records...
            </Text>
          </View>
        ) : (
          <>
            {/* Student Profile Overview Card */}
            <View style={styles.profileCard}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.avatarImg}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.studentName}>{displayName}</Text>
                <Text style={styles.studentEmail}>{user?.email || "student@dreams.com"}</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>Active Academy Scholar 🎓</Text>
                </View>
              </View>
            </View>

            {/* Performance Metric 4-Tile Grid */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <FlameIcon size={20} color="#FF7A00" />
                <Text style={styles.metricValue}>{streakDays} Days</Text>
                <Text style={styles.metricLabel}>Study Streak</Text>
              </View>

              <View style={styles.metricCard}>
                <TrophyIcon size={20} color="#F59E0B" />
                <Text style={styles.metricValue}>{avgScore}%</Text>
                <Text style={styles.metricLabel}>Average Score</Text>
              </View>

              <View style={styles.metricCard}>
                <BarChartIcon size={20} color={Colors.accent} />
                <Text style={styles.metricValue}>{testCount}</Text>
                <Text style={styles.metricLabel}>Tests Taken</Text>
              </View>

              <View style={styles.metricCard}>
                <TargetIcon size={20} color="#10B981" />
                <Text style={styles.metricValue}>STS / Board</Text>
                <Text style={styles.metricLabel}>Target Goal</Text>
              </View>
            </View>

            {/* Readiness Diagnostic Box */}
            <View style={styles.diagnosticCard}>
              <Text style={styles.diagnosticTitle}>Readiness Assessment:</Text>
              <Text style={styles.diagnosticText}>
                {testCount === 0
                  ? "You have not taken any mock tests yet. Start with a General Science or Physics quiz to benchmark your level."
                  : avgScore >= 70
                  ? "Outstanding progress! You are on track for top percentile scores in STS / IBA Sukkur and Sindh Board examinations."
                  : "Keep practicing! Review Physics numericals, STBB biology anatomy, and STS pedagogy concepts to push your score above 75%."}
              </Text>
            </View>

            {/* Subject Mastery Progress Bars */}
            <View style={styles.masteryCard}>
              <Text style={styles.masteryHeading}>Estimated Subject Mastery</Text>

              <View style={styles.subjectRow}>
                <View style={styles.subjectScoreRow}>
                  <Text style={styles.subjectName}>General Science (STBB 6-8)</Text>
                  <Text style={styles.subjectScore}>{Math.max(avgScore, 65)}%</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.max(avgScore, 65)}%`, backgroundColor: Colors.accent },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.subjectRow}>
                <View style={styles.subjectScoreRow}>
                  <Text style={styles.subjectName}>Physics (Class 9th - 10th)</Text>
                  <Text style={styles.subjectScore}>{Math.max(avgScore - 5, 50)}%</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.max(avgScore - 5, 50)}%`, backgroundColor: "#3B82F6" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.subjectRow}>
                <View style={styles.subjectScoreRow}>
                  <Text style={styles.subjectName}>Chemistry & Chemical Reactions</Text>
                  <Text style={styles.subjectScore}>{Math.max(avgScore - 8, 45)}%</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.max(avgScore - 8, 45)}%`, backgroundColor: "#F59E0B" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.subjectRow}>
                <View style={styles.subjectScoreRow}>
                  <Text style={styles.subjectName}>Mathematics & STS Aptitude</Text>
                  <Text style={styles.subjectScore}>{Math.max(avgScore - 2, 55)}%</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.max(avgScore - 2, 55)}%`, backgroundColor: "#10B981" },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Recent Test History */}
            <View style={styles.historySection}>
              <Text style={styles.historyHeading}>Recent Mock Test History</Text>

              {recentAttempts.length > 0 ? (
                recentAttempts.map((att, i) => {
                  const pct =
                    att.total_questions > 0
                      ? Math.round((att.score / att.total_questions) * 100)
                      : 0;
                  const isPassed = pct >= 50;

                  return (
                    <View key={att.id || i} style={styles.historyItem}>
                      <View style={styles.historyLeft}>
                        <Text style={styles.historySubject}>
                          {att.subject || "General Science"}
                        </Text>
                        <Text style={styles.historyMeta}>
                          {att.difficulty?.toUpperCase()} •{" "}
                          {new Date(att.completed_at).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.historyRight}>
                        <View
                          style={[
                            styles.scoreBadge,
                            isPassed ? styles.scoreBadgePass : styles.scoreBadgeFail,
                          ]}
                        >
                          <Text
                            style={[
                              styles.scoreBadgeText,
                              isPassed ? styles.scorePassText : styles.scoreFailText,
                            ]}
                          >
                            {att.score}/{att.total_questions} ({pct}%)
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyHistoryBox}>
                  <Text style={styles.emptyHistoryText}>
                    No tests recorded yet. Take your first quiz!
                  </Text>
                  {onNavigateToTab && (
                    <TouchableOpacity
                      style={styles.takeQuizBtn}
                      onPress={() => onNavigateToTab(2)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.takeQuizBtnText}>Open Test Hub</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </>
        )}

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
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  header: {
    marginBottom: 12,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accentLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(124, 92, 255, 0.2)",
    gap: 5,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.accent,
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.textDark,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  sindhiTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
    marginBottom: 6,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 12,
    marginBottom: 12,
  },
  avatarImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textDark,
  },
  studentEmail: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 4,
  },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.accent,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: "900",
    color: Colors.textDark,
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 9,
    color: Colors.textLight,
    marginTop: 1,
    textAlign: "center",
  },
  diagnosticCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  diagnosticTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#166534",
    marginBottom: 2,
  },
  diagnosticText: {
    fontSize: 10,
    color: "#15803D",
    lineHeight: 15,
  },
  masteryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 14,
  },
  masteryHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 10,
  },
  subjectRow: {
    marginBottom: 10,
  },
  subjectScoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  subjectName: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textDark,
  },
  subjectScore: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.accent,
  },
  track: {
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 2,
  },
  historySection: {
    marginBottom: 10,
  },
  historyHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 8,
  },
  historyLeft: {
    flex: 1,
  },
  historySubject: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
  },
  historyMeta: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 2,
  },
  historyRight: {
    marginLeft: 10,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  scoreBadgePass: {
    backgroundColor: "#ECFDF5",
  },
  scoreBadgeFail: {
    backgroundColor: "#FEF2F2",
  },
  scoreBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  scorePassText: {
    color: "#059669",
  },
  scoreFailText: {
    color: "#DC2626",
  },
  emptyHistoryBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  emptyHistoryText: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 10,
  },
  takeQuizBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  takeQuizBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
});

export default ProgressScreen;
