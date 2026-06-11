import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Share,
  Platform,
  Dimensions,
} from "react-native";
import Svg, { Path, Circle, Line, Polyline, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

interface HomeProps {
  onNavigateToTab: (tabIndex: number) => void;
  onSelectSubject: (subject: any) => void;
}

// ======================== CUSTOM ICONS ========================

const PlayIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M10 8l6 4-6 4V8z" fill={color}/>
  </Svg>
);

const FileTextIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2"/>
    <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2"/>
    <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2"/>
    <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2"/>
  </Svg>
);

const QuizIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2"/>
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2"/>
  </Svg>
);

const ArrowRightIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2"/>
    <Polyline points="12 5 19 12 12 19" stroke={color} strokeWidth="2"/>
  </Svg>
);

// Science Icon
const ScienceIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
  </Svg>
);

// Math Icon (Function/Formula)
const MathIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 5h14M5 12h14M5 19h14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Path d="M12 5v14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Path d="M16 8l-4 4 4 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// Chemistry Icon (Flask)
const ChemistryIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10 2v7.31M14 2v7.31M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Path d="M8 12c-2 0-3 3-3 5 0 1.5 1 3 3 3h8c2 0 3-1.5 3-3 0-2-1-5-3-5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Path d="M12 2v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// Physics Icon (Atom)
const PhysicsIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <Path d="M12 5c-3 0-7 2-7 7s4 7 7 7c3 0 7-2 7-7s-4-7-7-7z" stroke={color} strokeWidth="2"/>
    <Path d="M12 5c-1 0-3 2-3 7s2 7 3 7c1 0 3-2 3-7s-2-7-3-7z" stroke={color} strokeWidth="2"/>
  </Svg>
);

// Computer Icon
const ComputerIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="2" width="16" height="14" rx="2" stroke={color} strokeWidth="2"/>
    <Path d="M8 20h8M12 16v4" stroke={color} strokeWidth="2"/>
    <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2"/>
  </Svg>
);

// ======================== SUBJECTS DATA ========================

const SUBJECTS = [
  {
    id: "1",
    title: "General Science",
    description: "Basic concepts of science, experiments, and scientific methods",
    icon: "science",
    color: "#3B82F6",
    lessons: [
      { id: "s1", title: "Introduction to Science", duration: "15 mins", completed: false, type: "video" },
      { id: "s2", title: "Scientific Method", duration: "20 mins", completed: false, type: "note" },
      { id: "s3", title: "Science Quiz", duration: "10 mins", completed: false, type: "quiz" },
    ]
  },
  {
    id: "2",
    title: "Mathematics",
    description: "Algebra, Geometry, Calculus, and problem solving techniques",
    icon: "math",
    color: "#10B981",
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
    color: "#F59E0B",
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
    color: "#EF4444",
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
    color: "#8B5CF6",
    lessons: [
      { id: "pc1", title: "Computer Hardware", duration: "15 mins", completed: true, type: "video" },
      { id: "pc2", title: "Software Basics", duration: "20 mins", completed: false, type: "note" },
      { id: "pc3", title: "Computer Quiz", duration: "10 mins", completed: false, type: "quiz" },
    ]
  }
];

const DEFAULT_USER = {
  id: "1",
  name: "Student",
  email: "student@example.com",
  avatar: "https://ui-avatars.com/api/?background=7C5CFF&color=fff&name=Student",
};

// ======================== COMPONENTS ========================

const QuickActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress: () => void;
}> = ({ icon, label, color, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
    onPress();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View
          style={{
            backgroundColor: color,
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {icon}
        </View>
        <Text style={{ fontSize: 11, fontWeight: '600', color: '#9CA3AF' }}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CourseCard: React.FC<{
  subject: any;
  onPress: () => void;
}> = ({ subject, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const lessons = subject?.lessons || [];
  const completedCount = lessons.filter((l: any) => l.completed === true).length;
  const totalLessonsCount = lessons.length;
  const progress = totalLessonsCount > 0 ? (completedCount / totalLessonsCount) * 100 : 0;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
    onPress();
  };

  const renderIcon = () => {
    const iconColor = "white";
    switch (subject?.icon) {
      case "science":
        return <ScienceIcon size={24} color={iconColor} />;
      case "math":
        return <MathIcon size={24} color={iconColor} />;
      case "chemistry":
        return <ChemistryIcon size={24} color={iconColor} />;
      case "physics":
        return <PhysicsIcon size={24} color={iconColor} />;
      case "computer":
        return <ComputerIcon size={24} color={iconColor} />;
      default:
        return <ScienceIcon size={24} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={{
          backgroundColor: '#1F2937',
          borderRadius: 20,
          marginBottom: 12,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View
          style={{
            backgroundColor: subject?.color || '#7C5CFF',
            width: 52,
            height: 52,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}
        >
          {renderIcon()}
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>
              {subject?.title || 'Course'}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '600', color: '#9CA3AF' }}>
              {completedCount}/{totalLessonsCount}
            </Text>
          </View>
          
          <Text style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>
            {subject?.description || 'No description'}
          </Text>

          <View style={{ backgroundColor: '#374151', height: 4, borderRadius: 2, overflow: 'hidden' }}>
            <View
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: subject?.color || '#7C5CFF',
                borderRadius: 2,
              }}
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main HomeScreen Component
export const HomeScreen: React.FC<HomeProps> = ({
  onNavigateToTab,
  onSelectSubject,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate stats
  const totalLessons = SUBJECTS.reduce((acc, sub) => acc + (sub?.lessons?.length || 0), 0);
  const completedLessons = SUBJECTS.reduce((acc, sub) => {
    const lessons = sub?.lessons || [];
    const completed = lessons.filter((l: any) => l.completed === true).length;
    return acc + completed;
  }, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Find next incomplete lesson
  let nextCourse: any = null;
  let nextLesson: any = null;

  for (const sub of SUBJECTS) {
    const lessons = sub?.lessons || [];
    const incomplete = lessons.find((l: any) => !l.completed);
    if (incomplete) {
      nextCourse = sub;
      nextLesson = incomplete;
      break;
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleShareProgress = async () => {
    try {
      await Share.share({
        message: `I've completed ${completedLessons} out of ${totalLessons} lessons on Dreams Academy! 🎓`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <Animated.View
        style={{
          backgroundColor: '#7C5CFF',
          paddingTop: Platform.OS === 'ios' ? 44 : 24,
          paddingBottom: 20,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          opacity: headerOpacity,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' }}>
              Welcome back,
            </Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 2 }}>
              Student
            </Text>
          </View>
          
          <TouchableOpacity onPress={() => onNavigateToTab(4)}>
            <Image
              source={{ uri: DEFAULT_USER.avatar }}
              style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'white' }}
            />
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 16,
            padding: 16,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '500' }}>
              Overall Progress
            </Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>
              {Math.round(overallProgress)}%
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2 }}>
              {completedLessons}/{totalLessons} lessons completed
            </Text>
          </View>
          
          <TouchableOpacity onPress={handleShareProgress}>
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold' }}>
                Share Progress
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#7C5CFF"
            colors={["#7C5CFF"]}
          />
        }
        style={{ opacity: fadeAnim }}
      >
        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 }}>
            <QuickActionButton
              icon={<PlayIcon size={24} color="white" />}
              label="Watch Videos"
              color="#3B82F6"
              onPress={() => onNavigateToTab(1)}
            />
            <QuickActionButton
              icon={<FileTextIcon size={24} color="white" />}
              label="Study Notes"
              color="#10B981"
              onPress={() => onNavigateToTab(2)}
            />
            <QuickActionButton
              icon={<QuizIcon size={24} color="white" />}
              label="Take Quiz"
              color="#F59E0B"
              onPress={() => onNavigateToTab(3)}
            />
          </View>
        </View>

        {/* Continue Learning Banner */}
        {nextLesson && nextCourse && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => onSelectSubject(nextCourse)}
              style={{
                backgroundColor: '#7C5CFF',
                borderRadius: 16,
                padding: 16,
                shadowColor: '#7C5CFF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  {nextLesson.type === "video" ? (
                    <PlayIcon size={24} color="white" />
                  ) : nextLesson.type === "note" ? (
                    <FileTextIcon size={24} color="white" />
                  ) : (
                    <QuizIcon size={24} color="white" />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '500' }}>
                    Continue Learning
                  </Text>
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginTop: 2 }}>
                    {nextLesson?.title || 'Lesson'}
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>
                    {nextCourse?.title || 'Course'}
                  </Text>
                </View>
                <ArrowRightIcon size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* My Courses Section */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
              My Courses
            </Text>
            <TouchableOpacity onPress={() => onNavigateToTab(1)}>
              <Text style={{ color: '#7C5CFF', fontSize: 12, fontWeight: '600' }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {SUBJECTS.map((subject) => (
            <CourseCard
              key={subject.id}
              subject={subject}
              onPress={() => onSelectSubject(subject)}
            />
          ))}
        </View>

        {/* Motivational Quote */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(124,92,255,0.2)',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
              🎯 Ready to Learn?
            </Text>
            <Text style={{ color: '#94A3B8', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
              Complete your lessons and earn certificates
            </Text>
            <TouchableOpacity
              onPress={() => onNavigateToTab(3)}
              style={{
                backgroundColor: '#F59E0B',
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 25,
                shadowColor: '#F59E0B',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                Start Learning
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;