import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Animated, StatusBar, TouchableOpacity } from "react-native";
import Svg, { Rect, Line, Text as SvgText, G, Path, Circle } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

// ─── Custom Icons ────────────────────────────────────────────────────────────

const BackIcon = ({ size = 20, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TrophyIcon = ({ size = 18, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 3h12v6a6 6 0 1 1-12 0V3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 18v3M9 21h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ size = 14, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = ({ size = 14, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} />
  </Svg>
);

const CheckCircleIcon = ({ size = 18, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M22 4L12 14.01l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SparklesIcon = ({ size = 18, color = '#7C5CFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3v3M12 18v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M3 12h3M18 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke={color} strokeWidth="2" strokeLinecap="round" />
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
      useNativeDriver: false, // SVG layouts do not support native driver animations
    }).start();
  }, [percentage, delay, animValue]);

  const barHeight = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0.1, 90], // max height is 90
  });

  const yOffset = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [110, 20], // 110 baseline - 90 max = 20
  });

  return (
    <G>
      {/* Background track bar */}
      <Rect
        x={xOffset}
        y="20"
        width="16"
        height="90"
        fill="rgba(51, 65, 85, 0.3)"
        rx="4"
      />
      {/* Animated active bar */}
      <AnimatedRect
        x={xOffset}
        y={yOffset}
        width="16"
        height={barHeight}
        fill={color}
        rx="4"
      />
      {/* Label under bar */}
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

// ─── Main Component ──────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

export const ProgressScreen: React.FC<Props> = ({ onBack }) => {
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
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
          <BackIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.progressBadge}>
            <TrophyIcon size={12} color="#F59E0B" />
            <Text style={styles.progressBadgeText}>ANALYTICS</Text>
          </View>
          <Text style={styles.headerTitle}>Study Progress</Text>
          <Text style={styles.headerSub}>Mastery Stats & Achievements</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subject Mastery Analytics Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardHeading}>📊 Subject Mastery Analytics</Text>
          <View style={styles.chartContainer}>
            <Svg width="260" height="140" viewBox="0 0 260 140">
              {/* Horizontal Grid Lines */}
              <Line x1="40" y1="20" x2="240" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <Line x1="40" y1="65" x2="240" y2="65" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <Line x1="40" y1="110" x2="240" y2="110" stroke="#475569" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <SvgText x="30" y="23" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">100%</SvgText>
              <SvgText x="30" y="68" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">50%</SvgText>
              <SvgText x="30" y="113" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="end">0%</SvgText>

              {/* Animated Bars */}
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

        {/* Statistics Cards */}
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

        {/* Achievements Section */}
        <Text style={styles.sectionHeading}>🏆 Unlocked Badges</Text>

        <View style={styles.badgeList}>
          {/* Badge 1 */}
          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconContainer, { borderColor: '#10B98125', backgroundColor: '#10B98110' }]}>
              <CheckCircleIcon size={20} color="#10B981" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>Quick Starter</Text>
              <Text style={styles.badgeDesc}>Completed your first study guide revision notes.</Text>
            </View>
          </View>

          {/* Badge 2 */}
          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconContainer, { borderColor: '#7C5CFF25', backgroundColor: '#7C5CFF10' }]}>
              <SparklesIcon size={20} color="#7C5CFF" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>Perfect Evaluator</Text>
              <Text style={styles.badgeDesc}>Scored 100% on a science diagnostic test module.</Text>
            </View>
          </View>

          {/* Badge 3 */}
          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconContainer, { borderColor: '#F59E0B25', backgroundColor: '#F59E0B10' }]}>
              <StarIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>Knowledge Seeker</Text>
              <Text style={styles.badgeDesc}>Watched video lectures continuously for over 2 hours.</Text>
            </View>
          </View>

          {/* Badge 4 - Locked */}
          <View style={[styles.badgeCard, styles.badgeCardLocked]}>
            <View style={[styles.badgeIconContainer, { borderColor: '#47556940', backgroundColor: '#47556910' }]}>
              <TrophyIcon size={18} color="#64748B" />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={[styles.badgeTitle, styles.textMuted]}>Grandmaster (Locked)</Text>
              <Text style={[styles.badgeDesc, styles.textMuted]}>Complete all lessons, quizzes, and videos.</Text>
            </View>
          </View>
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
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B18',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  progressBadgeText: {
    fontSize: 9,
    color: '#F59E0B',
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.2,
  },
  headerSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
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
  // Chart Card
  chartCard: {
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
    fontSize: 14,
    fontWeight: '800',
    color: '#F1F5F9',
    marginTop: 12,
    marginBottom: 14,
    letterSpacing: 0.1,
  },
  badgeList: {
    marginBottom: 20,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    marginBottom: 12,
  },
  badgeCardLocked: {
    opacity: 0.5,
  },
  badgeIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
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
  textMuted: {
    color: '#64748B',
  },
});

export default ProgressScreen;
