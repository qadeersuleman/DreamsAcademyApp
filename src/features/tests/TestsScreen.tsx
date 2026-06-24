import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import Svg, { Path, Circle, Line, Polyline, Rect } from "react-native-svg";

const { height: screenHeight } = Dimensions.get("window");

// ======================== CUSTOM ICONS ========================

const SearchIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

const BackIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const CheckIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ClockIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Polyline points="12 6 12 12 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const QuizIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// ======================== DEFAULT QUIZ DATA ========================

const DEFAULT_QUIZZES = [
  {
    id: "1",
    title: "Science Fundamentals",
    subject: "General Science",
    subjectColor: "#3B82F6",
    questions: [
      { id: "q1", text: "What is the hardest natural substance?", options: ["Iron", "Gold", "Diamond", "Platinum"], correct: 2 },
      { id: "q2", text: "Which planet is known as the Red Planet?", options: ["Jupiter", "Mars", "Venus", "Saturn"], correct: 1 },
      { id: "q3", text: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
    ],
    completed: false,
    score: 0,
  },
  {
    id: "2",
    title: "Mathematics Basics",
    subject: "Mathematics",
    subjectColor: "#10B981",
    questions: [
      { id: "q1", text: "What is the value of π (pi) approximately?", options: ["3.14", "2.71", "1.62", "4.13"], correct: 0 },
      { id: "q2", text: "What is the square root of 144?", options: ["10", "11", "12", "13"], correct: 2 },
    ],
    completed: true,
    score: 50,
  },
  {
    id: "3",
    title: "Chemistry Basics",
    subject: "Chemistry",
    subjectColor: "#F59E0B",
    questions: [
      { id: "q1", text: "What is H2O commonly known as?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], correct: 2 },
      { id: "q2", text: "What is the pH value of pure water?", options: ["5", "6", "7", "8"], correct: 2 },
    ],
    completed: false,
    score: 0,
  },
  {
    id: "4",
    title: "Physics Laws",
    subject: "Physics",
    subjectColor: "#EF4444",
    questions: [
      { id: "q1", text: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Tesla"], correct: 1 },
      { id: "q2", text: "What is the unit of force?", options: ["Watt", "Joule", "Newton", "Pascal"], correct: 2 },
    ],
    completed: false,
    score: 0,
  },
  {
    id: "5",
    title: "Computer Fundamentals",
    subject: "Computer Basics",
    subjectColor: "#8B5CF6",
    questions: [
      { id: "q1", text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Core Processing Unit"], correct: 0 },
      { id: "q2", text: "Which of these is an output device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], correct: 2 },
    ],
    completed: true,
    score: 100,
  },
];

// ======================== TEST SCREEN COMPONENT ========================

export const TestsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredQuizzes = DEFAULT_QUIZZES.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "completed") return quiz.completed;
    if (filter === "pending") return !quiz.completed;
    return true;
  });

  const startQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerChecked(false);
    setScore(0);
    setShowResult(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOptionIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOptionIdx === null || !activeQuiz) return;
    setIsAnswerChecked(true);
    const currentQuestion = activeQuiz.questions[currentQuestionIdx];
    if (selectedOptionIdx === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
      activeQuiz.completed = true;
      activeQuiz.score = Math.round((score / activeQuiz.questions.length) * 100);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerChecked(false);
    setScore(0);
    setShowResult(false);
  };

  // 1. Quiz Taking Screen
  if (activeQuiz) {
    const currentQuestion = activeQuiz.questions[currentQuestionIdx];
    const totalQuestions = activeQuiz.questions.length;
    const progress = ((currentQuestionIdx) / totalQuestions) * 100;

    return (
      <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#1F2937',
            paddingTop: Platform.OS === 'ios' ? 44 : 24,
            paddingBottom: 16,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(124,92,255,0.2)',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={resetQuiz} style={{ marginRight: 16 }}>
            <View style={{ padding: 8, backgroundColor: 'rgba(124,92,255,0.1)', borderRadius: 12 }}>
              <BackIcon size={18} color="#7C5CFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>
              {activeQuiz.subject}
            </Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>
              {activeQuiz.title}
            </Text>
          </View>
        </View>

        {!showResult ? (
          <>
            {/* Progress Bar */}
            <View style={{ padding: 20, paddingBottom: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: '#9CA3AF', fontSize: 11 }}>
                  Question {currentQuestionIdx + 1} of {totalQuestions}
                </Text>
                <Text style={{ color: '#7C5CFF', fontSize: 11, fontWeight: 'bold' }}>
                  {Math.round(progress)}%
                </Text>
              </View>
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
            </View>

            {/* Question and Options - with button inside scrollview right after options */}
            <ScrollView 
              ref={scrollViewRef}
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Question Card */}
              <View
                style={{
                  backgroundColor: '#1F2937',
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', lineHeight: 24 }}>
                  {currentQuestion.text}
                </Text>
              </View>

              {/* Options */}
              {currentQuestion.options.map((option: string, idx: number) => {
                let optionBgColor = '#1F2937';
                let borderColor = 'rgba(124,92,255,0.2)';
                let textColor = '#D1D5DB';
                let isCorrect = false;
                let isWrong = false;

                if (selectedOptionIdx === idx) {
                  optionBgColor = 'rgba(124,92,255,0.1)';
                  borderColor = '#7C5CFF';
                  textColor = '#7C5CFF';
                }

                if (isAnswerChecked) {
                  if (idx === currentQuestion.correct) {
                    optionBgColor = 'rgba(16,185,129,0.1)';
                    borderColor = '#10B981';
                    textColor = '#10B981';
                    isCorrect = true;
                  } else if (selectedOptionIdx === idx && idx !== currentQuestion.correct) {
                    optionBgColor = 'rgba(239,68,68,0.1)';
                    borderColor = '#EF4444';
                    textColor = '#EF4444';
                    isWrong = true;
                  }
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleOptionSelect(idx)}
                    disabled={isAnswerChecked}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        backgroundColor: optionBgColor,
                        borderWidth: 1.5,
                        borderColor: borderColor,
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: textColor, fontSize: 13, flex: 1 }}>
                        {option}
                      </Text>
                      {isCorrect && <CheckIcon size={16} color="#10B981" />}
                      {isWrong && <Text style={{ color: '#EF4444', fontSize: 18 }}>✗</Text>}
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Button - RIGHT AFTER the 4th option, inside ScrollView */}
              <View style={{ marginTop: 16, marginBottom: 40 }}>
                {!isAnswerChecked ? (
                  <TouchableOpacity
                    onPress={handleCheckAnswer}
                    disabled={selectedOptionIdx === null}
                    style={{
                      backgroundColor: selectedOptionIdx === null ? '#374151' : '#7C5CFF',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                      Check Answer
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleNextQuestion}
                    style={{
                      backgroundColor: '#7C5CFF',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                      {currentQuestionIdx + 1 === totalQuestions ? 'Submit Quiz' : 'Next Question'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          // Result Screen
          <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
          >
            <View
              style={{
                backgroundColor: 'rgba(16,185,129,0.1)',
                width: 80,
                height: 80,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                borderWidth: 1,
                borderColor: 'rgba(16,185,129,0.3)',
                alignSelf: 'center',
              }}
            >
              <CheckIcon size={40} color="#10B981" />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
              Quiz Completed!
            </Text>
            <Text style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 24, textAlign: 'center' }}>
              You've successfully completed the quiz
            </Text>

            <View
              style={{
                backgroundColor: '#1F2937',
                borderRadius: 20,
                padding: 24,
                alignItems: 'center',
                width: '100%',
                marginBottom: 24,
              }}
            >
              <Text style={{ color: '#9CA3AF', fontSize: 11, textTransform: 'uppercase', marginBottom: 8 }}>
                Your Score
              </Text>
              <Text style={{ color: '#7C5CFF', fontSize: 48, fontWeight: 'bold', marginBottom: 8 }}>
                {Math.round((score / totalQuestions) * 100)}%
              </Text>
              <Text style={{ color: '#D1D5DB', fontSize: 13 }}>
                {score} out of {totalQuestions} correct
              </Text>
            </View>

            <TouchableOpacity
              onPress={resetQuiz}
              style={{
                backgroundColor: '#7C5CFF',
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                Back to Quizzes
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }

  // 2. Default Quizzes List View
  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#1F2937',
          paddingTop: Platform.OS === 'ios' ? 44 : 24,
          paddingBottom: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(124,92,255,0.2)',
        }}
      >
        <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>
          Test Your Knowledge
        </Text>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          Module Tests
        </Text>
        <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
          Complete quizzes to earn certificates
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
            marginBottom: 16,
          }}
        >
          <SearchIcon size={18} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search quizzes..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, marginLeft: 12, color: 'white', fontSize: 14 }}
          />
        </View>

        {/* Filter Chips */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          {(['all', 'pending', 'completed'] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              onPress={() => setFilter(filterType)}
              style={{
                backgroundColor: filter === filterType ? '#7C5CFF' : '#1F2937',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: filter === filterType ? 'white' : '#9CA3AF',
                  fontSize: 11,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {filterType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results Count */}
        <Text style={{ color: '#6B7280', fontSize: 12, marginBottom: 12 }}>
          {filteredQuizzes.length} tests available
        </Text>

        {/* Quiz Cards */}
        {filteredQuizzes.map((quiz) => (
          <TouchableOpacity key={quiz.id} onPress={() => startQuiz(quiz)} activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: '#1F2937',
                borderRadius: 20,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: quiz.subjectColor,
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <QuizIcon size={24} color="white" />
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: '#7C5CFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {quiz.subject}
                  </Text>
                  {quiz.completed && (
                    <View style={{ backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                      <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>{quiz.score}%</Text>
                    </View>
                  )}
                </View>
                
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 4, marginBottom: 4 }}>
                  {quiz.title}
                </Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <QuizIcon size={12} color="#6B7280" />
                  <Text style={{ color: '#6B7280', fontSize: 11, marginLeft: 6 }}>
                    {quiz.questions.length} questions
                  </Text>
                  {!quiz.completed && (
                    <>
                      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#6B7280', marginHorizontal: 8 }} />
                      <ClockIcon size={12} color="#6B7280" />
                      <Text style={{ color: '#6B7280', fontSize: 11, marginLeft: 6 }}>Not started</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>No quizzes found</Text>
            <Text style={{ color: '#4B5563', fontSize: 12, marginTop: 8 }}>Try a different search term</Text>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default TestsScreen;