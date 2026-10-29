import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TextInput,
  Modal,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Colors from '../../theme/Colors';
import { ACADEMY_VIDEOS, AcademyVideo } from '../../data/academyData';
import {
  VideosIcon,
  PlayIcon,
  SearchIcon,
  BackIcon,
  SparklesIcon,
} from '../../shared/widgets/Icons';

const { width } = Dimensions.get('window');

interface YouTubeVideosScreenProps {
  onBack?: () => void;
}

export const YouTubeVideosScreen: React.FC<YouTubeVideosScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVideo, setPlayingVideo] = useState<AcademyVideo | null>(null);

  const categories = ['All', 'Pedagogy', 'Biology', 'Physics', 'Chemistry'];

  const filteredVideos = useMemo(() => {
    return ACADEMY_VIDEOS.filter((vid) => {
      const matchesCat = selectedCategory === 'All' || vid.category === selectedCategory;
      const matchesSearch =
        vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vid.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleWatchVideo = (video: AcademyVideo) => {
    setPlayingVideo(video);
  };

  const handleOpenYouTubeApp = (videoId: string) => {
    const appUrl = `vnd.youtube:${videoId}`;
    const webUrl = `https://www.youtube.com/watch?v=${videoId}`;

    Linking.canOpenURL(appUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(appUrl);
        } else {
          return Linking.openURL(webUrl);
        }
      })
      .catch(() => Linking.openURL(webUrl));
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
              <Text style={styles.badgeText}>VIDEO LECTURE SERIES</Text>
            </View>
          </View>

          <Text style={styles.title}>Sindhi Video Lectures & Tutorials</Text>
          <Text style={styles.sindhiTitle}>
            سنڌي ٻوليءَ ۾ فزڪس، حياتيات، ڪيمسٽري ۽ تدريسي طريقن جا وڊيوز
          </Text>
          <Text style={styles.subtitle}>
            Watch full syllabus video lectures covering Sindh Board Science & STS JST Screening Test Preparation by Sir Dilshad Murtaza.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <SearchIcon size={16} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lectures, topics (e.g. Brain, Pedagogy)..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
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

        {/* Video Cards Grid */}
        <View style={styles.videosGrid}>
          {filteredVideos.map((vid) => {
            const thumbnailUri = `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`;

            return (
              <View key={vid.id} style={styles.videoCard}>
                <TouchableOpacity
                  style={styles.thumbnailContainer}
                  activeOpacity={0.88}
                  onPress={() => handleWatchVideo(vid)}
                >
                  <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} resizeMode="cover" />
                  <View style={styles.playButtonOverlay}>
                    <PlayIcon size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{vid.category}</Text>
                  </View>
                  <View style={styles.hdTag}>
                    <Text style={styles.hdTagText}>HD 1080p</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {vid.title}
                  </Text>
                  <Text style={styles.videoDesc} numberOfLines={2}>
                    {vid.description}
                  </Text>

                  {/* Tags Row */}
                  <View style={styles.tagsRow}>
                    {vid.tags.map((t, idx) => (
                      <View key={idx} style={styles.tagPill}>
                        <Text style={styles.tagText}>#{t}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.watchNowBtn}
                      onPress={() => handleWatchVideo(vid)}
                      activeOpacity={0.85}
                    >
                      <PlayIcon size={12} color="#FFFFFF" />
                      <Text style={styles.watchNowBtnText}>Watch Lesson</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.ytAppBtn}
                      onPress={() => handleOpenYouTubeApp(vid.videoId)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.ytAppBtnText}>Open YouTube</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          {filteredVideos.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No video lessons found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search query.</Text>
            </View>
          )}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Embedded YouTube Player Modal */}
      <Modal
        visible={!!playingVideo}
        transparent
        animationType="slide"
        onRequestClose={() => setPlayingVideo(null)}
      >
        <View style={styles.playerBackdrop}>
          <View style={styles.playerContent}>
            <View style={styles.playerHeader}>
              <Text style={styles.playerTitle} numberOfLines={1}>
                {playingVideo?.title}
              </Text>
              <TouchableOpacity onPress={() => setPlayingVideo(null)} style={styles.closePlayerBtn}>
                <Text style={styles.closePlayerBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {playingVideo && (
              <View style={styles.iframeWrapper}>
                <YoutubePlayer height={210} play={true} videoId={playingVideo.videoId} />
              </View>
            )}

            <ScrollView style={{ padding: 14 }}>
              <View style={styles.playingCategoryBadge}>
                <Text style={styles.playingCategoryText}>{playingVideo?.category} Lecture</Text>
              </View>
              <Text style={styles.playingFullTitle}>{playingVideo?.title}</Text>
              <Text style={styles.playingFullDesc}>{playingVideo?.description}</Text>

              <TouchableOpacity
                style={styles.openYtBtn}
                onPress={() => {
                  if (playingVideo) handleOpenYouTubeApp(playingVideo.videoId);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.openYtBtnText}>Watch full resolution in YouTube</Text>
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
    gap: 5,
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
  videosGrid: {
    gap: 12,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  thumbnailContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#0F172A',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 92, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  categoryTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(30, 26, 41, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  hdTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hdTagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textDark,
    lineHeight: 17,
    marginBottom: 4,
  },
  videoDesc: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 15,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 9,
    color: Colors.textLight,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  watchNowBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  watchNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  ytAppBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ytAppBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDark,
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
  playerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  playerContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  playerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textDark,
    flex: 1,
    paddingRight: 8,
  },
  closePlayerBtn: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  closePlayerBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  iframeWrapper: {
    backgroundColor: '#000000',
  },
  playingCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  playingCategoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.accent,
  },
  playingFullTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 6,
    lineHeight: 18,
  },
  playingFullDesc: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 16,
    marginBottom: 14,
  },
  openYtBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  openYtBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
  },
});

export default YouTubeVideosScreen;
