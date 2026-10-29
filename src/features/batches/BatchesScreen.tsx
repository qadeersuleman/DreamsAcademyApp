import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COURSES_DATA, CourseBatch, SINDH_DISTRICTS } from '../../data/academyData';
import Colors from '../../theme/Colors';
import {
  WhatsAppIcon,
  SparklesIcon,
  CheckIcon,
  CheckCircleIcon,
  BackIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from '../../shared/widgets/Icons';
import { supabase } from '../../lib/supabase';
import Svg, { Path, Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

const SmartphoneIcon = ({ size = 18, color = Colors.accent }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth="1.8" />
    <Line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

interface BatchesScreenProps {
  onBack?: () => void;
  user?: any;
}

export const BatchesScreen: React.FC<BatchesScreenProps> = ({ onBack, user }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<CourseBatch | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('Sukkur');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All',
    'Language Mastery',
    'Job Test Preparation',
    'Sindh Board (STBB)',
    'Mathematics & Aptitude',
  ];

  const filteredCourses =
    selectedCategory === 'All'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === selectedCategory);

  const handleOpenEnrollment = (course: CourseBatch) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleConfirmAdmission = async () => {
    if (!studentName.trim() || !phone.trim()) {
      Alert.alert('Required Fields', 'Please enter your full name and WhatsApp phone number.');
      return;
    }

    if (!selectedCourse) return;

    setIsSubmitting(true);

    try {
      await supabase.from('course_enrollments').insert({
        user_id: user?.id || null,
        dva_name: studentName.trim(),
        dva_phone: phone.trim(),
        dva_age: age ? parseInt(age, 10) : null,
        dva_district: district,
        dva_course_id: selectedCourse.id,
        dva_course_title: selectedCourse.title,
        dva_price: selectedCourse.fee,
        payment_method: 'EasyPaisa / JazzCash',
        status: 'pending',
      });
    } catch (e) {
      console.log('Enrollment DB backup saved or skipped', e);
    }

    setIsSubmitting(false);
    setModalVisible(false);

    const message = `*DREAMS VIRTUAL ACADEMY - ADMISSION APPLICATION 2026*
---------------------------------------
• Student Name: ${studentName.trim()}
• WhatsApp Phone: ${phone.trim()}
• Student Age: ${age || 'N/A'}
• District: ${district}
---------------------------------------
• Batch Applied: ${selectedCourse.title}
• Batch Sindhi: ${selectedCourse.sindhiTitle}
• Instructor: ${selectedCourse.instructorName}
• Course Fee: ${selectedCourse.fee} (${selectedCourse.duration})
---------------------------------------
Salam Sir Dilshad Murtaza! I want to join this batch. I am sending my EasyPaisa / JazzCash payment screenshot for confirmation.`;

    const url = `https://wa.me/923018183624?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('WhatsApp Error', 'Could not launch WhatsApp. Please check if WhatsApp is installed.');
    });
  };

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
              <Text style={styles.badgeText}>ADMISSIONS OPEN 2026</Text>
            </View>
          </View>

          <Text style={styles.title}>Live Online Batches & Courses</Text>
          <Text style={styles.sindhiTitle}>
            سنڌي ٻوليءَ ۾ آسان ترين تعليم — اڄ ئي پنهنجي داخلا جي تصديق ڪريو
          </Text>
          <Text style={styles.subtitle}>
            Learn from expert teachers in Science, English Mastery, Chemistry, and Mathematics. Interactive live batches & recorded backups.
          </Text>
        </View>

        {/* Feature Highlights Bar */}
        <View style={styles.infoBar}>
          <View style={styles.infoCard}>
            <SmartphoneIcon size={18} color={Colors.accent} />
            <Text style={styles.infoCardTitle}>Low Data</Text>
            <Text style={styles.infoCardDesc}>Mobile friendly</Text>
          </View>
          <View style={styles.infoCardDivider} />
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>🗣️</Text>
            <Text style={styles.infoCardTitle}>Sindhi Medium</Text>
            <Text style={styles.infoCardDesc}>Native concepts</Text>
          </View>
          <View style={styles.infoCardDivider} />
          <View style={styles.infoCard}>
            <Text style={{ fontSize: 16 }}>💳</Text>
            <Text style={styles.infoCardTitle}>EasyPaisa/Jazz</Text>
            <Text style={styles.infoCardDesc}>Instant payment</Text>
          </View>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catPill, isActive && styles.catPillActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.75}
              >
                <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Courses List */}
        <View style={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <View
              key={course.id}
              style={[styles.courseCard, course.isFeatured && styles.featuredCard]}
            >
              {/* Course Thumbnail */}
              <View style={styles.cardThumbContainer}>
                {course.thumbnailUrl ? (
                  <Image
                    source={{ uri: course.thumbnailUrl }}
                    style={styles.cardThumb}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={course.instructorPhoto}
                    style={styles.cardThumb}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>{course.badge || course.category}</Text>
                </View>
                <View style={styles.cardFeeBadge}>
                  <Text style={styles.cardFeeText}>{course.fee}</Text>
                </View>
              </View>

              {/* Course Body */}
              <View style={styles.cardBody}>
                {/* Rating & Stats */}
                <View style={styles.ratingRow}>
                  <StarIcon size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>{course.rating || 4.9}</Text>
                  <Text style={styles.studentsCount}>• {course.studentsCount || "1,000+ Enrolled"}</Text>
                </View>

                {/* Title & Sindhi */}
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSindhiTitle}>{course.sindhiTitle}</Text>

                {/* Overview */}
                <Text style={styles.courseOverview}>{course.overview}</Text>

                {/* Features List */}
                <View style={styles.featuresContainer}>
                  {course.features.map((feat, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <CheckCircleIcon size={14} color="#10B981" />
                      <Text style={styles.featureText}>{feat}</Text>
                    </View>
                  ))}
                </View>

                {/* Schedule & Duration */}
                <View style={styles.metaRow}>
                  <ClockIcon size={13} color={Colors.textLight} />
                  <Text style={styles.metaText}>{course.schedule}</Text>
                </View>

                {/* Instructor Bar */}
                <View style={styles.instructorBox}>
                  <Image source={course.instructorPhoto} style={styles.instructorImg} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.instructorName}>{course.instructorName}</Text>
                    <Text style={styles.instructorRole}>{course.instructorRole}</Text>
                  </View>
                </View>

                {/* Enroll Button */}
                <TouchableOpacity
                  style={styles.enrollButton}
                  activeOpacity={0.85}
                  onPress={() => handleOpenEnrollment(course)}
                >
                  <WhatsAppIcon size={16} color="#FFFFFF" />
                  <Text style={styles.enrollButtonText}>داخلا وٺو (Enroll on WhatsApp)</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Admission / Enrollment Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.modalTitle}>Join Batch (داخلا فارم)</Text>
                <Text style={styles.modalSubtitle} numberOfLines={1}>
                  {selectedCourse?.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              {/* Fee Notice Box */}
              <View style={styles.feeNoticeBox}>
                <Text style={styles.feeNoticeTitle}>Fee Details & Account:</Text>
                <Text style={styles.feeNoticeText}>
                  • Course Fee: <Text style={{ fontWeight: 'bold' }}>{selectedCourse?.fee}</Text> ({selectedCourse?.duration})
                </Text>
                <Text style={styles.feeNoticeText}>
                  • EasyPaisa / JazzCash: <Text style={{ fontWeight: 'bold', color: '#059669' }}>0301-8183624</Text> (Dilshad Murtaza)
                </Text>
              </View>

              <Text style={styles.inputLabel}>Student Full Name (شاگرد جو پورو نالو)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Naveed Ali Soomro"
                placeholderTextColor={Colors.textMuted}
                value={studentName}
                onChangeText={setStudentName}
              />

              <Text style={styles.inputLabel}>WhatsApp Mobile Number (رابطي جو نمبر)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 0301-1234567"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <Text style={styles.inputLabel}>Age (عمر)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 18"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <Text style={styles.inputLabel}>District (ضلعو چونڊيو)</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.districtScroll}
              >
                {SINDH_DISTRICTS.map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.districtChip, district === d && styles.districtChipActive]}
                    onPress={() => setDistrict(d)}
                  >
                    <Text
                      style={[styles.districtText, district === d && styles.districtTextActive]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.submitAdmissionBtn}
                onPress={handleConfirmAdmission}
                disabled={isSubmitting}
                activeOpacity={0.88}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <WhatsAppIcon size={18} color="#FFFFFF" />
                    <Text style={styles.submitAdmissionBtnText}>
                      Send Application via WhatsApp
                    </Text>
                  </>
                )}
              </TouchableOpacity>
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
  header: {
    marginBottom: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    gap: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textDark,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  sindhiTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
    marginBottom: 6,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
  },
  infoBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
    alignItems: 'center',
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
  },
  infoCardDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F1F5F9',
  },
  infoCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textDark,
    marginTop: 2,
  },
  infoCardDesc: {
    fontSize: 8,
    color: Colors.textLight,
  },
  catScroll: {
    gap: 6,
    marginBottom: 14,
    paddingRight: 10,
  },
  catPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  catPillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDark,
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  coursesGrid: {
    gap: 14,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredCard: {
    borderColor: 'rgba(124, 92, 255, 0.4)',
  },
  cardThumbContainer: {
    width: '100%',
    height: 130,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  cardThumb: {
    width: '100%',
    height: '100%',
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(30, 26, 41, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  cardBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  cardFeeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.accent,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardFeeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  cardBody: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textDark,
  },
  studentsCount: {
    fontSize: 10,
    color: Colors.textLight,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textDark,
    lineHeight: 18,
    marginBottom: 2,
  },
  courseSindhiTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.accent,
    marginBottom: 6,
    lineHeight: 16,
  },
  courseOverview: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
    marginBottom: 10,
  },
  featuresContainer: {
    gap: 5,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 10,
    color: Colors.textDark,
    flex: 1,
    lineHeight: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 10,
    color: Colors.textLight,
  },
  instructorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: 10,
  },
  instructorImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  instructorName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textDark,
  },
  instructorRole: {
    fontSize: 9,
    color: Colors.textLight,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textDark,
  },
  modalSubtitle: {
    fontSize: 12,
    color: Colors.accent,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  modalCloseText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  feeNoticeBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  feeNoticeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
    marginBottom: 3,
  },
  feeNoticeText: {
    fontSize: 10,
    color: '#15803D',
    lineHeight: 15,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 4,
    marginTop: 6,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: Colors.textDark,
    marginBottom: 6,
  },
  districtScroll: {
    marginBottom: 14,
    marginTop: 4,
  },
  districtChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  districtChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  districtText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textDark,
  },
  districtTextActive: {
    color: '#FFFFFF',
  },
  submitAdmissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  submitAdmissionBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});

export default BatchesScreen;
