import React, { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { MOCK_SUBJECTS, Subject, Lesson } from "../../data/mockData";
import { ClockIcon, SearchIcon, ArrowRightIcon, BackIcon, BookmarkIcon } from "../../shared/widgets/Icons";
import { AppCard, AppButton } from "../../shared/widgets/Widgets";
import { FadeInUp, BouncyPressable } from "../../shared/components/AnimatedComponents";
import Colors from "../../theme/Colors";

export const NotesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState<string | "all">("all");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Flatten all lessons with their subjects
  const allLessons: { lesson: Lesson; subject: Subject }[] = [];
  MOCK_SUBJECTS.forEach((subject) => {
    subject.lessons.forEach((lesson) => {
      allLessons.push({ lesson, subject });
    });
  });

  // Filter lessons based on search and subject selector
  const filteredLessons = allLessons.filter(({ lesson, subject }) => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = activeSubjectId === "all" || subject.id === activeSubjectId;

    return matchesSearch && matchesSubject;
  });

  const openLessonNotes = (lesson: Lesson, subject: Subject) => {
    setSelectedLesson(lesson);
    setSelectedSubject(subject);
  };

  // 1. Reading full notes screen
  if (selectedLesson && selectedSubject) {
    return (
      <View className="flex-1 bg-background">
        <FadeInUp delay={50} duration={300}>
          <View className="flex-row items-center px-5 py-4 bg-white border-b border-primary/10 shadow-sm shadow-primary/5">
            <BouncyPressable onPress={() => { setSelectedLesson(null); setSelectedSubject(null); }}>
              <View className="p-2.5 mr-3 bg-primary/10 rounded-full border border-primary/10">
                <BackIcon size={14} color={Colors.textDark} />
              </View>
            </BouncyPressable>
            <View className="flex-1">
              <Text className="text-[9px] uppercase font-extrabold text-accent tracking-widest">{selectedSubject.title} Study Note</Text>
              <Text className="text-xs font-extrabold text-textDark mt-0.5" numberOfLines={1}>{selectedLesson.title}</Text>
            </View>
          </View>
        </FadeInUp>

        <ScrollView className="flex-1 px-5 pt-5" contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Cover style header */}
          <FadeInUp delay={100}>
            <View className="mb-6 p-6 rounded-3xl bg-white border border-primary/20 shadow-sm shadow-primary/5">
              <View className="flex-row items-center justify-between mb-4">
                <View className="bg-accent/15 px-3 py-1 rounded-full border border-accent/10">
                  <Text className="text-[8px] font-extrabold text-accent uppercase tracking-widest">{selectedSubject.title}</Text>
                </View>
                <View className="flex-row items-center">
                  <ClockIcon size={10} color={Colors.textLight} />
                  <Text className="text-[9px] text-textLight font-extrabold ml-1.5">{selectedLesson.duration} read</Text>
                </View>
              </View>
              <Text className="text-base font-black text-textDark leading-6 mb-2">{selectedLesson.title}</Text>
              <Text className="text-[9px] text-textLight font-semibold">Subject Revision & Examination Summaries</Text>
            </View>
          </FadeInUp>

          {/* Book content summary */}
          <FadeInUp delay={185}>
            <Text className="text-xs text-textDark font-extrabold mb-3 uppercase tracking-wider pl-1">Topic Summary</Text>
            <AppCard className="mb-6 bg-white border border-primary/20 p-5 rounded-3xl">
              <Text className="text-[11px] text-textLight leading-5 text-justify">
                {selectedLesson.content}
              </Text>
            </AppCard>
          </FadeInUp>

          {/* Revision checklists */}
          <FadeInUp delay={250}>
            <Text className="text-xs text-textDark font-extrabold mb-3 uppercase tracking-wider pl-1">Key Revision Points</Text>
            <AppCard className="mb-8 bg-white border border-primary/20 p-5 rounded-3xl">
              <Text className="text-[10px] text-textLight leading-5">
                • Understand the basic terminologies and derivations.{"\n"}
                • Relate these concepts with physical or real-world application examples.{"\n"}
                • Work on past evaluation modules to enforce concept retention.{"\n"}
                • Consult tutor guidelines in video lectures for specific notes.
              </Text>
            </AppCard>
          </FadeInUp>

          <FadeInUp delay={320}>
            <AppButton 
              title="Close Study Notes" 
              onPress={() => { setSelectedLesson(null); setSelectedSubject(null); }} 
              variant="outline" 
              className="py-3.5 rounded-2xl" 
            />
          </FadeInUp>
        </ScrollView>
      </View>
    );
  }

  // 2. Default Notes list view
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-8 pb-3">
        <FadeInUp delay={50}>
          <Text className="text-sm font-black text-textDark tracking-tight uppercase">Notebook & Revision</Text>
          <Text className="text-[10px] text-textLight mt-0.5 mb-5 font-semibold">
            Search summary sheets and key revision points for exams.
          </Text>
        </FadeInUp>

        {/* Search */}
        <FadeInUp delay={120}>
          <View className="bg-white border border-primary/20 rounded-2xl px-4 py-3 flex-row items-center mb-5 shadow-sm shadow-primary/5">
            <SearchIcon size={14} color={Colors.textLight + "80"} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search concepts or notes..."
              placeholderTextColor={Colors.textLight + "80"}
              className="flex-1 text-xs text-textDark p-0 font-medium ml-2.5"
            />
          </View>
        </FadeInUp>

        {/* Filter chips (Subject selection) */}
        <FadeInUp delay={180}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
            <BouncyPressable onPress={() => setActiveSubjectId("all")}>
              <View className={`mr-2.5 px-4.5 py-1.5 rounded-full border ${activeSubjectId === "all" ? "bg-accent border-accent shadow-md shadow-accent/20" : "bg-white border-primary/20"}`}>
                <Text className={`text-[9px] font-extrabold uppercase tracking-wider ${activeSubjectId === "all" ? "text-white" : "text-textLight"}`}>
                  All Subjects
                </Text>
              </View>
            </BouncyPressable>
            {MOCK_SUBJECTS.map((sub) => (
              <BouncyPressable key={sub.id} onPress={() => setActiveSubjectId(sub.id)}>
                <View className={`mr-2.5 px-4.5 py-1.5 rounded-full border ${activeSubjectId === sub.id ? "bg-accent border-accent shadow-md shadow-accent/20" : "bg-white border-primary/20"}`}>
                  <Text className={`text-[9px] font-extrabold uppercase tracking-wider ${activeSubjectId === sub.id ? "text-white" : "text-textLight"}`}>
                    {sub.title}
                  </Text>
                </View>
              </BouncyPressable>
            ))}
          </ScrollView>
        </FadeInUp>

        {/* Revision cards */}
        <View className="mb-4">
          {filteredLessons.length > 0 ? (
            filteredLessons.map(({ lesson, subject }, index) => (
              <FadeInUp key={lesson.id} delay={250 + index * 80}>
                <BouncyPressable onPress={() => openLessonNotes(lesson, subject)}>
                  <View className="bg-white/90 border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5">
                    {/* Circle marker with notebook bookmark symbol */}
                    <View 
                      className="w-11 h-11 rounded-2xl items-center justify-center mr-4 border border-white"
                      style={{ backgroundColor: `${subject.color}12` }}
                    >
                      <BookmarkIcon size={16} color={subject.color} />
                    </View>

                    <View className="flex-1 mr-2">
                      <View className="flex-row items-center mb-1">
                        <View className="px-2 py-0.5 rounded-md border" style={{ borderColor: `${subject.color}25`, backgroundColor: `${subject.color}05` }}>
                          <Text className="text-[7px] font-extrabold uppercase tracking-widest" style={{ color: subject.color }}>{subject.title}</Text>
                        </View>
                        <Text className="text-[8px] text-textLight font-bold ml-2">• {lesson.duration} read</Text>
                      </View>
                      <Text className="text-xs font-extrabold text-textDark mb-0.5 tracking-tight">{lesson.title}</Text>
                      <Text className="text-[9px] text-textLight font-semibold" numberOfLines={1}>
                        {lesson.content}
                      </Text>
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
                <Text className="text-xs text-textLight font-semibold">No revision notes found.</Text>
              </View>
            </FadeInUp>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default NotesScreen;
