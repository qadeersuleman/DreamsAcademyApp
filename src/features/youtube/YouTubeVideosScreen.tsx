import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ─── Icons ──────────────────────────────────────────────────────────────────

const BackIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlayIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
    <Polygon points="10,8 17,12 10,16" fill={color} />
  </Svg>
);

const ClockIcon = ({ size = 12, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const EyeIcon = ({ size = 12, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="1.8" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
  </Svg>
);

const YtIcon = ({ size = 18, color = '#FF0000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill={color} />
    <Polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#FFFFFF" />
  </Svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

interface YTVideo {
  id: string;
  videoId: string;
  title: string;
  duration: string;
  views: string;
  timeAgo: string;
  subject: string;
  subjectColor: string;
}

const YT_VIDEOS: YTVideo[] = [
  {
    id: '1',
    videoId: 'laI0zQ23ok4',
    title: 'What happens in a Prophase Phase of Mitosis | Explained in Simple',
    duration: '3:13',
    views: '3',
    timeAgo: '3 hours ago',
    subject: 'Biology',
    subjectColor: '#10B981',
  },
  {
    id: '2',
    videoId: 'EDsRcT65DOw',
    title: 'Cell Division - Defined In Simple | Science Class 8th | StBB',
    duration: '4:42',
    views: '33',
    timeAgo: '2 days ago',
    subject: 'Science',
    subjectColor: '#6366F1',
  },
  {
    id: '3',
    videoId: 'BfIFxPqyqdY',
    title: 'The Structure and Role of Kidney | Science 8th | STBB | Dilshad Murtaza',
    duration: '4:44',
    views: '82',
    timeAgo: '2 weeks ago',
    subject: 'Biology',
    subjectColor: '#10B981',
  },
  {
    id: '4',
    videoId: 'soazgsSAJME',
    title: 'The Human Excretory System | Explained in Simple | Science 8th | STBB',
    duration: '10:05',
    views: '103',
    timeAgo: '2 weeks ago',
    subject: 'Science',
    subjectColor: '#F59E0B',
  },
  {
    id: '5',
    videoId: '2YOeCD4WaBA',
    title: 'Some Important Science MCQs - Solved with Explanation | For General Test Preparation',
    duration: '4:58',
    views: '114',
    timeAgo: '2 weeks ago',
    subject: 'MCQs',
    subjectColor: '#EF4444',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

export const YouTubeVideosScreen: React.FC<Props> = ({ onBack }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleVideoPress = (videoId: string) => {
    if (playingId === videoId) {
      setPlaying(prev => !prev);
    } else {
      setPlayingId(videoId);
      setPlaying(true);
    }
  };

  const openChannel = () => {
    Linking.openURL('https://youtube.com/@dreamsscienceacademy');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
          <BackIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.ytBadge}>
            <YtIcon size={14} color="#FF0000" />
            <Text style={styles.ytBadgeText}>YouTube</Text>
          </View>
          <Text style={styles.headerTitle}>Dreams Science Academy</Text>
          <Text style={styles.headerSub}>Latest Videos</Text>
        </View>
        <TouchableOpacity style={styles.channelBtn} onPress={openChannel} activeOpacity={0.75}>
          <YtIcon size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Now Playing */}
        {playingId && (
          <View style={styles.playerSection}>
            <View style={styles.playerWrapper}>
              <YoutubePlayer
                height={Math.round((width - 32) * 9 / 16)}
                width={width - 32}
                play={playing}
                videoId={playingId}
                onChangeState={onStateChange}
              />
            </View>
            <View style={styles.playerInfo}>
              {YT_VIDEOS.filter(v => v.videoId === playingId).map(v => (
                <View key={v.id}>
                  <View style={[styles.subjectTag, { backgroundColor: v.subjectColor + '22', borderColor: v.subjectColor + '55' }]}>
                    <Text style={[styles.subjectTagText, { color: v.subjectColor }]}>{v.subject}</Text>
                  </View>
                  <Text style={styles.nowPlayingTitle} numberOfLines={2}>{v.title}</Text>
                  <View style={styles.metaRow}>
                    <ClockIcon size={11} color="#94A3B8" />
                    <Text style={styles.metaText}>{v.duration}</Text>
                    <EyeIcon size={11} color="#94A3B8" />
                    <Text style={styles.metaText}>{v.views} views</Text>
                    <Text style={styles.metaText}>• {v.timeAgo}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Video List */}
        <Text style={styles.listHeading}>
          {playingId ? 'All Videos' : '🎬 Latest Videos'}
        </Text>

        {YT_VIDEOS.map((video, index) => {
          const isActive = playingId === video.videoId;
          return (
            <TouchableOpacity
              key={video.id}
              activeOpacity={0.85}
              onPress={() => handleVideoPress(video.videoId)}
              style={[styles.card, isActive && styles.cardActive]}
            >
              {/* Thumbnail */}
              <View style={styles.thumbContainer}>
                <Image
                  source={{ uri: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg` }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                {/* Play overlay */}
                <View style={[styles.playOverlay, isActive && styles.playOverlayActive]}>
                  <View style={styles.playCircle}>
                    <PlayIcon size={16} color="#FFFFFF" />
                  </View>
                </View>
                {/* Duration badge */}
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
              </View>

              {/* Info */}
              <View style={styles.cardInfo}>
                <View style={[styles.subjectTag, { backgroundColor: video.subjectColor + '22', borderColor: video.subjectColor + '44', marginBottom: 5 }]}>
                  <Text style={[styles.subjectTagText, { color: video.subjectColor }]}>{video.subject}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>{video.title}</Text>
                <View style={styles.cardMeta}>
                  <EyeIcon size={10} color="#64748B" />
                  <Text style={styles.cardMetaText}>{video.views} views</Text>
                  <Text style={styles.cardMetaDot}>•</Text>
                  <Text style={styles.cardMetaText}>{video.timeAgo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Channel link */}
        <TouchableOpacity style={styles.channelCard} onPress={openChannel} activeOpacity={0.85}>
          <YtIcon size={28} color="#FF0000" />
          <View style={styles.channelCardText}>
            <Text style={styles.channelCardTitle}>Dreams Science Academy</Text>
            <Text style={styles.channelCardSub}>Tap to visit our YouTube channel →</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  ytBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF000018',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#FF000030',
  },
  ytBadgeText: {
    fontSize: 9,
    color: '#FF0000',
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.2,
  },
  headerSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
  },
  channelBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FF000015',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF000025',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  // Player
  playerSection: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  playerWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  playerInfo: {
    padding: 14,
  },
  nowPlayingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F1F5F9',
    lineHeight: 19,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginLeft: 3,
  },
  // List
  listHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 14,
    letterSpacing: 0.1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardActive: {
    borderColor: '#7C5CFF',
    borderWidth: 1.5,
  },
  thumbContainer: {
    width: 120,
    height: 80,
    position: 'relative',
  },
  thumbnail: {
    width: 120,
    height: 80,
  },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playOverlayActive: {
    backgroundColor: 'rgba(124,92,255,0.4)',
  },
  playCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  durationText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  subjectTag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    marginBottom: 4,
  },
  subjectTagText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E2E8F0',
    lineHeight: 16,
    marginBottom: 6,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cardMetaText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 2,
  },
  cardMetaDot: {
    fontSize: 9,
    color: '#475569',
    marginHorizontal: 1,
  },
  // Channel card
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FF000025',
    gap: 12,
  },
  channelCardText: {
    flex: 1,
  },
  channelCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F1F5F9',
  },
  channelCardSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
});

export default YouTubeVideosScreen;
