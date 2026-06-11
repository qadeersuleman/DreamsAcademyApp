import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Animated } from "react-native";
import { MOCK_SUBJECTS, Subject, Quiz, Question } from "../../data/mockData";
import { CheckIcon, ClockIcon, SearchIcon, ArrowRightIcon, BackIcon } from "../../shared/widgets/Icons";
import { AppCard, AppButton } from "../../shared/widgets/Widgets";
import { FadeInUp, BouncyPressable, AnimatedProgressBar } from "../../shared/components/AnimatedComponents";
import Colors from "../../theme/Colors";

interface TestsScreenProps {
  onSelectSubject?: (subject: Subject) => void;
}

export const TestsScreen: React.FC<TestsScreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  
  // Quiz running state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Collect all quizzes across all subjects
  const allQuizzes: { quiz: Quiz; subject: Subject }[] = [];
  MOCK_SUBJECTS.forEach((subject) => {
    subject.quizzes.forEach((quiz) => {
      allQuizzes.push({ quiz, subject });
    });
  });

  // Filter and search quizzes
  const filteredQuizzes = allQuizzes.filter(({ quiz, subject }) => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === "completed") return quiz.completed;
    if (filter === "pending") return !quiz.completed;
    return true;
  });

  const startQuiz = (quiz: Quiz, subject: Subject) => {
    setActiveQuiz(quiz);
    setActiveSubject(subject);
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
    const correctIdx = activeQuiz.questions[currentQuestionIdx].correctAnswerIndex;
    if (selectedOptionIdx === correctIdx) {
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

  // 1. If taking a quiz
  if (activeQuiz && activeSubject) {
    const currentQuestion = activeQuiz.questions[currentQuestionIdx];
    const percentage = Math.round(((currentQuestionIdx) / activeQuiz.questions.length) * 100);

    return (
      <View className="flex-1 bg-background justify-between">
        {/* Quiz Header */}
        <FadeInUp delay={50} duration={300}>
          <View className="flex-row items-center px-5 py-4 bg-white border-b border-primary/10 shadow-sm shadow-primary/5">
            <BouncyPressable onPress={() => setActiveQuiz(null)}>
              <View className="p-2.5 mr-3 bg-primary/10 rounded-full border border-primary/10">
                <BackIcon size={14} color={Colors.textDark} />
              </View>
            </BouncyPressable>
            <View className="flex-1">
              <Text className="text-[9px] uppercase font-extrabold text-accent tracking-widest">{activeSubject.title} Test</Text>
              <Text className="text-xs font-extrabold text-textDark mt-0.5" numberOfLines={1}>{activeQuiz.title}</Text>
            </View>
          </View>
        </FadeInUp>

        {!showResult ? (
          <ScrollView className="flex-1 px-5 pt-5" contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Progress indicator */}
            <FadeInUp delay={100}>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[9px] text-textLight font-extrabold uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                </Text>
                <Text className="text-[9px] font-extrabold text-accent">{percentage}% Completed</Text>
              </View>
              <View className="mb-6">
                <AnimatedProgressBar progress={currentQuestionIdx / activeQuiz.questions.length} color={Colors.accent} height={6} />
              </View>
            </FadeInUp>

            {/* Question Text */}
            <FadeInUp delay={180}>
              <AppCard className="mb-6 bg-white border border-primary/20 p-5 shadow-sm shadow-primary/5 rounded-3xl">
                <Text className="text-xs font-extrabold text-textDark leading-5">{currentQuestion.questionText}</Text>
              </AppCard>
            </FadeInUp>

            {/* Options list */}
            <View className="mb-6">
              {currentQuestion.options.map((option, idx) => {
                let borderStyle = "border-primary/20 bg-white/70";
                let textStyle = "text-textDark font-semibold";
                let accessory = null;

                if (selectedOptionIdx === idx) {
                  borderStyle = "border-accent bg-accent/5 shadow-sm shadow-accent/10";
                  textStyle = "text-accent font-extrabold";
                }

                if (isAnswerChecked) {
                  const correctIdx = currentQuestion.correctAnswerIndex;
                  if (idx === correctIdx) {
                    borderStyle = "border-success bg-success/5 shadow-sm shadow-success/10";
                    textStyle = "text-success font-extrabold";
                    accessory = <CheckIcon size={12} color={Colors.success} />;
                  } else if (selectedOptionIdx === idx) {
                    borderStyle = "border-error bg-error/5 shadow-sm shadow-error/10";
                    textStyle = "text-error font-extrabold";
                  }
                }

                return (
                  <FadeInUp key={idx} delay={200 + idx * 80}>
                    <BouncyPressable onPress={() => handleOptionSelect(idx)}>
                      <View className={`border rounded-2xl p-4 mb-3 flex-row items-center justify-between shadow-sm shadow-textDark/5 ${borderStyle}`}>
                        <Text className={`text-[10px] flex-1 ${textStyle}`}>{option}</Text>
                        {accessory}
                      </View>
                    </BouncyPressable>
                  </FadeInUp>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          /* Result view */
          <View className="flex-grow justify-center items-center px-6">
            <FadeInUp delay={100}>
              <View className="w-20 h-20 bg-success/15 rounded-full items-center justify-center mb-5 border border-success/30 shadow-md shadow-success/15">
                <CheckIcon size={32} color={Colors.success} />
              </View>
            </FadeInUp>
            <FadeInUp delay={200}>
              <Text className="text-sm font-extrabold text-textDark tracking-tight uppercase">Assessment Completed</Text>
              <Text className="text-[10px] text-textLight font-semibold mt-1 mb-6">Your responses have been processed.</Text>
            </FadeInUp>

            <FadeInUp delay={300} style={{ width: "100%" }}>
              <AppCard className="w-full mb-8 p-6 items-center bg-white border border-primary/20 shadow-lg shadow-primary/10 rounded-3xl">
                <Text className="text-[10px] font-extrabold text-textLight uppercase tracking-widest">Mastery Level Score</Text>
                <Text className="text-4xl font-black text-accent my-2.5">{Math.round((score / activeQuiz.questions.length) * 100)}%</Text>
                <Text className="text-[9px] text-textLight font-bold uppercase tracking-wider">{score} out of {activeQuiz.questions.length} correct</Text>
              </AppCard>
            </FadeInUp>

            <FadeInUp delay={400} style={{ width: "100%" }}>
              <AppButton title="Finish & Go Back" onPress={() => setActiveQuiz(null)} variant="primary" className="py-3" />
            </FadeInUp>
          </View>
        )}

        {!showResult && (
          <FadeInUp delay={100}>
            <View className="px-5 py-5 border-t border-primary/10 bg-white shadow-lg shadow-textDark/5">
              {!isAnswerChecked ? (
                <AppButton
                  title="Verify Response"
                  onPress={handleCheckAnswer}
                  disabled={selectedOptionIdx === null}
                  variant="accent"
                  className="py-3"
                />
              ) : (
                <AppButton
                  title={currentQuestionIdx + 1 === activeQuiz.questions.length ? "Submit Score" : "Next Question"}
                  onPress={handleNextQuestion}
                  variant="accent"
                  className="py-3"
                />
              )}
            </View>
          </FadeInUp>
        )}
      </View>
    );
  }

  // 2. Default Quizzes List View
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-8 pb-3">
        <FadeInUp delay={50}>
          <Text className="text-sm font-black text-textDark tracking-tight uppercase">Module Evaluations</Text>
          <Text className="text-[10px] text-textLight mt-0.5 mb-5 font-semibold">
            Evaluate your knowledge using interactive test papers.
          </Text>
        </FadeInUp>

        {/* Search */}
        <FadeInUp delay={120}>
          <View className="bg-white border border-primary/20 rounded-2xl px-4 py-3 flex-row items-center mb-5 shadow-sm shadow-primary/5">
            <SearchIcon size={14} color={Colors.textLight + "80"} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search tests or subjects..."
              placeholderTextColor={Colors.textLight + "80"}
              className="flex-1 text-xs text-textDark p-0 font-medium ml-2.5"
            />
          </View>
        </FadeInUp>

        {/* Filter chips */}
        <FadeInUp delay={180}>
          <View className="flex-row mb-6">
            {(["all", "pending", "completed"] as const).map((t) => (
              <BouncyPressable key={t} onPress={() => setFilter(t)}>
                <View className={`mr-2.5 px-4 py-1.5 rounded-full border ${filter === t ? "bg-accent border-accent shadow-md shadow-accent/20" : "bg-white border-primary/20"}`}>
                  <Text className={`text-[9px] font-extrabold uppercase tracking-wider ${filter === t ? "text-white" : "text-textLight"}`}>
                    {t}
                  </Text>
                </View>
              </BouncyPressable>
            ))}
          </View>
        </FadeInUp>

        {/* Quiz list */}
        <View className="mb-4">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map(({ quiz, subject }, index) => (
              <FadeInUp key={quiz.id} delay={250 + index * 80}>
                <BouncyPressable onPress={() => startQuiz(quiz, subject)}>
                  <View className="bg-white/90 border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5">
                    {/* Circle icon marker */}
                    <View 
                      className="w-11 h-11 rounded-2xl items-center justify-center mr-4 border border-white"
                      style={{ backgroundColor: `${subject.color}12` }}
                    >
                      <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: subject.color }} />
                    </View>

                    <View className="flex-1 mr-2">
                      <View className="flex-row items-center mb-1">
                        <View className="px-2 py-0.5 rounded-md border" style={{ borderColor: `${subject.color}25`, backgroundColor: `${subject.color}05` }}>
                          <Text className="text-[7px] font-extrabold uppercase tracking-widest" style={{ color: subject.color }}>{subject.title}</Text>
                        </View>
                        <Text className="text-[8px] text-textLight font-bold ml-2">• {quiz.questions.length} items</Text>
                      </View>
                      <Text className="text-xs font-extrabold text-textDark mb-0.5 tracking-tight">{quiz.title}</Text>
                      
                      {quiz.completed ? (
                        <View className="flex-row items-center mt-1">
                          <CheckIcon size={10} color={Colors.success} />
                          <Text className="text-[9px] text-success font-extrabold ml-1">Score: {quiz.score}%</Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center mt-1">
                          <ClockIcon size={9} color={Colors.textLight} />
                          <Text className="text-[9px] text-textLight font-semibold ml-1">Not Completed</Text>
                        </View>
                      )}
                    </View>

                    {/* Action Arrow */}
                    <View className="w-8 h-8 rounded-full bg-primary/25 items-center justify-center border border-primary/30">
                      <ArrowRightIcon size={11} color={Colors.textDark} />
                    </View>
                  </View>
                </BouncyPressable>
              </FadeInUp>
            ))
          ) : (
            <FadeInUp delay={200}>
              <View className="py-12 items-center">
                <Text className="text-xs text-textLight font-semibold">No tests match your selection.</Text>
              </View>
            </FadeInUp>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TestsScreen;
