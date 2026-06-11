import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { MOCK_SUBJECTS, Subject } from "../../data/mockData";
import { ClockIcon, SearchIcon, PlayIcon, BackIcon, ArrowRightIcon } from "../../shared/widgets/Icons";
import { AppCard, AppButton } from "../../shared/widgets/Widgets";
import { FadeInUp, BouncyPressable } from "../../shared/components/AnimatedComponents";
import Colors from "../../theme/Colors";

interface VideoLecture {
  id: string;
  title: string;
  duration: string;
  tutor: string;
  subject: Subject;
  description: string;
  url: string;
}

export const VideosScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState<string | "all">("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoLecture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate mockup video data from MOCK_SUBJECTS
  const allVideos: VideoLecture[] = [];
  MOCK_SUBJECTS.forEach((subject) => {
    if (subject.id === "maths") {
      allVideos.push({
        id: "v_m1",
        title: "Understanding Composite & Inverse Functions",
        duration: "18 mins",
        tutor: "Dr. Elizabeth Vance",
        subject,
        description: "An in-depth video guide on mapping domains, composite functions f(g(x)) and working out mathematical inverse function limits.",
        url: "https://example.com/maths1"
      });
      allVideos.push({
        id: "v_m2",
        title: "Limits & Continuity Theory Walkthrough",
        duration: "24 mins",
        tutor: "Dr. Elizabeth Vance",
        subject,
        description: "Understand limit laws, continuity conditions, and intermediate value theorem with graphical visual representations.",
        url: "https://example.com/maths2"
      });
    } else if (subject.id === "physics") {
      allVideos.push({
        id: "v_p1",
        title: "Newton's Second Law: Forces & Mass Derivations",
        duration: "22 mins",
        tutor: "Prof. Alan Fletcher",
        subject,
        description: "Breaking down F = ma in multi-dimensional space, resolving force vector quantities, and solving frictional plane problems.",
        url: "https://example.com/phys1"
      });
    } else if (subject.id === "chemistry") {
      allVideos.push({
        id: "v_c1",
        title: "Periodic Trends & Atomic Orbitals",
        duration: "15 mins",
        tutor: "Dr. Sarah Jenkins",
        subject,
        description: "Electronic shell configurations, orbital shapes (s, p, d, f) and understanding electronegativity periodic charts.",
        url: "https://example.com/chem1"
      });
    } else if (subject.id === "computer_basics") {
      allVideos.push({
        id: "v_cb1",
        title: "DNS & Internet Protocols Explained Visually",
        duration: "20 mins",
        tutor: "Engr. Clara Dupont",
        subject,
        description: "Learn how IP packets travel across the web, routers, and how the Domain Name System resolves URLs to server IPs.",
        url: "https://example.com/comp1"
      });
    }
  });

  // Filter videos based on search and subject selector
  const filteredVideos = allVideos.filter((video) => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.subject.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = activeSubjectId === "all" || video.subject.id === activeSubjectId;

    return matchesSearch && matchesSubject;
  });

  // 1. Reading full notes/playing screen
  if (selectedVideo) {
    return (
      <View className="flex-1 bg-background justify-between">
        {/* Navigation bar */}
        <FadeInUp delay={50} duration={300}>
          <View className="flex-row items-center px-5 py-4 bg-white border-b border-primary/10 shadow-sm shadow-primary/5">
            <BouncyPressable onPress={() => { setSelectedVideo(null); setIsPlaying(false); }}>
              <View className="p-2.5 mr-3 bg-primary/10 rounded-full border border-primary/10">
                <BackIcon size={14} color={Colors.textDark} />
              </View>
            </BouncyPressable>
            <View className="flex-1">
              <Text className="text-[9px] uppercase font-extrabold text-accent tracking-widest">{selectedVideo.subject.title} Video</Text>
              <Text className="text-xs font-extrabold text-textDark mt-0.5" numberOfLines={1}>{selectedVideo.title}</Text>
            </View>
          </View>
        </FadeInUp>

        <ScrollView className="flex-1 px-5 pt-5" contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Animated Video Player Placeholder Card */}
          <FadeInUp delay={100}>
            <View className="mb-6 rounded-3xl overflow-hidden bg-textDark border border-primary/20 shadow-md shadow-primary/10">
              <View className="w-full h-48 bg-textDark items-center justify-center relative">
                {/* Background color styling gradient effect */}
                <View className="absolute inset-0 opacity-20" style={{ backgroundColor: selectedVideo.subject.color }} />
                
                {!isPlaying ? (
                  <BouncyPressable onPress={() => setIsPlaying(true)}>
                    <View className="w-16 h-16 rounded-full bg-accent items-center justify-center shadow-lg shadow-accent/40 border border-white/20">
                      <PlayIcon size={24} color="#FFFFFF" />
                    </View>
                  </BouncyPressable>
                ) : (
                  <BouncyPressable onPress={() => setIsPlaying(false)}>
                    <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center border border-white/40">
                      <Text className="text-[10px] font-black text-white uppercase tracking-widest">Pause</Text>
                    </View>
                  </BouncyPressable>
                )}

                {/* Bottom Video Progress Scrub Bar */}
                <View className="absolute bottom-4 left-4 right-4 flex-row items-center">
                  <Text className="text-[8px] text-white/80 font-extrabold mr-2">
                    {isPlaying ? "0:12" : "0:00"}
                  </Text>
                  <View className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden">
                    <View className="h-full bg-accent" style={{ width: isPlaying ? "8%" : "0%" }} />
                  </View>
                  <Text className="text-[8px] text-white/80 font-extrabold ml-2">
                    {selectedVideo.duration}
                  </Text>
                </View>
              </View>
            </View>
          </FadeInUp>

          {/* Video Detail Info */}
          <FadeInUp delay={180}>
            <View className="mb-6 p-6 rounded-3xl bg-white border border-primary/25 shadow-sm shadow-primary/5">
              <View className="flex-row items-center justify-between mb-4.5">
                <View className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10">
                  <Text className="text-[8px] font-extrabold text-textDark uppercase tracking-wider">{selectedVideo.tutor}</Text>
                </View>
                <Text className="text-[9px] text-textLight font-bold uppercase">{selectedVideo.duration}</Text>
              </View>
              <Text className="text-sm font-black text-textDark leading-5 mb-2.5">{selectedVideo.title}</Text>
              <Text className="text-[10px] text-textLight leading-4.5 text-justify">
                {selectedVideo.description}
              </Text>
            </View>
          </FadeInUp>

          {/* Topics covered card */}
          <FadeInUp delay={250}>
            <Text className="text-xs text-textDark font-extrabold mb-3 uppercase tracking-wider pl-1">Key Topics Covered</Text>
            <AppCard className="mb-8 bg-white border border-primary/20 p-5 rounded-3xl">
              <Text className="text-[10px] text-textLight leading-5">
                • 1. Core theory and base definitions.{"\n"}
                • 2. Real-world applications and demonstrations.{"\n"}
                • 3. Standard examination problem solving.{"\n"}
                • 4. Diagnostic quiz evaluation analysis.
              </Text>
            </AppCard>
          </FadeInUp>

          <FadeInUp delay={320}>
            <AppButton 
              title="Return to Video Catalog" 
              onPress={() => { setSelectedVideo(null); setIsPlaying(false); }} 
              variant="outline" 
              className="py-3.5 rounded-2xl" 
            />
          </FadeInUp>
        </ScrollView>
      </View>
    );
  }

  // 2. Default Videos list view
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-8 pb-3">
        <FadeInUp delay={50}>
          <Text className="text-sm font-black text-textDark tracking-tight uppercase">Video Lectures</Text>
          <Text className="text-[10px] text-textLight mt-0.5 mb-5 font-semibold">
            Watch interactive virtual classroom sessions by expert tutors.
          </Text>
        </FadeInUp>

        {/* Search */}
        <FadeInUp delay={120}>
          <View className="bg-white border border-primary/20 rounded-2xl px-4 py-3 flex-row items-center mb-5 shadow-sm shadow-primary/5">
            <SearchIcon size={14} color={Colors.textLight + "80"} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search lectures or tutors..."
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
                  All Classes
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

        {/* Video lecture cards */}
        <View className="mb-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <FadeInUp key={video.id} delay={250 + index * 80}>
                <BouncyPressable onPress={() => setSelectedVideo(video)}>
                  <View className="bg-white/90 border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5">
                    {/* Circle marker with mini play symbol */}
                    <View 
                      className="w-11 h-11 rounded-2xl items-center justify-center mr-4 border border-white"
                      style={{ backgroundColor: `${video.subject.color}12` }}
                    >
                      <PlayIcon size={12} color={video.subject.color} />
                    </View>

                    <View className="flex-1 mr-2">
                      <View className="flex-row items-center mb-1">
                        <View className="px-2 py-0.5 rounded-md border" style={{ borderColor: `${video.subject.color}25`, backgroundColor: `${video.subject.color}05` }}>
                          <Text className="text-[7px] font-extrabold uppercase tracking-widest" style={{ color: video.subject.color }}>{video.subject.title}</Text>
                        </View>
                        <Text className="text-[8px] text-textLight font-bold ml-2">• {video.duration}</Text>
                      </View>
                      <Text className="text-xs font-extrabold text-textDark mb-0.5 tracking-tight">{video.title}</Text>
                      <Text className="text-[9px] text-textLight font-semibold">
                        Tutor: {video.tutor}
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
                <Text className="text-xs text-textLight font-semibold">No video lectures found.</Text>
              </View>
            </FadeInUp>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default VideosScreen;
