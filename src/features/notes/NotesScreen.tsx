import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Linking,
  Share,
  Alert,
} from 'react-native';
import Colors from '../../theme/Colors';
import { STBB_NOTES_DATA, STBBNote } from '../../data/academyData';
import {
  NotesIcon,
  SearchIcon,
  DownloadIcon,
  ShareIcon,
  BackIcon,
  BookOpenIcon,
  CheckIcon,
} from '../../shared/widgets/Icons';

interface NotesScreenProps {
  onBack?: () => void;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Class 10th Biology',
    'Class 8th STBB',
    'Class 7th STBB',
    'STS / JST Prep',
  ];

  const filteredNotes = useMemo(() => {
    return STBB_NOTES_DATA.filter((note) => {
      const matchesCat = selectedCategory === 'All' || note.category === selectedCategory;
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.sindhiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownload = (note: STBBNote) => {
    if (note.downloadUrl && note.downloadUrl !== '#') {
      Linking.openURL(note.downloadUrl).catch(() => {
        Alert.alert('Download Error', 'Could not open Google Drive link. Please try again.');
      });
    } else {
      Alert.alert(
        'STBB Notes',
        `Title: ${note.title}\nSindhi: ${note.sindhiTitle}\nPages: ${note.pages} | Size: ${note.size}\n\nThis chapter is available in the DVA study library.`
      );
    }
  };

  const handleShare = async (note: STBBNote) => {
    try {
      await Share.share({
        title: note.title,
        message: `*Dreams Virtual Academy - Study Notes*\n${note.title}\n${note.sindhiTitle}\n\nDownload Link: ${note.downloadUrl}\nJoin online batches on WhatsApp: 0301-8183624`,
      });
    } catch (e) {
      // Ignored
    }
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
              <BookOpenIcon size={12} color={Colors.accent} />
              <Text style={styles.badgeText}>STUDY MATERIAL & SYLLABUS</Text>
            </View>
          </View>

          <Text style={styles.title}>Class 10th Biology & STBB Notes</Text>
          <Text style={styles.sindhiTitle}>
            سنڌ ٽيڪسٽ بڪ بورڊ مڪمل ڪتاب، نوٽس ۽ حل ٿيل پيپرز
          </Text>
          <Text style={styles.subtitle}>
            Download authentic Sindh Textbook Board (STBB) PDF books, chapter summaries, and past paper solutions for matriculation and STS Sukkur IBA test preparation.
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchBar}>
          <SearchIcon size={16} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Biology chapters, STBB Science, Pedagogy..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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

        {/* Notes Cards List */}
        <View style={styles.notesList}>
          {filteredNotes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{note.category}</Text>
                </View>

                {note.isHot && (
                  <View style={styles.hotBadge}>
                    <Text style={styles.hotBadgeText}>🔥 HOT</Text>
                  </View>
                )}
              </View>

              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteSindhiTitle}>{note.sindhiTitle}</Text>
              <Text style={styles.noteDesc}>{note.description}</Text>

              {/* Meta information row */}
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>📄 {note.pages} Pages</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>💾 {note.size}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>⬇️ {note.downloads} Downloads</Text>
              </View>

              {/* Actions row */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => handleDownload(note)}
                  activeOpacity={0.85}
                >
                  <DownloadIcon size={15} color="#FFFFFF" />
                  <Text style={styles.downloadBtnText}>
                    {note.downloadUrl.includes('drive.google') ? 'Open Drive PDF' : 'Download Notes'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() => handleShare(note)}
                  activeOpacity={0.8}
                >
                  <ShareIcon size={15} color={Colors.textDark} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredNotes.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No notes found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search query or selected category.</Text>
            </View>
          )}
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
    backgroundColor: Colors.accentLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 92, 255, 0.2)',
    gap: 5,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.accent,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
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
  catScroll: {
    gap: 6,
    marginBottom: 14,
    paddingRight: 10,
  },
  catPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
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
  notesList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.accent,
  },
  hotBadge: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hotBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#EF4444',
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textDark,
    lineHeight: 17,
    marginBottom: 2,
  },
  noteSindhiTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.accent,
    marginBottom: 6,
    lineHeight: 16,
  },
  noteDesc: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 15,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '600',
  },
  metaDot: {
    color: Colors.textMuted,
    fontSize: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  downloadBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default NotesScreen;
