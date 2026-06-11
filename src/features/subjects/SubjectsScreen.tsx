import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Path, Circle, Line, Polyline } from "react-native-svg";

// ======================== CUSTOM ICONS ========================
const BackIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlayIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M10 8l6 4-6 4V8z" fill={color} />
  </Svg>
);

const FileTextIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const QuizIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CheckIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Polyline points="12 6 12 12 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ======================== DEFAULT MOCK DATA ========================
const DEFAULT_SUBJECTS = [
  {
    id: "1",
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript & React from scratch",
    icon: "play",
    color: "#3B82F6",
    lessons: [
      { id: "1-1", title: "Introduction to Web Development", duration: "15 mins", content: "Complete guide to web development...", completed: false },
      { id: "1-2", title: "HTML & CSS Fundamentals", duration: "30 mins", content: "Learn HTML5 and CSS3...", completed: true },
      { id: "1-3", title: "JavaScript Basics", duration: "45 mins", content: "JavaScript fundamentals...", completed: false },
    ],
    quizzes: [
      { id: "q1", title: "HTML & CSS Quiz", questions: [], completed: false, score: 0 },
      { id: "q2", title: "JavaScript Quiz", questions: [], completed: false, score: 0 },
    ]
  },
  {
    id: "2",
    title: "Digital Marketing",
    description: "Master SEO, Social Media & Content Marketing",
    icon: "play",
    color: "#10B981",
    lessons: [
      { id: "2-1", title: "SEO Fundamentals", duration: "20 mins", content: "SEO basics...", completed: true },
      { id: "2-2", title: "Social Media Strategy", duration: "25 mins", content: "Social media marketing...", completed: false },
    ],
    quizzes: [
      { id: "q3", title: "SEO Quiz", questions: [], completed: false, score: 0 },
    ]
  },
  {
    id: "3",
    title: "Data Science",
    description: "Python, Pandas, and Data Visualization",
    icon: "quiz",
    color: "#F59E0B",
    lessons: [
      { id: "3-1", title: "Python for Data Science", duration: "40 mins", content: "Python programming...", completed: false },
    ],
    quizzes: [
      { id: "q4", title: "Python Quiz", questions: [], completed: false, score: 0 },
    ]
  }
];

// Try to import mock data
let MOCK_SUBJECTS: any[] = DEFAULT_SUBJECTS;
try {
  const mockData = require("../../data/mockData");
  if (mockData.MOCK_SUBJECTS && mockData.MOCK_SUBJECTS.length > 0) {
    MOCK_SUBJECTS = mockData.MOCK_SUBJECTS;
  }
} catch (error) {
  console.log("Using default subjects data");
}

interface SubjectsProps {
  selectedSubject: any | null;
  onSelectSubject: (subject: any | null) => void;
}

// Subject Card Component
const SubjectCard: React.FC<{
  subject: any;
  onPress: () => void;
}> = ({ subject, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const completedCount = subject?.lessons?.filter((l: any) => l.completed).length || 0;
  const totalLessons = subject?.lessons?.length || 0;
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

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
      case "play":
        return <PlayIcon size={24} color={iconColor} />;
      case "note":
        return <FileTextIcon size={24} color={iconColor} />;
      case "quiz":
        return <QuizIcon size={24} color={iconColor} />;
      default:
        return <PlayIcon size={24} color={iconColor} />;
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
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
              {subject?.title || 'Course'}
            </Text>
            <Text style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>
              {subject?.description || 'No description'}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 10, color: '#6B7280' }}>
                {completedCount}/{totalLessons} lessons
              </Text>
              <Text style={{ fontSize: 10, color: '#7C5CFF', fontWeight: '600' }}>
                {Math.round(progress)}%
              </Text>
            </View>

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
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main SubjectsScreen Component
export const SubjectsScreen: React.FC<SubjectsProps> = ({
  selectedSubject,
  onSelectSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredSubjects = MOCK_SUBJECTS.filter((sub) =>
    sub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a subject is selected, show its details
  if (selectedSubject) {
    const completedCount = selectedSubject.lessons?.filter((l: any) => l.completed).length || 0;
    const totalLessons = selectedSubject.lessons?.length || 0;
    const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return (
      <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#1F2937',
            paddingTop: 44,
            paddingBottom: 16,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(124,92,255,0.2)',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => onSelectSubject(null)} style={{ marginRight: 16 }}>
            <View style={{ padding: 8, backgroundColor: 'rgba(124,92,255,0.1)', borderRadius: 12 }}>
              <BackIcon size={18} color="#7C5CFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>
              Course Details
            </Text>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 2 }}>
              {selectedSubject.title}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Progress Section */}
          <View style={{ padding: 20 }}>
            <View
              style={{
                backgroundColor: '#1F2937',
                borderRadius: 16,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 8 }}>Overall Progress</Text>
              <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 4 }}>
                {Math.round(progress)}%
              </Text>
              <View style={{ backgroundColor: '#374151', height: 6, borderRadius: 3, overflow: 'hidden' }}>
                <View
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#7C5CFF',
                    borderRadius: 3,
                  }}
                />
              </View>
              <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 8 }}>
                {completedCount} of {totalLessons} lessons completed
              </Text>
            </View>

            {/* Lessons List */}
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
              📚 Lessons
            </Text>

            {selectedSubject.lessons?.map((lesson: any, index: number) => (
              <View
                key={lesson.id || index}
                style={{
                  backgroundColor: '#1F2937',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <PlayIcon size={14} color="#7C5CFF" />
                    <Text style={{ color: 'white', fontSize: 13, fontWeight: '600', marginLeft: 8 }}>
                      {lesson.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ClockIcon size={10} color="#6B7280" />
                    <Text style={{ color: '#6B7280', fontSize: 10, marginLeft: 4 }}>{lesson.duration}</Text>
                  </View>
                </View>

                {lesson.completed ? (
                  <View style={{ backgroundColor: '#10B981', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>Done</Text>
                  </View>
                ) : (
                  <View style={{ backgroundColor: '#7C5CFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>Start</Text>
                  </View>
                )}
              </View>
            ))}

            {/* Quizzes Section */}
            {selectedSubject.quizzes && selectedSubject.quizzes.length > 0 && (
              <>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 12 }}>
                  🎯 Quizzes
                </Text>

                {selectedSubject.quizzes.map((quiz: any, index: number) => (
                  <View
                    key={quiz.id || index}
                    style={{
                      backgroundColor: '#1F2937',
                      borderRadius: 12,
                      padding: 14,
                      marginBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ color: 'white', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>
                        {quiz.title}
                      </Text>
                      <Text style={{ color: '#6B7280', fontSize: 10 }}>
                        {quiz.questions?.length || 0} questions
                      </Text>
                    </View>

                    {quiz.completed ? (
                      <View style={{ backgroundColor: '#10B981', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>{quiz.score}%</Text>
                      </View>
                    ) : (
                      <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>Take Quiz</Text>
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Default: Show all subjects
  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#1F2937',
          paddingTop: 44,
          paddingBottom: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(124,92,255,0.2)',
        }}
      >
        <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>
          Explore
        </Text>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          My Courses
        </Text>
        <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
          Choose a course to start learning
        </Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, opacity: fadeAnim }}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Search Bar */}
        <View
          style={{
            backgroundColor: '#1F2937',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <SearchIcon size={18} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search courses..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, marginLeft: 12, color: 'white', fontSize: 14 }}
          />
        </View>

        {/* Results Count */}
        <Text style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 12 }}>
          {filteredSubjects.length} courses available
        </Text>

        {/* Subject Cards */}
        {filteredSubjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onPress={() => onSelectSubject(subject)}
          />
        ))}

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>No courses found</Text>
            <Text style={{ color: '#4B5563', fontSize: 12, marginTop: 8 }}>Try a different search term</Text>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default SubjectsScreen;