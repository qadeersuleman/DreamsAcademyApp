import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../../theme/Colors";
import {
  FEATURED_TESTS,
  SUBJECT_MOCK_QUESTIONS,
  FeaturedTest,
  MockQuestion,
} from "../../data/academyData";
import {
  TestsIcon,
  ClockIcon,
  CheckIcon,
  BackIcon,
  SparklesIcon,
  TrophyIcon,
} from "../../shared/widgets/Icons";
import { supabase } from "../../lib/supabase";
import Svg, { Path, Polyline, Line } from "react-native-svg";

const FileQuestionIcon = ({ size = 14, color = Colors.accent }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

const XIcon = ({ size = 14, color = "#EF4444" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

interface TestsScreenProps {
  onBack?: () => void;
  user?: any;
}

export const TestsScreen: React.FC<TestsScreenProps> = ({ onBack, user }) => {
  // Generator Filter State
  const [selectedSubject, setSelectedSubject] = useState("Science");
  const [selectedLevel, setSelectedLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [selectedType, setSelectedType] = useState("Mock Exams");

  // Quiz Taking State
  const [activeTest, setActiveTest] = useState<{
    title: string;
    subject: string;
    level: string;
    questions: MockQuestion[];
    timeLimit: number; // minutes
  } | null>(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // in seconds
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [savingResult, setSavingResult] = useState(false);

  const subjects = ["Science", "Physics", "Chemistry", "Mathematics", "Computer Basics"];
  const levels: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];
  const types = ["Mock Exams", "Topic Quizzes", "Past Papers"];

  // Timer logic
  useEffect(() => {
    if (!activeTest || isTestFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest, isTestFinished, userAnswers]);

  const startCustomTest = () => {
    const subjectPool = SUBJECT_MOCK_QUESTIONS[selectedSubject] || SUBJECT_MOCK_QUESTIONS.Science;
    let questions = subjectPool[selectedLevel] || subjectPool.easy;

    if (!questions || questions.length === 0) {
      questions = SUBJECT_MOCK_QUESTIONS.Science.easy;
    }

    setActiveTest({
      title: `${selectedSubject} - Custom ${selectedType}`,
      subject: selectedSubject,
      level: selectedLevel,
      questions: questions,
      timeLimit: 10,
    });
    setCurrentQIndex(0);
    setUserAnswers({});
    setTimeLeft(10 * 60);
    setIsTestFinished(false);
    setFinalScore(0);
  };

  const startFeaturedTest = (test: FeaturedTest) => {
    const subjectPool = SUBJECT_MOCK_QUESTIONS[test.subject] || SUBJECT_MOCK_QUESTIONS.Science;
    let questions = subjectPool[test.level] || subjectPool.easy;

    setActiveTest({
      title: test.title,
      subject: test.subject,
      level: test.level,
      questions: questions,
      timeLimit: test.time,
    });
    setCurrentQIndex(0);
    setUserAnswers({});
    setTimeLeft(test.time * 60);
    setIsTestFinished(false);
    setFinalScore(0);
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers({ ...userAnswers, [currentQIndex]: optionIndex });
  };

  const finishTest = async () => {
    if (!activeTest) return;

    let score = 0;
    activeTest.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    setFinalScore(score);
    setIsTestFinished(true);

    try {
      setSavingResult(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id || user?.id;

      if (currentUserId) {
        await supabase.from("user_attempts").insert({
          user_id: currentUserId,
          subject: activeTest.subject,
          score: score,
          total_questions: activeTest.questions.length,
          difficulty: activeTest.level,
        });
      }
    } catch (err) {
      console.log("Attempt save notice:", err);
    } finally {
      setSavingResult(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ─── ACTIVE TEST / QUIZ TAKING VIEW ───────────────────────────────────────
  if (activeTest) {
    if (isTestFinished) {
      const percentage = Math.round((finalScore / activeTest.questions.length) * 100);
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.resultContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.resultCard}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreCircleText}>{percentage}%</Text>
              </View>

              <Text style={styles.resultTitle}>
                {percentage >= 80 ? "Outstanding! 🏆" : percentage >= 50 ? "Good Effort! 👍" : "Keep Practicing! 📚"}
              </Text>
              <Text style={styles.resultSubtitle}>
                You scored <Text style={{ color: Colors.accent, fontWeight: "bold" }}>{finalScore}</Text> out of{" "}
                <Text style={{ fontWeight: "bold" }}>{activeTest.questions.length}</Text> questions correctly.
              </Text>

              {savingResult && (
                <View style={styles.savingRow}>
                  <ActivityIndicator size="small" color={Colors.accent} />
                  <Text style={styles.savingText}>Saving score to dashboard...</Text>
                </View>
              )}

              <View style={styles.resultActions}>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={() => {
                    setCurrentQIndex(0);
                    setUserAnswers({});
                    setTimeLeft(activeTest.timeLimit * 60);
                    setIsTestFinished(false);
                    setFinalScore(0);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.retryBtnText}>Retry Test</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.leaveBtn}
                  onPress={() => setActiveTest(null)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.leaveBtnText}>Back to Tests</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Answer Explanations Review */}
            <Text style={styles.reviewHeading}>Question by Question Review:</Text>
            {activeTest.questions.map((q, qIdx) => {
              const selected = userAnswers[qIdx];
              const isCorrect = selected === q.correctAnswer;
              return (
                <View
                  key={qIdx}
                  style={[styles.reviewCard, isCorrect ? styles.correctCard : styles.incorrectCard]}
                >
                  <View style={styles.reviewHeaderRow}>
                    {isCorrect ? <CheckIcon size={14} color="#059669" /> : <XIcon size={14} color="#DC2626" />}
                    <Text style={styles.qNumText}>
                      Q{qIdx + 1} of {activeTest.questions.length}
                    </Text>
                  </View>
                  <Text style={styles.reviewQText}>{q.questionText}</Text>

                  <View style={{ marginTop: 6, gap: 4 }}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      const isOptionSelected = optIdx === selected;

                      return (
                        <View
                          key={optIdx}
                          style={[
                            styles.reviewOptionBox,
                            isOptionCorrect && styles.reviewCorrectOption,
                            isOptionSelected && !isOptionCorrect && styles.reviewWrongOption,
                          ]}
                        >
                          <Text
                            style={[
                              styles.reviewOptionText,
                              isOptionCorrect && { color: "#065F46", fontWeight: "bold" },
                              isOptionSelected && !isOptionCorrect && { color: "#991B1B", fontWeight: "bold" },
                            ]}
                          >
                            {opt} {isOptionCorrect ? "✓ (Correct)" : isOptionSelected ? "✗ (Your Answer)" : ""}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  {q.explanation && (
                    <Text style={styles.explanationText}>
                      <Text style={{ fontWeight: "bold" }}>Explanation: </Text>
                      {q.explanation}
                    </Text>
                  )}
                </View>
              );
            })}
            <View style={{ height: 110 }} />
          </ScrollView>
        </View>
      );
    }

    const currentQ = activeTest.questions[currentQIndex];
    const isAnswered = userAnswers[currentQIndex] !== undefined;

    return (
      <View style={styles.container}>
        {/* Test Header */}
        <View style={styles.testHeader}>
          <TouchableOpacity onPress={() => setActiveTest(null)} style={styles.headerBackBtn} activeOpacity={0.7}>
            <BackIcon size={16} color={Colors.textDark} />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <Text style={styles.testHeaderTitle} numberOfLines={1}>
              {activeTest.title}
            </Text>
            <Text style={styles.testHeaderSub}>
              Question {currentQIndex + 1} of {activeTest.questions.length}
            </Text>
          </View>
          <View style={styles.timerBadge}>
            <ClockIcon size={12} color="#EF4444" />
            <Text style={styles.timerText}>{formatTimer(timeLeft)}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQIndex + 1) / activeTest.questions.length) * 100}%` },
            ]}
          />
        </View>

        <ScrollView contentContainerStyle={styles.questionContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.questionCard}>
            <View style={styles.qNumTag}>
              <Text style={styles.qNumTagText}>Question {currentQIndex + 1}</Text>
            </View>

            <Text style={styles.questionText}>{currentQ.questionText}</Text>

            <View style={styles.optionsList}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQIndex] === optIdx;

                return (
                  <TouchableOpacity
                    key={optIdx}
                    style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                    onPress={() => handleSelectOption(optIdx)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.optionLetterCircle,
                        isSelected && styles.optionLetterCircleSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLetterText,
                          isSelected && { color: "#FFFFFF" },
                        ]}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </Text>
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation Controls */}
        <View style={styles.bottomNavRow}>
          <TouchableOpacity
            style={[styles.navBtn, currentQIndex === 0 && styles.navBtnDisabled]}
            disabled={currentQIndex === 0}
            onPress={() => setCurrentQIndex((prev) => prev - 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.navBtnText}>Previous</Text>
          </TouchableOpacity>

          {currentQIndex < activeTest.questions.length - 1 ? (
            <TouchableOpacity
              style={styles.navNextBtn}
              onPress={() => setCurrentQIndex((prev) => prev + 1)}
              activeOpacity={0.85}
            >
              <Text style={styles.navNextBtnText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navFinishBtn, !isAnswered && { opacity: 0.8 }]}
              onPress={finishTest}
              activeOpacity={0.85}
            >
              <Text style={styles.navFinishBtnText}>Finish Test</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // ─── TESTS GENERATOR & FEATURED TESTS LIST VIEW ───────────────────────────
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                <BackIcon size={18} color={Colors.textDark} />
              </TouchableOpacity>
            )}
            <View style={styles.badgeRow}>
              <SparklesIcon size={13} color="#F59E0B" />
              <Text style={styles.badgeText}>EXAM GENERATOR</Text>
            </View>
          </View>

          <Text style={styles.title}>Practice Tests & Mock Exams</Text>
          <Text style={styles.sindhiTitle}>
            سنڌي شاگردن لاءِ آنلائن ايم سي ڪيوز ٽيسٽ ۽ امتحانن جي مشق
          </Text>
          <Text style={styles.subtitle}>
            Practice STBB Science, Physics, Chemistry & STS screening tests with instant evaluation and detailed solutions.
          </Text>
        </View>

        {/* Custom Test Generator Card */}
        <View style={styles.generatorCard}>
          <Text style={styles.generatorTitle}>Generate Custom Mock Test</Text>

          {/* 1. Subject selector */}
          <Text style={styles.filterLabel}>1. Choose Subject</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsRow}
          >
            {subjects.map((sub) => {
              const isActive = selectedSubject === sub;
              return (
                <TouchableOpacity
                  key={sub}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setSelectedSubject(sub)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.filterPillText, isActive && styles.filterPillTextActive]}
                  >
                    {sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* 2. Difficulty Level */}
          <Text style={styles.filterLabel}>2. Difficulty Level</Text>
          <View style={styles.levelsRow}>
            {levels.map((lvl) => {
              const isActive = selectedLevel === lvl;
              return (
                <TouchableOpacity
                  key={lvl}
                  style={[styles.levelBtn, isActive && styles.levelBtnActive]}
                  onPress={() => setSelectedLevel(lvl)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.levelBtnText, isActive && styles.levelBtnTextActive]}>
                    {lvl.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 3. Test Type */}
          <Text style={styles.filterLabel}>3. Assessment Type</Text>
          <View style={styles.levelsRow}>
            {types.map((t) => {
              const isActive = selectedType === t;
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.levelBtn, isActive && styles.levelBtnActive]}
                  onPress={() => setSelectedType(t)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.levelBtnText, isActive && styles.levelBtnTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.startCustomBtn}
            activeOpacity={0.88}
            onPress={startCustomTest}
          >
            <TestsIcon size={16} color="#FFFFFF" />
            <Text style={styles.startCustomBtnText}>Start Generated Test</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Quick-Start Tests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Science & Math Tests</Text>
          <Text style={styles.sectionSindhiTitle}>سنڌ بورڊ ۽ آءِ بي اي سکر جي اهم ترين ٽيسٽون</Text>
        </View>

        <View style={styles.testsGrid}>
          {FEATURED_TESTS.map((test) => (
            <View key={test.id} style={styles.testCard}>
              <View style={styles.testCardHeader}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{test.type}</Text>
                </View>
                <View style={styles.subjectBadge}>
                  <Text style={styles.subjectBadgeText}>{test.subject}</Text>
                </View>
              </View>

              <Text style={styles.cardTestTitle}>{test.title}</Text>

              <View style={styles.cardMetaRow}>
                <View style={styles.cardMetaItem}>
                  <FileQuestionIcon size={13} color={Colors.accent} />
                  <Text style={styles.cardMetaText}>{test.mcqs} MCQs</Text>
                </View>
                <View style={styles.cardMetaItem}>
                  <ClockIcon size={13} color="#F59E0B" />
                  <Text style={styles.cardMetaText}>{test.time} Min</Text>
                </View>
              </View>

              <View style={styles.diffBarContainer}>
                <View style={styles.diffHeader}>
                  <Text style={styles.diffLabel}>DIFFICULTY</Text>
                  <Text style={styles.diffValue}>{test.difficultyPercentage}%</Text>
                </View>
                <View style={styles.diffTrack}>
                  <View
                    style={[styles.diffFill, { width: `${test.difficultyPercentage}%` }]}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.takeTestBtn}
                activeOpacity={0.85}
                onPress={() => startFeaturedTest(test)}
              >
                <Text style={styles.takeTestBtnText}>Start Test Now</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    backgroundColor: "#FFFBEB",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEF3C7",
    gap: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#B45309",
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
  generatorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  generatorTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 6,
    marginTop: 4,
  },
  pillsRow: {
    gap: 6,
    marginBottom: 10,
  },
  filterPill: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterPillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textDark,
  },
  filterPillTextActive: {
    color: "#FFFFFF",
  },
  levelsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  levelBtn: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  levelBtnActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  levelBtnText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textDark,
  },
  levelBtnTextActive: {
    color: "#FFFFFF",
  },
  startCustomBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginTop: 6,
  },
  startCustomBtnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textDark,
  },
  sectionSindhiTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.accent,
    marginTop: 1,
  },
  testsGrid: {
    gap: 10,
  },
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  testCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  typeBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.accent,
  },
  subjectBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subjectBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#2563EB",
  },
  cardTestTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    lineHeight: 17,
    marginBottom: 8,
  },
  cardMetaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  cardMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardMetaText: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: "600",
  },
  diffBarContainer: {
    marginBottom: 10,
  },
  diffHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  diffLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: Colors.textMuted,
  },
  diffValue: {
    fontSize: 8,
    fontWeight: "800",
    color: Colors.accent,
  },
  diffTrack: {
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    overflow: "hidden",
  },
  diffFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  takeTestBtn: {
    backgroundColor: "#FAF7F2",
    borderWidth: 1,
    borderColor: "rgba(124, 92, 255, 0.3)",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  takeTestBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.accent,
  },
  // Active Test Styles
  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerBackBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
  },
  testHeaderTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
  },
  testHeaderSub: {
    fontSize: 10,
    color: Colors.textLight,
  },
  timerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  timerText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#EF4444",
  },
  progressBar: {
    height: 3,
    backgroundColor: "#F1F5F9",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.accent,
  },
  questionContainer: {
    padding: 14,
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  qNumTag: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  qNumTagText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.accent,
  },
  questionText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textDark,
    lineHeight: 20,
    marginBottom: 14,
  },
  optionsList: {
    gap: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 10,
    gap: 10,
  },
  optionButtonSelected: {
    backgroundColor: Colors.accentLight,
    borderColor: Colors.accent,
  },
  optionLetterCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterCircleSelected: {
    backgroundColor: Colors.accent,
  },
  optionLetterText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textDark,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textDark,
    flex: 1,
    lineHeight: 16,
  },
  optionTextSelected: {
    color: Colors.accent,
    fontWeight: "700",
  },
  bottomNavRow: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: 10,
  },
  navBtn: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textDark,
  },
  navNextBtn: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  navNextBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  navFinishBtn: {
    flex: 1,
    backgroundColor: "#10B981",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  navFinishBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  // Result View
  resultContainer: {
    padding: 14,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 14,
  },
  scoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accentLight,
    borderWidth: 3,
    borderColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  scoreCircleText: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.accent,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.textDark,
    marginBottom: 3,
  },
  resultSubtitle: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 12,
  },
  savingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  savingText: {
    fontSize: 11,
    color: Colors.textLight,
  },
  resultActions: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  retryBtn: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },
  retryBtnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },
  leaveBtn: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },
  leaveBtnText: {
    color: Colors.textDark,
    fontWeight: "700",
    fontSize: 12,
  },
  reviewHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 8,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  correctCard: {
    borderColor: "#A7F3D0",
  },
  incorrectCard: {
    borderColor: "#FECACA",
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  qNumText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textLight,
  },
  reviewQText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textDark,
    lineHeight: 16,
  },
  reviewOptionBox: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
  },
  reviewCorrectOption: {
    backgroundColor: "#ECFDF5",
  },
  reviewWrongOption: {
    backgroundColor: "#FEF2F2",
  },
  reviewOptionText: {
    fontSize: 11,
    color: Colors.textDark,
  },
  explanationText: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 6,
    lineHeight: 14,
  },
});

export default TestsScreen;
