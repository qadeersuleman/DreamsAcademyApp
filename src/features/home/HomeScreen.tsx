import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet,
  Modal,
  Linking,
} from "react-native";
import Colors from "../../theme/Colors";
import {
  FACULTY_MEMBERS,
  SCIENCE_DIAGRAMS,
  ScienceDiagram,
  FacultyMember,
  COURSES_DATA,
  TESTIMONIALS,
} from "../../data/academyData";
import {
  WhatsAppIcon,
  SparklesIcon,
  SearchIcon,
  NotesIcon,
  TestsIcon,
  BatchesIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
  GraduationCapIcon,
  UsersGroupIcon,
  ChevronRightIcon,
} from "../../shared/widgets/Icons";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

interface HomeScreenProps {
  onNavigateToTab: (tabIndex: number) => void;
  onSelectSubject?: (subject: any) => void;
  user?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToTab, user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiagram, setSelectedDiagram] = useState<ScienceDiagram | null>(null);

  const handleDiagramClick = (diagram: ScienceDiagram) => {
    setSelectedDiagram(diagram);
  };

  const handleConsultFaculty = (faculty: FacultyMember) => {
    const url = `https://wa.me/923018183624?text=${encodeURIComponent(faculty.whatsappMsg)}`;
    Linking.openURL(url).catch(() => {});
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.dva_name ||
    (user?.email ? user.email.split("@")[0] : "Student");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../assets/logo-yellow.png")}
              style={styles.logoHeaderImg}
              resizeMode="cover"
            />
            <View style={styles.headerTitleWrap}>
              <Text style={styles.headerMainTitle}>DREAMS</Text>
              <Text style={styles.headerSubTitle}>Virtual Academy</Text>
            </View>
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.whatsappNavBtn}
              onPress={() => Linking.openURL("https://wa.me/923018183624").catch(() => {})}
              activeOpacity={0.8}
            >
              <WhatsAppIcon size={14} color="#FFFFFF" />
              <Text style={styles.whatsappNavBtnText}>Help</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileNavBtn}
              onPress={() => onNavigateToTab(6)}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Greeting Strip */}
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greetingSub}>Khush Amdeed • ڀلي ڪري آيا</Text>
            <Text style={styles.greetingTitle}>Hello, {userName} 👋</Text>
          </View>
          <View style={styles.verifiedStudentChip}>
            <Text style={styles.verifiedStudentText}>Active Learner</Text>
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <SparklesIcon size={13} color="#F59E0B" />
            <Text style={styles.heroBadgeText}>Sindh's Premier Science Academy</Text>
          </View>

          <Text style={styles.heroTitle}>
            Dreams Virtual <Text style={{ color: Colors.accent }}>Academy</Text>
          </Text>

          <Text style={styles.heroSindhiTitle}>
            سنڌي شاگردن لاءِ سائنس، فزڪس ۽ نوڪرين جي ٽيسٽن جي تياري
          </Text>

          <Text style={styles.heroSubtitle}>
            Master STBB Science, Physics, Chemistry & Math in simple Sindhi. Prepare for Sindh Board & STS/JST screening tests with top educators.
          </Text>

          {/* Hero CTAs */}
          <View style={styles.heroCtaGrid}>
            <TouchableOpacity
              style={styles.primaryHeroCta}
              onPress={() => onNavigateToTab(1)}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryHeroCtaText}>Explore Batches (داخلا وٺو)</Text>
              <ArrowRightIcon size={14} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.secondaryCtaRow}>
              <TouchableOpacity
                style={styles.secondaryHeroCta}
                onPress={() => onNavigateToTab(2)}
                activeOpacity={0.8}
              >
                <TestsIcon size={15} color={Colors.accent} />
                <Text style={styles.secondaryHeroCtaText}>Mock Tests</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryHeroCta}
                onPress={() => onNavigateToTab(3)}
                activeOpacity={0.8}
              >
                <NotesIcon size={15} color={Colors.accent} />
                <Text style={styles.secondaryHeroCtaText}>STBB Notes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sindh Districts Strip */}
        <View style={styles.districtStrip}>
          <View style={styles.districtBadge}>
            <GraduationCapIcon size={14} color={Colors.accent} />
            <Text style={styles.districtBadgeText}>Sindh-wide:</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.districtScroll}
          >
            {[
              "Sukkur",
              "Larkana",
              "Hyderabad",
              "Khairpur",
              "Nawabshah",
              "Dadu",
              "Mirpurkhas",
              "Karachi",
              "Ghotki",
              "Shikarpur",
            ].map((d, i) => (
              <View key={i} style={styles.districtItem}>
                <Text style={styles.districtName}>{d}</Text>
                {i < 9 && <Text style={styles.districtDot}>•</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Modern Search Bar */}
        <View style={styles.searchContainer}>
          <SearchIcon size={17} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search STBB Notes, STS MCQs, Physics Videos..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Subject Category Grid */}
        <View style={styles.categoryGrid}>
          {[
            { title: "Physics", sindhi: "فزڪس", tab: 4, icon: "⚡", bg: "#EFF6FF", border: "#DBEAFE" },
            { title: "Biology", sindhi: "حياتيات", tab: 4, icon: "🧬", bg: "#F0FDF4", border: "#DCFCE7" },
            { title: "Chemistry", sindhi: "ڪيمسٽري", tab: 1, icon: "⚗️", bg: "#FAF5FF", border: "#F3E8FF" },
            { title: "Mathematics", sindhi: "رياضي", tab: 1, icon: "📐", bg: "#FFFBEB", border: "#FEF3C7" },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.categoryTile, { backgroundColor: item.bg, borderColor: item.border }]}
              onPress={() => onNavigateToTab(item.tab)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryTileEmoji}>{item.icon}</Text>
              <Text style={styles.categoryTileTitle}>{item.title}</Text>
              <Text style={styles.categoryTileSindhi}>{item.sindhi}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Courses Carousel */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Featured Live Batches</Text>
            <Text style={styles.sectionSubtitle}>نئين بيچز ۾ داخلا وٺو (آنلائن ڪلاسن جو شيڊيول)</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigateToTab(1)}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesScroll}
        >
          {COURSES_DATA.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => onNavigateToTab(1)}
              activeOpacity={0.9}
            >
              <View style={styles.courseThumbContainer}>
                {course.thumbnailUrl ? (
                  <Image
                    source={{ uri: course.thumbnailUrl }}
                    style={styles.courseThumb}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={course.instructorPhoto}
                    style={styles.courseThumb}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.courseBadge}>
                  <Text style={styles.courseBadgeText}>{course.badge || course.category}</Text>
                </View>
                <View style={styles.courseFeePill}>
                  <Text style={styles.courseFeeText}>{course.fee}</Text>
                </View>
              </View>

              <View style={styles.courseInfo}>
                <View style={styles.courseRatingRow}>
                  <StarIcon size={12} color="#F59E0B" />
                  <Text style={styles.courseRatingText}>{course.rating || 4.9}</Text>
                  <Text style={styles.courseStudentsText}>• {course.studentsCount || "1k+ Enrolled"}</Text>
                </View>

                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.courseSindhi} numberOfLines={1}>
                  {course.sindhiTitle}
                </Text>

                <View style={styles.courseInstructorRow}>
                  <Image source={course.instructorPhoto} style={styles.instructorMiniAvatar} />
                  <Text style={styles.instructorMiniName} numberOfLines={1}>
                    {course.instructorName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Key Statistics Bar */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <UsersGroupIcon size={18} color={Colors.accent} />
            <Text style={styles.statNumber}>15,000+</Text>
            <Text style={styles.statLabel}>Sindhi Students</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <GraduationCapIcon size={18} color="#10B981" />
            <Text style={styles.statNumber}>85+</Text>
            <Text style={styles.statLabel}>Video Lectures</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <SparklesIcon size={18} color="#F59E0B" />
            <Text style={styles.statNumber}>4 Mentors</Text>
            <Text style={styles.statLabel}>Expert Faculty</Text>
          </View>
        </View>

        {/* Anatomical Diagrams Section */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Science Anatomical Diagrams</Text>
            <Text style={styles.sectionSubtitle}>انساني جسم جي اهم عضون جا تفصيلي خاڪا</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.diagramsScroll}
        >
          {SCIENCE_DIAGRAMS.map((diagram) => (
            <TouchableOpacity
              key={diagram.id}
              style={styles.diagramCard}
              onPress={() => handleDiagramClick(diagram)}
              activeOpacity={0.88}
            >
              <Image source={diagram.image} style={styles.diagramImage} resizeMode="cover" />
              <View style={styles.diagramInfo}>
                <View style={styles.diagramCategoryBadge}>
                  <Text style={styles.diagramCategoryText}>{diagram.category}</Text>
                </View>
                <Text style={styles.diagramTitle} numberOfLines={1}>
                  {diagram.title}
                </Text>
                <Text style={styles.diagramSindhi} numberOfLines={1}>
                  {diagram.sindhiTitle}
                </Text>
                <Text style={styles.diagramTapHint}>Tap to view anatomy labels 🔍</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dedicated Faculty Mentors */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Meet Our Dedicated Mentors</Text>
            <Text style={styles.sectionSubtitle}>ڊريمز اڪيڊمي جا ماهر استاد ۽ رهبر</Text>
          </View>
        </View>

        <View style={styles.facultyGrid}>
          {FACULTY_MEMBERS.map((mentor) => (
            <View key={mentor.id} style={styles.facultyCard}>
              <View style={styles.facultyTopRow}>
                <Image source={mentor.photo} style={styles.facultyPhoto} />
                <View style={{ flex: 1 }}>
                  <View style={styles.roleBadgeContainer}>
                    <Text style={styles.roleBadgeText}>{mentor.roleBadge}</Text>
                  </View>
                  <Text style={styles.facultyName}>{mentor.name}</Text>
                  <Text style={styles.facultySindhiName}>{mentor.sindhiName}</Text>
                  <Text style={styles.facultyTitle}>{mentor.title}</Text>
                  <Text style={styles.facultyEdu}>{mentor.education}</Text>
                </View>
              </View>

              <Text style={styles.facultyDesc}>{mentor.description}</Text>

              <View style={styles.facultyTagsRow}>
                {mentor.subjects.map((sub, idx) => (
                  <View key={idx} style={styles.facultyTag}>
                    <Text style={styles.facultyTagText}>{sub}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.consultBtn}
                onPress={() => handleConsultFaculty(mentor)}
                activeOpacity={0.85}
              >
                <WhatsAppIcon size={14} color="#FFFFFF" />
                <Text style={styles.consultBtnText}>Ask Guidance on WhatsApp</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Student Testimonials */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Student Success Stories</Text>
            <Text style={styles.sectionSubtitle}>شاگردن جا تاثرات ۽ ڪاميابي جو راز</Text>
          </View>
        </View>

        <View style={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, idx) => (
            <View key={idx} style={styles.testimonialCard}>
              <View style={styles.testimonialStarsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} size={12} color="#F59E0B" />
                ))}
              </View>
              <Text style={styles.testimonialText}>"{t.text}"</Text>
              <View style={styles.testimonialUserRow}>
                {t.avatar ? (
                  <Image source={{ uri: t.avatar }} style={styles.testimonialAvatar} />
                ) : (
                  <View style={styles.testimonialAvatarPlaceholder}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: Colors.accent }}>
                      {t.name[0]}
                    </Text>
                  </View>
                )}
                <View>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialRole}>{t.role}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Spacing for floating bottom bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Anatomical Diagram Modal */}
      <Modal
        visible={!!selectedDiagram}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedDiagram(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.diagramModalContent}>
            <View style={styles.diagramModalHeader}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.diagramModalTitle}>{selectedDiagram?.title}</Text>
                <Text style={styles.diagramModalSindhi}>{selectedDiagram?.sindhiTitle}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedDiagram(null)}
                style={styles.diagramModalClose}
              >
                <Text style={styles.diagramModalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedDiagram?.image && (
                <Image
                  source={selectedDiagram.image}
                  style={styles.modalDiagramImage}
                  resizeMode="contain"
                />
              )}

              <Text style={styles.diagramDescription}>{selectedDiagram?.description}</Text>

              <Text style={styles.labelsHeading}>Anatomical Labels (اہم حصا):</Text>
              <View style={styles.labelsGrid}>
                {selectedDiagram?.labels.map((label, i) => (
                  <View key={i} style={styles.labelChip}>
                    <CheckIcon size={12} color="#10B981" />
                    <Text style={styles.labelChipText}>{label}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoHeaderImg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 8,
  },
  headerTitleWrap: {
    justifyContent: "center",
  },
  headerMainTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: Colors.textDark,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  headerSubTitle: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.accent,
    letterSpacing: 0.2,
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  whatsappNavBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    gap: 4,
  },
  whatsappNavBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  profileNavBtn: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  greetingSub: {
    fontSize: 11,
    color: Colors.textLight,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textDark,
    letterSpacing: -0.2,
  },
  verifiedStudentChip: {
    backgroundColor: Colors.accentLight,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(124, 92, 255, 0.2)",
  },
  verifiedStudentText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.accent,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 14,
  },
  heroBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FEF3C7",
    gap: 5,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.1,
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: Colors.textDark,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  heroSindhiTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.accent,
    marginBottom: 8,
    lineHeight: 20,
  },
  heroSubtitle: {
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 17,
    marginBottom: 14,
  },
  heroCtaGrid: {
    gap: 8,
  },
  primaryHeroCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
    elevation: 2,
  },
  primaryHeroCtaText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },
  secondaryCtaRow: {
    flexDirection: "row",
    gap: 8,
  },
  secondaryHeroCta: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: "rgba(244, 196, 127, 0.5)",
    paddingVertical: 9,
    borderRadius: 10,
    gap: 5,
  },
  secondaryHeroCtaText: {
    color: Colors.textDark,
    fontWeight: "700",
    fontSize: 11,
  },
  districtStrip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  districtBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 6,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    marginRight: 6,
  },
  districtBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.accent,
  },
  districtScroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  districtItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  districtName: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textLight,
  },
  districtDot: {
    marginHorizontal: 5,
    color: Colors.accent,
    fontSize: 9,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: Colors.textDark,
    paddingVertical: 2,
  },
  categoryGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  categoryTile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  categoryTileEmoji: {
    fontSize: 18,
    marginBottom: 3,
  },
  categoryTileTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textDark,
  },
  categoryTileSindhi: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textLight,
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textDark,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.accent,
    marginTop: 1,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.accent,
  },
  coursesScroll: {
    gap: 12,
    marginBottom: 18,
    paddingRight: 10,
  },
  courseCard: {
    width: width * 0.68,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  courseThumbContainer: {
    width: "100%",
    height: 115,
    backgroundColor: "#F1F5F9",
    position: "relative",
  },
  courseThumb: {
    width: "100%",
    height: "100%",
  },
  courseBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(30, 26, 41, 0.85)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  courseBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  courseFeePill: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  courseFeeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  courseInfo: {
    padding: 10,
  },
  courseRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 4,
  },
  courseRatingText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textDark,
  },
  courseStudentsText: {
    fontSize: 10,
    color: Colors.textLight,
  },
  courseTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
    lineHeight: 16,
    marginBottom: 2,
  },
  courseSindhi: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: "600",
    marginBottom: 8,
  },
  courseInstructorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  instructorMiniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  instructorMiniName: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textLight,
    flex: 1,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 18,
    alignItems: "center",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#F1F5F9",
  },
  statNumber: {
    fontSize: 13,
    fontWeight: "900",
    color: Colors.textDark,
    marginTop: 3,
  },
  statLabel: {
    fontSize: 9,
    color: Colors.textLight,
    marginTop: 1,
  },
  diagramsScroll: {
    gap: 12,
    marginBottom: 20,
    paddingRight: 10,
  },
  diagramCard: {
    width: width * 0.65,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  diagramImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#F8FAFC",
  },
  diagramInfo: {
    padding: 10,
  },
  diagramCategoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  diagramCategoryText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.accent,
  },
  diagramTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
  },
  diagramSindhi: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.accent,
    marginTop: 1,
  },
  diagramTapHint: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 5,
  },
  facultyGrid: {
    gap: 10,
    marginBottom: 20,
  },
  facultyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    elevation: 1,
  },
  facultyTopRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  facultyPhoto: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  roleBadgeContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF3C7",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 6,
    marginBottom: 2,
  },
  roleBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#B45309",
  },
  facultyName: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
  },
  facultySindhiName: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.accent,
  },
  facultyTitle: {
    fontSize: 10,
    color: Colors.textLight,
  },
  facultyEdu: {
    fontSize: 9,
    color: "#94A3B8",
  },
  facultyDesc: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 15,
    marginBottom: 8,
  },
  facultyTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 10,
  },
  facultyTag: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  facultyTagText: {
    fontSize: 9,
    color: Colors.textDark,
    fontWeight: "600",
  },
  consultBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 5,
  },
  consultBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  testimonialsGrid: {
    gap: 10,
    marginBottom: 10,
  },
  testimonialCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  testimonialStarsRow: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 6,
  },
  testimonialText: {
    fontSize: 11,
    color: Colors.textDark,
    lineHeight: 16,
    marginBottom: 8,
  },
  testimonialUserRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  testimonialAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  testimonialAvatarPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  testimonialName: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textDark,
  },
  testimonialRole: {
    fontSize: 9,
    color: Colors.textLight,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    padding: 16,
  },
  diagramModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    maxHeight: "82%",
  },
  diagramModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  diagramModalTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textDark,
  },
  diagramModalSindhi: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
  },
  diagramModalClose: {
    padding: 5,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },
  diagramModalCloseText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  modalDiagramImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    marginBottom: 10,
  },
  diagramDescription: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
    marginBottom: 10,
  },
  labelsHeading: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 6,
  },
  labelsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  labelChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  labelChipText: {
    fontSize: 10,
    color: "#065F46",
    fontWeight: "600",
  },
});

export default HomeScreen;
