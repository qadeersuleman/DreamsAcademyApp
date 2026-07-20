import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Circle, Line, Polyline, Rect, Polygon } from "react-native-svg";
import { ALL_MCQ_QUIZZES, JSONQuiz, JSONQuestion } from "../../JSON/all_mcqs";
import Colors from "../../theme/Colors";

const { width, height: screenHeight } = Dimensions.get("window");

// ─── Custom Premium Icons ───────────────────────────────────────────────────

const SearchIcon = ({ size = 20, color = "#94A3B8" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const BackIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckIcon = ({ size = 16, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const XIcon = ({ size = 16, color = "#EF4444" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

const ClockIcon = ({ size = 12, color = "#94A3B8" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const QuizIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="rgba(255,255,255,0.05)" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="1" fill={color} />
  </Svg>
);

const TrophyIcon = ({ size = 24, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M12 2a7 7 0 017 7c0 4-3 5.5-7 5.5S5 13 5 9a7 7 0 017-7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Helper Functions ────────────────────────────────────────────────────────

const getSubjectColor = (subject: string): string => {
  const s = subject.toLowerCase();
  if (s.includes("science")) return "#6366F1"; // Indigo
  if (s.includes("math")) return "#10B981"; // Emerald
  if (s.includes("physics")) return "#EF4444"; // Red
  if (s.includes("chemistry")) return "#F59E0B"; // Amber
  if (s.includes("biology")) return "#EC4899"; // Pink
  if (s.includes("english") || s.includes("grammar")) return "#8B5CF6"; // Purple
  return "#7C5CFF";
};

const getQuizTitle = (id: string, quiz: JSONQuiz): string => {
  if (quiz.topic) {
    return `${quiz.topic}: ${quiz.subtopic || ""}`;
  }
  const gradeStr = quiz.grade ? `Class ${quiz.grade} ` : "";
  return `${gradeStr}${quiz.subject}`;
};

// ─── Main Component ──────────────────────────────────────────────────────────

export const TestsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "middle" | "class9" | "class10" | "english">("all");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  
  // Quiz taking state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizHistory, setQuizHistory] = useState<{ [key: string]: { score: number; completedAt: string } }>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Load history from AsyncStorage on mount
  useEffect(() => {
    loadQuizHistory();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const loadQuizHistory = async () => {
    try {
      const historyStr = await AsyncStorage.getItem("quiz_history_v1");
      if (historyStr) {
        setQuizHistory(JSON.parse(historyStr));
      }
    } catch (e) {
      console.error("Failed to load quiz history", e);
    }
  };

  const saveQuizResult = async (quizId: string, scorePercentage: number) => {
    try {
      const updatedHistory = {
        ...quizHistory,
        [quizId]: {
          score: scorePercentage,
          completedAt: new Date().toLocaleDateString(),
        },
      };
      setQuizHistory(updatedHistory);
      await AsyncStorage.setItem("quiz_history_v1", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save quiz result", e);
    }
  };

  // Filter quizzes based on search query and category
  const filteredQuizKeys = Object.keys(ALL_MCQ_QUIZZES).filter((key) => {
    const quiz = ALL_MCQ_QUIZZES[key];
    const title = getQuizTitle(key, quiz).toLowerCase();
    const subject = quiz.subject.toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || subject.includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === "middle") {
      return key.startsWith("class6") || key.startsWith("class7") || key.startsWith("class8");
    }
    if (activeCategory === "class9") {
      return key.startsWith("class9");
    }
    if (activeCategory === "class10") {
      return key.startsWith("class10");
    }
    if (activeCategory === "english") {
      return key.startsWith("parts_of_speech");
    }

    return true;
  });

  const startQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsAnswerChecked(false);
    setShowResult(false);
  };

  const handleOptionSelect = (optionKey: string) => {
    if (isAnswerChecked) return;
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIdx]: optionKey,
    });
    setIsAnswerChecked(true);
  };

  const handleNextQuestion = (totalQuestions: number) => {
    if (currentQuestionIdx + 1 < totalQuestions) {
      setCurrentQuestionIdx(prev => prev + 1);
      setIsAnswerChecked(false);
    } else {
      // Calculate final score
      const quiz = ALL_MCQ_QUIZZES[activeQuizId!];
      let correctCount = 0;
      quiz.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / totalQuestions) * 100);
      saveQuizResult(activeQuizId!, finalScore);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuizId(null);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsAnswerChecked(false);
    setShowResult(false);
  };

  // ─── 1. QUIZ ACTIVE PLAYING VIEW ───────────────────────────────────────────

  if (activeQuizId) {
    const quiz = ALL_MCQ_QUIZZES[activeQuizId];
    const currentQuestion: JSONQuestion = quiz.questions[currentQuestionIdx];
    const totalQuestions = quiz.questions.length;
    const progress = ((currentQuestionIdx + 1) / totalQuestions) * 100;
    const selectedOption = userAnswers[currentQuestionIdx];

    if (!showResult) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

          {/* Header */}
          <View style={styles.quizHeader}>
            <TouchableOpacity onPress={resetQuiz} style={styles.quizBackBtn} activeOpacity={0.8}>
              <BackIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.quizHeaderTitleContainer}>
              <Text style={styles.quizHeaderSub}>{quiz.subject}</Text>
              <Text style={styles.quizHeaderTitle} numberOfLines={1}>
                {getQuizTitle(activeQuizId, quiz)}
              </Text>
            </View>
          </View>

          {/* Progress Tracker */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressCountText}>
                Question <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{currentQuestionIdx + 1}</Text> of {totalQuestions}
              </Text>
              <Text style={styles.progressPercentText}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {/* Scrollable Question Box */}
          <ScrollView
            style={styles.quizScroll}
            contentContainerStyle={styles.quizScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>
            </View>

            {/* Options List */}
            {Object.keys(currentQuestion.options).map((key) => {
              const optionText = currentQuestion.options[key];
              const isSelected = selectedOption === key;
              const isCorrectAnswer = currentQuestion.answer === key;
              
              let optionStyle: any = styles.optionBtn;
              let optionTextStyle: any = styles.optionText;
              let prefixStyle: any = styles.optionPrefix;
              let showCorrectCheck = false;
              let showWrongCross = false;

              if (isAnswerChecked) {
                if (isCorrectAnswer) {
                  optionStyle = [styles.optionBtn, styles.optionCorrect];
                  optionTextStyle = [styles.optionText, styles.optionTextCorrect];
                  prefixStyle = [styles.optionPrefix, styles.optionPrefixCorrect];
                  showCorrectCheck = true;
                } else if (isSelected) {
                  optionStyle = [styles.optionBtn, styles.optionWrong];
                  optionTextStyle = [styles.optionText, styles.optionTextWrong];
                  prefixStyle = [styles.optionPrefix, styles.optionPrefixWrong];
                  showWrongCross = true;
                } else {
                  optionStyle = [styles.optionBtn, styles.optionDisabled];
                }
              } else if (isSelected) {
                optionStyle = [styles.optionBtn, styles.optionSelected];
                optionTextStyle = [styles.optionText, styles.optionTextSelected];
                prefixStyle = [styles.optionPrefix, styles.optionPrefixSelected];
              }

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleOptionSelect(key)}
                  disabled={isAnswerChecked}
                  activeOpacity={0.8}
                  style={optionStyle}
                >
                  <View style={styles.optionContent}>
                    <View style={prefixStyle}>
                      <Text style={styles.optionPrefixText}>{key.toUpperCase()}</Text>
                    </View>
                    <Text style={optionTextStyle}>{optionText}</Text>
                  </View>
                  {showCorrectCheck && <CheckIcon size={16} color="#3DBE7A" />}
                  {showWrongCross && <XIcon size={16} color="#FF6B6B" />}
                </TouchableOpacity>
              );
            })}

            {/* Next Question Navigation */}
            {isAnswerChecked && (
              <TouchableOpacity
                onPress={() => handleNextQuestion(totalQuestions)}
                activeOpacity={0.8}
                style={styles.nextBtn}
              >
                <Text style={styles.nextBtnText}>
                  {currentQuestionIdx + 1 === totalQuestions ? "Submit & View Results" : "Next Question →"}
                </Text>
              </TouchableOpacity>
            )}
            
            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      );
    } else {
      // ─── 2. DETAILED SUMMARY RESULT VIEW ─────────────────────────────────────
      
      let correctCount = 0;
      quiz.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
          correctCount++;
        }
      });
      const scorePercent = Math.round((correctCount / totalQuestions) * 100);
      const isPass = scorePercent >= 50;

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

          {/* Header */}
          <View style={[styles.quizHeader, { backgroundColor: isPass ? '#3DBE7A' : '#7C5CFF' }]}>
            <TouchableOpacity onPress={resetQuiz} style={styles.quizBackBtn} activeOpacity={0.8}>
              <BackIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.quizHeaderTitleContainer}>
              <Text style={[styles.quizHeaderSub, { color: 'rgba(255,255,255,0.8)' }]}>Quiz Result</Text>
              <Text style={styles.quizHeaderTitle} numberOfLines={1}>
                {getQuizTitle(activeQuizId, quiz)}
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.quizScroll}
            contentContainerStyle={styles.resultScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Score Ring Card */}
            <View style={styles.resultTrophyCard}>
              <View style={styles.trophyWrapper}>
                <TrophyIcon size={50} color={isPass ? '#F59E0B' : '#E2E8F0'} />
              </View>
              <Text style={styles.resultGreeting}>
                {isPass ? "🎉 Congratulations!" : "📚 Keep Learning!"}
              </Text>
              <Text style={styles.resultSummaryText}>
                You answered {correctCount} out of {totalQuestions} questions correctly.
              </Text>
              
              {/* Giant Percent Display */}
              <View style={[styles.percentBadge, { borderColor: isPass ? '#3DBE7A' : '#7C5CFF' }]}>
                <Text style={[styles.percentText, { color: isPass ? '#3DBE7A' : '#7C5CFF' }]}>
                  {scorePercent}%
                </Text>
              </View>
            </View>

            {/* Buttons Row */}
            <View style={styles.resultButtonsRow}>
              <TouchableOpacity onPress={() => startQuiz(activeQuizId)} style={styles.retryBtn} activeOpacity={0.8}>
                <Text style={styles.retryBtnText}>Retry Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetQuiz} style={styles.finishBtn} activeOpacity={0.8}>
                <Text style={styles.finishBtnText}>Go Back</Text>
              </TouchableOpacity>
            </View>

            {/* Question by Question Review */}
            <Text style={styles.reviewHeading}>📝 Detailed Quiz Review</Text>

            {quiz.questions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const cAns = q.answer;
              const isCorrect = uAns === cAns;

              return (
                <View key={idx} style={[styles.reviewCard, isCorrect ? styles.reviewCorrectBorder : styles.reviewWrongBorder]}>
                  {/* Question header */}
                  <View style={styles.reviewHeaderRow}>
                    <View style={[styles.reviewNumberBadge, { backgroundColor: isCorrect ? 'rgba(61,190,122,0.15)' : 'rgba(255,107,107,0.15)' }]}>
                      <Text style={[styles.reviewNumberText, { color: isCorrect ? '#3DBE7A' : '#FF6B6B' }]}>
                        Q{idx + 1}
                      </Text>
                    </View>
                    <Text style={[styles.reviewStatusText, { color: isCorrect ? '#3DBE7A' : '#FF6B6B' }]}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Text>
                  </View>

                  <Text style={styles.reviewQuestionText}>{q.question}</Text>

                  {/* Options review */}
                  <View style={styles.reviewOptionsList}>
                    {Object.keys(q.options).map((key) => {
                      const optText = q.options[key];
                      const isCorrectOpt = cAns === key;
                      const isUserSelectedOpt = uAns === key;

                      let optReviewStyle: any = styles.reviewOptionRow;
                      let optLabelStyle: any = styles.reviewOptionLabel;
                      let optTextStyle: any = styles.reviewOptionText;
                      let marker = null;

                      if (isCorrectOpt) {
                        optReviewStyle = [styles.reviewOptionRow, styles.reviewOptionCorrectBg];
                        optLabelStyle = [styles.reviewOptionLabel, styles.reviewOptionLabelCorrect];
                        optTextStyle = [styles.reviewOptionText, styles.reviewOptionTextCorrect];
                        marker = <CheckIcon size={12} color="#3DBE7A" />;
                      } else if (isUserSelectedOpt) {
                        optReviewStyle = [styles.reviewOptionRow, styles.reviewOptionWrongBg];
                        optLabelStyle = [styles.reviewOptionLabel, styles.reviewOptionLabelWrong];
                        optTextStyle = [styles.reviewOptionText, styles.reviewOptionTextWrong];
                        marker = <XIcon size={12} color="#FF6B6B" />;
                      }

                      return (
                        <View key={key} style={optReviewStyle}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <View style={optLabelStyle}>
                              <Text style={styles.reviewOptionLetter}>{key.toUpperCase()}</Text>
                            </View>
                            <Text style={optTextStyle}>{optText}</Text>
                          </View>
                          {marker}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}

            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      );
    }
  }

  // ─── 3. DEFAULT QUIZZES LIST SELECTION VIEW ──────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Main Premium Curved Header (Consistent with HomeScreen) */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerSub}>Test Your Knowledge</Text>
            <Text style={styles.headerTitle}>Academic Quizzes</Text>
          </View>
          <View style={styles.trophyIconBadge}>
            <TrophyIcon size={24} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Main Body */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, opacity: fadeAnim }}
        contentContainerStyle={[styles.listScrollContent, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <SearchIcon size={18} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search classes, subjects or topics..."
            placeholderTextColor="#64748B"
            style={styles.searchInput}
          />
        </View>

        {/* Categories Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {[
            { id: "all", label: "All Tests" },
            { id: "middle", label: "Class 6-8" },
            { id: "class9", label: "Class 9" },
            { id: "class10", label: "Class 10" },
            { id: "english", label: "English" },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id as any)}
                activeOpacity={0.8}
                style={[styles.chip, isSelected && styles.chipActive]}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results Info */}
        <Text style={styles.resultsCountText}>
          {filteredQuizKeys.length} test modules available
        </Text>

        {/* Quiz Cards */}
        {filteredQuizKeys.map((key) => {
          const quiz = ALL_MCQ_QUIZZES[key];
          const color = getSubjectColor(quiz.subject);
          const history = quizHistory[key];
          const hasScore = history !== undefined;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => startQuiz(key)}
              activeOpacity={0.9}
              style={styles.quizCard}
            >
              <View style={[styles.iconWrapper, { backgroundColor: color + "15", borderColor: color + "30" }]}>
                <QuizIcon size={24} color={color} />
              </View>

              <View style={styles.quizCardInfo}>
                <View style={styles.quizCardMetaRow}>
                  <Text style={[styles.subjectBadge, { color: color }]}>
                    {quiz.subject}
                  </Text>
                  {hasScore && (
                    <View style={[styles.scoreBadge, { backgroundColor: history.score >= 50 ? '#3DBE7A15' : '#7C5CFF15', borderColor: history.score >= 50 ? '#3DBE7A35' : '#7C5CFF35' }]}>
                      <Text style={[styles.scoreBadgeText, { color: history.score >= 50 ? '#3DBE7A' : '#A892FF' }]}>
                        Score: {history.score}%
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.quizCardTitle}>
                  {getQuizTitle(key, quiz)}
                </Text>

                <View style={styles.cardDetailsRow}>
                  <ClockIcon size={12} color="#64748B" />
                  <Text style={styles.detailsText}>{quiz.total_questions} MCQs</Text>
                  
                  {quiz.board && (
                    <>
                      <Text style={styles.detailsDot}>•</Text>
                      <Text style={styles.detailsText} numberOfLines={1}>{quiz.board}</Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {filteredQuizKeys.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No quizzes found</Text>
            <Text style={styles.emptySub}>Try searching for a different subject or class</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  // Main Selection Header
  header: {
    backgroundColor: "#7C5CFF",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#7C5CFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  headerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  trophyIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  listScrollContent: {
    padding: 16,
  },
  // Search Bar
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#F1F5F9",
    fontSize: 14,
    padding: 0,
  },
  // Chips
  chipsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  chipActive: {
    backgroundColor: "#7C5CFF",
    borderColor: "#7C5CFF",
  },
  chipText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  resultsCountText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 12,
  },
  // Quiz Cards List
  quizCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 1,
  },
  quizCardInfo: {
    flex: 1,
  },
  quizCardMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectBadge: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  scoreBadgeText: {
    fontSize: 9,
    fontWeight: "800",
  },
  quizCardTitle: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 6,
  },
  cardDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 5,
  },
  detailsDot: {
    color: "#475569",
    marginHorizontal: 6,
  },
  // Empty State
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "700",
  },
  emptySub: {
    color: "#475569",
    fontSize: 12,
    marginTop: 4,
  },

  // ─── Quiz Active Play Styles ───────────────────────────────────────────────
  
  quizHeader: {
    backgroundColor: "#7C5CFF",
    paddingTop: Platform.OS === "ios" ? 50 : 25,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  quizBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  quizHeaderTitleContainer: {
    flex: 1,
  },
  quizHeaderSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  quizHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 1,
  },
  progressContainer: {
    padding: 16,
    paddingBottom: 4,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressCountText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  progressPercentText: {
    color: "#7C5CFF",
    fontSize: 12,
    fontWeight: "800",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#1E293B",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#7C5CFF",
    borderRadius: 3,
  },
  quizScroll: {
    flex: 1,
  },
  quizScrollContent: {
    padding: 16,
  },
  questionCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  questionText: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  // Option Buttons
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#334155",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  optionPrefix: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionPrefixText: {
    color: "#F1F5F9",
    fontSize: 12,
    fontWeight: "800",
  },
  optionText: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  // Selected option state
  optionSelected: {
    borderColor: "#7C5CFF",
    backgroundColor: "rgba(124,92,255,0.08)",
  },
  optionPrefixSelected: {
    backgroundColor: "#7C5CFF",
  },
  optionTextSelected: {
    color: "#A892FF",
  },
  // Correct option state
  optionCorrect: {
    borderColor: "#3DBE7A",
    backgroundColor: "rgba(61,190,122,0.08)",
  },
  optionPrefixCorrect: {
    backgroundColor: "#3DBE7A",
  },
  optionTextCorrect: {
    color: "#3DBE7A",
  },
  // Wrong option state
  optionWrong: {
    borderColor: "#FF6B6B",
    backgroundColor: "rgba(255,107,107,0.08)",
  },
  optionPrefixWrong: {
    backgroundColor: "#FF6B6B",
  },
  optionTextWrong: {
    color: "#FF6B6B",
  },
  // Disabled options state
  optionDisabled: {
    opacity: 0.5,
  },
  nextBtn: {
    backgroundColor: "#7C5CFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#7C5CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  // ─── Result Styles ─────────────────────────────────────────────────────────

  resultScrollContent: {
    padding: 16,
  },
  resultTrophyCard: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  trophyWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(245,158,11,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  resultGreeting: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  resultSummaryText: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  percentBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  percentText: {
    fontSize: 26,
    fontWeight: "900",
  },
  resultButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  retryBtn: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderWidth: 1.5,
    borderColor: "#334155",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  retryBtnText: {
    color: "#F1F5F9",
    fontSize: 14,
    fontWeight: "800",
  },
  finishBtn: {
    flex: 1,
    backgroundColor: "#7C5CFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  finishBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  reviewHeading: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 14,
  },
  // Detailed review card styles
  reviewCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  reviewCorrectBorder: {
    borderColor: "rgba(61,190,122,0.3)",
  },
  reviewWrongBorder: {
    borderColor: "rgba(255,107,107,0.3)",
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewNumberBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  reviewNumberText: {
    fontSize: 11,
    fontWeight: "800",
  },
  reviewStatusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  reviewQuestionText: {
    color: "#F1F5F9",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewOptionsList: {
    gap: 8,
  },
  reviewOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  reviewOptionCorrectBg: {
    backgroundColor: "rgba(61,190,122,0.06)",
    borderColor: "#3DBE7A44",
  },
  reviewOptionWrongBg: {
    backgroundColor: "rgba(255,107,107,0.06)",
    borderColor: "#FF6B6B44",
  },
  reviewOptionLabel: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  reviewOptionLabelCorrect: {
    backgroundColor: "#3DBE7A",
  },
  reviewOptionLabelWrong: {
    backgroundColor: "#FF6B6B",
  },
  reviewOptionLetter: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  reviewOptionText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
  },
  reviewOptionTextCorrect: {
    color: "#3DBE7A",
    fontWeight: "700",
  },
  reviewOptionTextWrong: {
    color: "#FF6B6B",
    fontWeight: "700",
  },
});

export default TestsScreen;