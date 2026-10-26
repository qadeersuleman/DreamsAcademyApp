import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  Share,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
  FadeInUp,
  FadeIn,
  SlideInLeft,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Svg, { Path, Circle, Line, Polyline, Rect } from "react-native-svg";


const { width } = Dimensions.get("window");

interface HomeProps {
  onNavigateToTab: (tabIndex: number) => void;
  onSelectSubject: (subject: any) => void;
  user?: any;
}

// ======================== ENHANCED CUSTOM ICONS ========================

const PlayIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Path d="M9.5 7.5l8 4.5-8 4.5V7.5z" fill={color}/>
  </Svg>
);

const FileTextIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5"/>
    <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const QuizIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Path d="M9.5 9.5a3 3 0 0 1 5 1c0 1.5-2.5 2.5-2.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Circle cx="12" cy="17" r="0.8" fill={color}/>
  </Svg>
);

const ArrowRightIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Polyline points="10 8 14 12 10 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ScienceIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Path d="M8 12h8M12 8v8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
    <Path d="M12 2l2 4M12 22l-2-4M2 12l4-2M22 12l-4 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const MathIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Path d="M7 7l5 5m0 0l5 5m-5-5L7 17m5-5l5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const ChemistryIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Path d="M10 2v6l-4 8c-1 2 0 4 2 4h8c2 0 3-2 2-4l-4-8V2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <Line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const PhysicsIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Circle cx="12" cy="12" r="2" fill={color}/>
    <Path d="M12 2a10 10 0 0 1 0 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M12 2a10 10 0 0 0 0 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M2 12h20" stroke={color} strokeWidth="1" strokeDasharray="2 2"/>
  </Svg>
);

const ComputerIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
    <Rect x="6" y="8" width="12" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
    <Line x1="10" y1="16" x2="14" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Line x1="12" y1="14" x2="12" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const StarIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </Svg>
);

const TrophyIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="1.5"/>
    <Path d="M6 3h12v6a6 6 0 1 1-12 0V3z" stroke={color} strokeWidth="1.5"/>
    <Path d="M9 21h6M12 18v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

// ======================== SUBJECTS DATA ========================

const SUBJECTS = [
  {
    id: "1",
    title: "General Science",
    description: "Basic concepts of science, experiments, and scientific methods",
    icon: "science",
    color: "#4F46E5",
    gradientColors: ["#4F46E5", "#7C3AED"],
    lessons: [
      { id: "s1", title: "Introduction to Science", duration: "15 mins", completed: false, type: "video" },
      { id: "s2", title: "Scientific Method", duration: "20 mins", completed: false, type: "note" },
      { id: "s3", title: "Science Quiz", duration: "10 mins", completed: false, type: "quiz" },
    ]
  },
  {
    id: "2",
    title: "Mathematics",
    description: "Algebra, Geometry, Calculus, and problem solving",
    icon: "math",
    color: "#059669",
    gradientColors: ["#059669", "#10B981"],
    lessons: [
      { id: "m1", title: "Algebra Basics", duration: "25 mins", completed: true, type: "video" },
      { id: "m2", title: "Geometry Fundamentals", duration: "30 mins", completed: false, type: "note" },
      { id: "m3", title: "Math Quiz", duration: "15 mins", completed: false, type: "quiz" },
    ]
  },
  {
    id: "3",
    title: "Chemistry",
    description: "Elements, compounds, chemical reactions, and periodic table",
    icon: "chemistry",
    color: "#D97706",
    gradientColors: ["#D97706", "#F59E0B"],
    lessons: [
      { id: "c1", title: "Atoms and Molecules", duration: "20 mins", completed: false, type: "video" },
      { id: "c2", title: "Periodic Table", duration: "25 mins", completed: false, type: "note" },
      { id: "c3", title: "Chemistry Quiz", duration: "10 mins", completed: false, type: "quiz" },
    ]
  },
  {
    id: "4",
    title: "Physics",
    description: "Motion, energy, force, electricity, and modern physics",
    icon: "physics",
    color: "#DC2626",
    gradientColors: ["#DC2626", "#EF4444"],
    lessons: [
      { id: "p1", title: "Laws of Motion", duration: "30 mins", completed: false, type: "video" },
      { id: "p2", title: "Energy & Work", duration: "20 mins", completed: false, type: "note" },
      { id: "p3", title: "Physics Quiz", duration: "15 mins", completed: false, type: "quiz" },
    ]
  },
  {
    id: "5",
    title: "Computer Basics",
    description: "Hardware, software, programming basics, and digital literacy",
    icon: "computer",
    color: "#7C3AED",
    gradientColors: ["#7C3AED", "#8B5CF6"],
    lessons: [
      { id: "pc1", title: "Computer Hardware", duration: "15 mins", completed: true, type: "video" },
      { id: "pc2", title: "Software Basics", duration: "20 mins", completed: false, type: "note" },
      { id: "pc3", title: "Computer Quiz", duration: "10 mins", completed: false, type: "quiz" },
    ]
  }
];

const DEFAULT_USER = {
  id: "1",
  name: "Ahmed Khan",
  email: "student@example.com",
  avatar: "https://ui-avatars.com/api/?background=7C5CFF&color=fff&name=Ahmed+Khan&size=128",
};

// ======================== COMPONENTS ========================

const QuickActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
  badge?: string;
  onPress: () => void;
  index?: number;
}> = ({ icon, label, color, badge, onPress, index = 0 }) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()} style={{ alignItems: 'center', width: (width - 60) / 3 }}>
      <TouchableOpacity
        onPressIn={() => { scale.value = withSpring(0.88, { damping: 12, stiffness: 180 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 180 }); }}
        onPress={onPress}
        activeOpacity={1}
        delayPressIn={0}
        style={{ alignItems: 'center' }}
      >
        <Animated.View style={animStyle}>
          <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
            {icon}
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.quickActionLabel}>{label}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CourseCard: React.FC<{
  subject: any;
  onPress: () => void;
  index?: number;
}> = ({ subject, onPress, index = 0 }) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const lessons = subject?.lessons || [];
  const completedCount = lessons.filter((l: any) => l.completed === true).length;
  const totalLessonsCount = lessons.length;
  const progress = totalLessonsCount > 0 ? (completedCount / totalLessonsCount) * 100 : 0;

  const renderIcon = () => {
    const iconProps = { size: 26, color: 'white' };
    switch (subject?.icon) {
      case 'science': return <ScienceIcon {...iconProps} />;
      case 'math': return <MathIcon {...iconProps} />;
      case 'chemistry': return <ChemistryIcon {...iconProps} />;
      case 'physics': return <PhysicsIcon {...iconProps} />;
      case 'computer': return <ComputerIcon {...iconProps} />;
      default: return <ScienceIcon {...iconProps} />;
    }
  };

  const getProgressColor = () => {
    if (progress >= 100) return '#10B981';
    if (progress >= 50) return '#F59E0B';
    return subject?.color || '#7C5CFF';
  };

  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 60).springify().damping(14)}
      style={{ marginBottom: 14 }}
    >
      <TouchableOpacity
        onPressIn={() => { scale.value = withSpring(0.97, { damping: 14, stiffness: 200 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 14, stiffness: 200 }); }}
        onPress={onPress}
        activeOpacity={1}
        delayPressIn={0}
      >
        <Animated.View style={[styles.courseCard, animStyle]}>
          <View style={[styles.courseIconContainer, { backgroundColor: subject?.color || '#7C5CFF' }]}>
            {renderIcon()}
          </View>

          <View style={styles.courseContent}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle} numberOfLines={1}>
                {subject?.title || 'Course'}
              </Text>
              {progress === 100 && (
                <View style={styles.completedBadge}>
                  <StarIcon size={12} color="#F59E0B" />
                  <Text style={styles.completedText}>Done!</Text>
                </View>
              )}
            </View>
            <Text style={styles.courseDescription} numberOfLines={1}>
              {subject?.description || 'No description'}
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {
                  width: `${progress}%`,
                  backgroundColor: getProgressColor()
                }]} />
              </View>
              <Text style={styles.progressText}>
                {completedCount}/{totalLessonsCount} lessons
              </Text>
            </View>
          </View>

          <View style={styles.arrowContainer}>
            <ArrowRightIcon size={20} color="#6B7280" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main HomeScreen Component
export const HomeScreen: React.FC<HomeProps> = ({
  onNavigateToTab,
  onSelectSubject,
  user,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // Reanimated scroll value
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });

  // Header parallax opacity
  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 80], [1, 0.92], Extrapolation.CLAMP),
  }));

  // Greeting slide-in
  const greetingAnimStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 600 }),
    transform: [{ translateY: withSpring(0, { damping: 14, stiffness: 120 }) }],
  }));

  // Calculate stats
  const totalLessons = SUBJECTS.reduce((acc, sub) => acc + (sub?.lessons?.length || 0), 0);
  const completedLessons = SUBJECTS.reduce((acc, sub) => {
    const lessons = sub?.lessons || [];
    return acc + lessons.filter((l: any) => l.completed === true).length;
  }, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Find next incomplete lesson
  let nextCourse: any = null;
  let nextLesson: any = null;
  for (const sub of SUBJECTS) {
    const incomplete = (sub?.lessons || []).find((l: any) => !l.completed);
    if (incomplete) { nextCourse = sub; nextLesson = incomplete; break; }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleShareProgress = async () => {
    try {
      await Share.share({
        message: `📚 I've completed ${completedLessons} out of ${totalLessons} lessons on Dreams Academy! Join me in learning! 🎓`,
      });
    } catch (error) { console.error(error); }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ Good Morning';
    if (hour < 17) return '🌤️ Good Afternoon';
    return '🌙 Good Evening';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimStyle]}>
        <Animated.View entering={FadeInDown.delay(50).duration(500)}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Animated.Text style={[styles.greeting, greetingAnimStyle]}>
                {getGreeting()} 👋
              </Animated.Text>
              <Text style={styles.studentName}>
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || DEFAULT_USER.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onNavigateToTab(4)}
              style={styles.avatarButton}
              delayPressIn={0}
            >
              <Image
                source={{ uri: user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?background=7C5CFF&color=fff&name=${encodeURIComponent(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'U')}&size=128` }}
                style={styles.avatar}
              />
              <View style={styles.onlineDot} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Progress Card */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <View style={styles.progressCard}>
            <View style={styles.progressCardLeft}>
              <View style={styles.progressCircle}>
                <Svg width="52" height="52" viewBox="0 0 36 36">
                  <Path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round"
                  />
                  <Path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${overallProgress}, 100`}
                  />
                </Svg>
                <View style={styles.progressCircleText}>
                  <Text style={styles.progressPercentage}>{Math.round(overallProgress)}%</Text>
                </View>
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>Overall Progress</Text>
                <Text style={styles.progressDetail}>{completedLessons} of {totalLessons} lessons</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleShareProgress} style={styles.shareButton} delayPressIn={0}>
              <Text style={styles.shareButtonText}>Share 🎉</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#7C5CFF"
            colors={["#7C5CFF"]}
            progressBackgroundColor="#1F2937"
          />
        }
        contentContainerStyle={styles.scrollContent}
        decelerationRate="normal"
        scrollEnabled={true}
        nestedScrollEnabled={true}
        bounces={true}
        overScrollMode="never"
      >
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsRow}>
            <QuickActionButton
              icon={<PlayIcon size={28} color="white" />}
              label="Videos"
              color="#4F46E5"
              badge="New"
              onPress={() => onNavigateToTab(3)}
              index={0}
            />
            <QuickActionButton
              icon={<FileTextIcon size={28} color="white" />}
              label="Notes"
              color="#059669"
              onPress={() => onNavigateToTab(2)}
              index={1}
            />
            <QuickActionButton
              icon={<QuizIcon size={28} color="white" />}
              label="Quizzes"
              color="#D97706"
              onPress={() => onNavigateToTab(1)}
              index={2}
            />
          </View>
        </View>

        {/* Continue Learning Banner */}
        {nextLesson && nextCourse && (
          <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.continueLearningSection}>
            <Text style={styles.sectionTitle}>📚 Continue Learning</Text>
            <TouchableOpacity
              onPress={() => onSelectSubject(nextCourse)}
              style={[styles.continueCard, { backgroundColor: nextCourse.color }]}
              activeOpacity={0.9}
              delayPressIn={0}
            >
              <View style={styles.continueCardContent}>
                <View style={styles.continueIconContainer}>
                  {nextLesson.type === "video" ? (
                    <PlayIcon size={24} color="white" />
                  ) : nextLesson.type === "note" ? (
                    <FileTextIcon size={24} color="white" />
                  ) : (
                    <QuizIcon size={24} color="white" />
                  )}
                </View>
                <View style={styles.continueTextContainer}>
                  <Text style={styles.continueLabel}>Next Up</Text>
                  <Text style={styles.continueTitle} numberOfLines={1}>{nextLesson?.title || 'Lesson'}</Text>
                  <Text style={styles.continueSubtitle} numberOfLines={1}>
                    {nextCourse?.title || 'Course'} • {nextLesson?.duration || '0 min'}
                  </Text>
                </View>
                <View style={styles.continueArrow}>
                  <ArrowRightIcon size={22} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* My Courses Section */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <TrophyIcon size={20} color="#F59E0B" />
              <Text style={styles.sectionTitle}>My Courses</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigateToTab(1)} delayPressIn={0}>
              <Text style={styles.viewAllButton}>View All →</Text>
            </TouchableOpacity>
          </View>

          {SUBJECTS.map((subject, i) => (
            <CourseCard
              key={subject.id}
              subject={subject}
              onPress={() => onSelectSubject(subject)}
              index={i}
            />
          ))}
        </View>

        {/* Motivational Banner */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.motivationalSection}>
          <View style={styles.motivationalCard}>
            <Text style={styles.motivationalEmoji}>🎯</Text>
            <Text style={styles.motivationalTitle}>Ready to Learn Something New?</Text>
            <Text style={styles.motivationalText}>
              Complete your lessons, earn certificates, and become a star student! ⭐
            </Text>
            <TouchableOpacity
              onPress={() => onNavigateToTab(1)}
              style={styles.startLearningButton}
              activeOpacity={0.8}
              delayPressIn={0}
            >
              <Text style={styles.startLearningText}>Start a Quiz →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom Padding */}
        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </View>
  );
};

// ======================== STYLES ========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    backgroundColor: '#7C5CFF',
    paddingTop: Platform.OS === 'ios' ? 44 : 18,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  studentName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  avatarButton: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white',
  },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  progressCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    position: 'relative',
    marginRight: 10,
  },
  progressCircleText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressInfo: {
    flex: 1,
  },
  progressLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 1,
  },
  progressDetail: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  shareButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
  },
  shareButtonText: {
    color: '#7C5CFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  quickActionsContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  continueLearningSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  continueCard: {
    borderRadius: 20,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  continueCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  continueIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  continueTextContainer: {
    flex: 1,
  },
  continueLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  continueTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  continueSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  continueArrow: {
    marginLeft: 12,
  },
  coursesSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    marginBottom : 10
  },
  viewAllButton: {
    color: '#7C5CFF',
    fontSize: 14,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  courseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  courseContent: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245,158,11,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  courseDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  arrowContainer: {
    marginLeft: 12,
    opacity: 0.5,
  },
  motivationalSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  motivationalCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.2)',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  motivationalEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  motivationalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  motivationalText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  startLearningButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startLearningText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;