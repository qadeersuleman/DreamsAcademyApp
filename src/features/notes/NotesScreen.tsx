import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Share,
} from 'react-native';
import Svg, { Path, Circle, Polyline, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ─── Custom Icons ────────────────────────────────────────────────────────────

const BackIcon = ({ size = 20, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = ({ size = 16, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ size = 12, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const BookIcon = ({ size = 18, color = '#7C5CFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5V15M4 10V4.5C4 3.67 4.67 3 5.5 3H20V17H5.5C4.67 17 4 17.67 4 18.5C4 19.33 4.67 20 5.5 20H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 7H16M8 11H14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BookmarkIcon = ({ size = 18, color = '#94A3B8', fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={fill} />
  </Svg>
);

const BookmarkFilledIcon = ({ size = 18, color = '#F59E0B' }) => (
  <BookmarkIcon size={size} color={color} fill={color} />
);

const ShareIcon = ({ size = 18, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" />
    <Path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke={color} strokeWidth="2" />
  </Svg>
);

const CheckCircleIcon = ({ size = 20, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Polyline points="22 4 12 14.01 9 11.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = ({ size = 14, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface NoteSection {
  title: string;
  content: string;
}

interface StudyNote {
  id: string;
  title: string;
  excerpt: string;
  subject: string;
  subjectColor: string;
  readTime: string;
  difficulty: string;
  sections: NoteSection[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STUDY_NOTES: StudyNote[] = [
  {
    id: '1',
    title: 'Mitosis stages: Prophase, Metaphase, Anaphase & Telophase',
    excerpt: 'A complete step-by-step revision guide on mitosis stages, chromosomal alignments, and spindle fiber attachments.',
    subject: 'Biology',
    subjectColor: '#10B981',
    readTime: '5 mins',
    difficulty: 'Class 8th - 10th',
    sections: [
      {
        title: '📌 Introduction to Cell Division',
        content: 'Cell division is the process by which a parent cell divides into two or more daughter cells. In eukaryotic organisms, cell division occurs in two major phases: mitosis (division of the nucleus) and cytokinesis (division of the cytoplasm).',
      },
      {
        title: '🔬 Continuous Phases of Mitosis (PMAT)',
        content: 'Mitosis is divided into four distinct, continuous stages:\n\n• Prophase: Chromatin condenses into visible, tightly-packed chromosomes. The nuclear membrane breaks down, and spindle fibers begin to form from the centrioles.\n• Metaphase: Chromosomes align along the metaphase plate (the center of the cell). Spindle fibers attach to the centromeres of each chromosome.\n• Anaphase: Sister chromatids are pulled apart by spindle fibers and move toward opposite poles of the cell.\n• Telophase: Chromosomes reach opposite poles, begin to uncoil back into chromatin, and nuclear envelopes reform around each set of chromosomes.',
      },
      {
        title: '💡 Key Biological Significance',
        content: 'Mitosis is essential for growth, tissue repair, and asexual reproduction. It ensures that both daughter cells receive an exact copy of the parent cell\'s genetic material, maintaining genetic stability across cell generations.',
      },
    ],
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion & Friction Dynamics',
    excerpt: 'Understand inertia, mass vs weight, F = ma derivations, and resolving friction coefficient problems.',
    subject: 'Physics',
    subjectColor: '#EF4444',
    readTime: '6 mins',
    difficulty: 'Class 9th',
    sections: [
      {
        title: '📌 Introduction',
        content: 'Motion is a change in the position of an object over time. Isaac Newton formulated three fundamental laws of motion that describe the relationship between a body and the forces acting upon it.',
      },
      {
        title: '⚡ Newton\'s First Law (Law of Inertia)',
        content: 'An object at rest remains at rest, and an object in motion continues in motion with a constant velocity along a straight line, unless acted upon by a net external force. Inertia is the natural resistance of any object to a change in its state of motion.',
      },
      {
        title: '⚙️ Newton\'s Second Law (F = ma)',
        content: 'The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass. The mathematical formula is:\n\nForce (F) = Mass (m) × Acceleration (a)\n\nForce is measured in Newtons (N), mass in kilograms (kg), and acceleration in meters per second squared (m/s²).',
      },
      {
        title: '🔄 Newton\'s Third Law',
        content: 'For every action, there is an equal and opposite reaction. When object A exerts a force on object B, object B simultaneously exerts a force of equal magnitude and opposite direction on object A.',
      },
      {
        title: '⛓️ Understanding Friction',
        content: 'Friction is a resistive force that opposes the relative motion of sliding or rolling surfaces. The force of friction is proportional to the normal force pressing the surfaces together and depends on the materials in contact.',
      },
    ],
  },
  {
    id: '3',
    title: 'Chemical Bonding: Covalent vs Ionic Bonds',
    excerpt: 'Master valence electron structures, octet rule exemptions, Lewis dot structures, and electronegativity differences.',
    subject: 'Chemistry',
    subjectColor: '#F59E0B',
    readTime: '4 mins',
    difficulty: 'Class 8th - 9th',
    sections: [
      {
        title: '📌 Introduction & The Octet Rule',
        content: 'Atoms bond together to achieve a stable electronic configuration, typically having a full outer shell of 8 valence electrons (known as the Octet Rule). This configuration mimics the stable noble gases.',
      },
      {
        title: '💎 Ionic Bonding',
        content: 'Ionic bonding occurs when electrons are completely transferred from a metal atom to a non-metal atom. This transfer creates oppositely charged ions (cations and anions) that attract each other through strong electrostatic forces. Example: Sodium Chloride (NaCl).',
      },
      {
        title: '🤝 Covalent Bonding',
        content: 'Covalent bonding occurs when two non-metal atoms share one or more pairs of valence electrons to achieve stability. Example: Water (H₂O) and Carbon Dioxide (CO₂).',
      },
      {
        title: '📊 Key Properties Comparison',
        content: '• Ionic compounds typically have high melting points, form crystalline lattices, and conduct electricity when dissolved or molten.\n• Covalent compounds have lower melting/boiling points, exist as discrete molecules, and generally do not conduct electricity in any state.',
      },
    ],
  },
  {
    id: '4',
    title: 'Structure of Nephron & The Excretory System',
    excerpt: 'Detailed summary of glomerular filtration, tubular reabsorption, and how human kidneys regulate water balance.',
    subject: 'Biology',
    subjectColor: '#10B981',
    readTime: '5 mins',
    difficulty: 'Class 8th',
    sections: [
      {
        title: '📌 Excretion & Nephrons',
        content: 'Excretion is the removal of toxic metabolic waste products from the body. The kidneys are the primary excretory organs in humans, containing millions of microscopic filtering units called Nephrons.',
      },
      {
        title: '🧬 Anatomy of a Nephron',
        content: 'Each nephron consists of two main parts:\n\n• Renal Corpuscle: Includes Bowman\'s Capsule (a cup-like sac) enclosing the Glomerulus (a capillary network where blood filtration occurs under pressure).\n• Renal Tubule: Comprises the Proximal Convoluted Tubule (PCT), Loop of Henle (reabsorbs water and salts), and Distal Convoluted Tubule (DCT). All empty into the Collecting Duct.',
      },
      {
        title: '💧 Urine Formation Stages',
        content: '1. Glomerular Filtration: High blood pressure forces water and small solutes out of capillaries into Bowman\'s capsule.\n2. Selective Reabsorption: Useful substances (glucose, amino acids, water, ions) are reabsorbed back into the blood.\n3. Tubular Secretion: Waste products and hydrogen ions are actively secreted into the tubule to form urine.',
      },
    ],
  },
  {
    id: '5',
    title: 'Internet Protocols, IP Addressing & DNS Routing',
    excerpt: 'How data travels across the Internet, DNS hierarchy, TCP/IP stack layers, and client-server handshakes.',
    subject: 'Computer',
    subjectColor: '#8B5CF6',
    readTime: '5 mins',
    difficulty: 'Introductory',
    sections: [
      {
        title: '📌 Introduction',
        content: 'The Internet is a global network of interconnected computers. For these computers to communicate reliably, they must follow standardized sets of rules called Protocols.',
      },
      {
        title: '🌐 IP Addresses (IPv4 vs IPv6)',
        content: 'An IP (Internet Protocol) address is a unique identifier assigned to every device connected to a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), while IPv6 uses 128-bit hexadecimal addresses to accommodate billions of new devices.',
      },
      {
        title: '☎️ Domain Name System (DNS)',
        content: 'DNS acts as the directory of the Internet. It translates human-readable domain names (like www.dreamsacademy.com) into machine-readable IP addresses (like 104.244.42.1) so browsers can load internet resources.',
      },
      {
        title: '📦 Packet Switching & Routing',
        content: 'Data is broken down into small units called packets. Each packet contains a source address, destination address, and payload. Routers direct these packets across the most efficient path to their destination, where they are reassembled into the original file.',
      },
    ],
  },
  {
    id: '6',
    title: 'Limits, Continuity, and Composite Mapping Functions',
    excerpt: 'Revision notes on working out f(g(x)), finding limits algebraically, and defining function continuity.',
    subject: 'Maths',
    subjectColor: '#059669',
    readTime: '6 mins',
    difficulty: 'Class 9th - 10th',
    sections: [
      {
        title: '📌 Functions & Mappings',
        content: 'A function is a relation that assigns each element in an input set (domain) to exactly one element in an output set (range).',
      },
      {
        title: '➕ Composite Functions',
        content: 'A composite function is a function that is composed of two other functions. The output of one function becomes the input of the second. Represented as f(g(x)) or (f ∘ g)(x).\n\nTo evaluate f(g(x)), you first substitute x into g(x) to find g(x), then substitute that result into f(x).',
      },
      {
        title: '✏️ Step-by-Step Example',
        content: 'Let f(x) = 2x + 3 and g(x) = x².\n\nFind f(g(x)):\n1. g(x) = x²\n2. Substitute g(x) into f: f(g(x)) = f(x²) = 2(x²) + 3 = 2x² + 3.\n\nFind g(f(x)):\n1. f(x) = 2x + 3\n2. Substitute f(x) into g: g(f(x)) = g(2x + 3) = (2x + 3)² = 4x² + 12x + 9.',
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

export const NotesScreen: React.FC<Props> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<string | 'all'>('all');
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedNotes, setCompletedNotes] = useState<string[]>([]);

  // Unique subjects for filter chips
  const subjects = useMemo(() => {
    const subs = new Set(STUDY_NOTES.map(note => note.subject));
    return ['all', ...Array.from(subs)];
  }, []);

  // Filter study notes based on search & subject chip
  const filteredNotes = useMemo(() => {
    return STUDY_NOTES.filter(note => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = activeSubject === 'all' || note.subject === activeSubject;

      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, activeSubject]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: string) => {
    setCompletedNotes(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const shareNote = async (note: StudyNote) => {
    try {
      await Share.share({
        title: note.title,
        message: `📚 study note on "${note.title}" (${note.subject}) from Dreams Virtual Academy! Join me in learning! 🎓`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 1. Study Note Reader (Detail View)
  if (selectedNote) {
    const isBookmarked = bookmarks.includes(selectedNote.id);
    const isCompleted = completedNotes.includes(selectedNote.id);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

        {/* Reader Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedNote(null)}
            activeOpacity={0.75}
          >
            <BackIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={[styles.subjectTag, { backgroundColor: selectedNote.subjectColor + '18', borderColor: selectedNote.subjectColor + '35' }]}>
              <Text style={[styles.subjectTagText, { color: selectedNote.subjectColor }]}>{selectedNote.subject}</Text>
            </View>
            <Text style={styles.headerTitle} numberOfLines={1}>Study Notebook</Text>
          </View>
          <View style={styles.readerActions}>
            <TouchableOpacity
              style={[styles.actionBtn, { marginRight: 8 }]}
              onPress={() => toggleBookmark(selectedNote.id)}
              activeOpacity={0.75}
            >
              {isBookmarked ? (
                <BookmarkFilledIcon size={18} />
              ) : (
                <BookmarkIcon size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => shareNote(selectedNote)}
              activeOpacity={0.75}
            >
              <ShareIcon size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reader Scrollable Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.readerContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Note Info Cover */}
          <View style={styles.coverCard}>
            <View style={styles.metaRow}>
              <ClockIcon size={11} color="#94A3B8" />
              <Text style={styles.metaText}>{selectedNote.readTime} read</Text>
              <View style={styles.difficultyBadge}>
                <StarIcon size={10} color="#F59E0B" />
                <Text style={styles.difficultyText}>{selectedNote.difficulty}</Text>
              </View>
            </View>
            <Text style={styles.noteTitle}>{selectedNote.title}</Text>
            <Text style={styles.noteExcerpt}>{selectedNote.excerpt}</Text>
          </View>

          {/* Sections */}
          {selectedNote.sections.map((section, idx) => (
            <View key={idx} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionBody}>{section.content}</Text>
            </View>
          ))}

          {/* Mark as Completed Button */}
          <TouchableOpacity
            style={[styles.completedBtn, isCompleted && styles.completedBtnActive]}
            onPress={() => toggleComplete(selectedNote.id)}
            activeOpacity={0.8}
          >
            <CheckCircleIcon size={20} color={isCompleted ? '#0F172A' : '#10B981'} />
            <Text style={[styles.completedBtnText, isCompleted && styles.completedBtnTextActive]}>
              {isCompleted ? 'Marked as Completed ✓' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
    );
  }

  // 2. Notebook List View
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
          <BackIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.notebookBadge}>
            <BookIcon size={12} color="#7C5CFF" />
            <Text style={styles.notebookBadgeText}>REVISION</Text>
          </View>
          <Text style={styles.headerTitle}>Study Notebook</Text>
          <Text style={styles.headerSub}>Topic Summaries & Key Points</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchBar}>
          <SearchIcon size={16} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search revision notes, subjects..."
            placeholderTextColor="#64748B"
            style={styles.searchInput}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsContainer}
          contentContainerStyle={styles.chipsContent}
        >
          {subjects.map((sub) => {
            const isActive = activeSubject === sub;
            return (
              <TouchableOpacity
                key={sub}
                activeOpacity={0.8}
                onPress={() => setActiveSubject(sub)}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {sub === 'all' ? '📚 All Subjects' : sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Notes list heading */}
        <Text style={styles.listHeading}>📂 Subject Summary Guides</Text>

        {/* Notes Cards */}
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            const isBookmarked = bookmarks.includes(note.id);
            const isCompleted = completedNotes.includes(note.id);

            return (
              <TouchableOpacity
                key={note.id}
                activeOpacity={0.85}
                onPress={() => setSelectedNote(note)}
                style={[styles.card, isCompleted && styles.cardCompleted]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.subjectTag, { backgroundColor: note.subjectColor + '18', borderColor: note.subjectColor + '35' }]}>
                    <Text style={[styles.subjectTagText, { color: note.subjectColor }]}>{note.subject}</Text>
                  </View>
                  <View style={styles.cardMetaRow}>
                    <ClockIcon size={10} color="#64748B" />
                    <Text style={styles.cardMetaText}>{note.readTime}</Text>
                    {isBookmarked && (
                      <View style={{ marginLeft: 6 }}>
                        <BookmarkFilledIcon size={12} />
                      </View>
                    )}
                    {isCompleted && (
                      <View style={{ marginLeft: 6 }}>
                        <CheckCircleIcon size={12} color="#10B981" />
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>{note.title}</Text>
                <Text style={styles.cardExcerpt} numberOfLines={2}>{note.excerpt}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.difficultyLabel}>Level: {note.difficulty}</Text>
                  <View style={styles.readMoreContainer}>
                    <Text style={styles.readMoreText}>Read Notes</Text>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                      <Path d="M5 12H19M12 5l7 7-7 7" stroke="#7C5CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No revision notes match your search.</Text>
          </View>
        )}

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
  notebookBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C5CFF18',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#7C5CFF30',
  },
  notebookBadgeText: {
    fontSize: 9,
    color: '#7C5CFF',
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
  headerPlaceholder: {
    width: 38,
    height: 38,
  },
  readerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#F1F5F9',
    fontSize: 12,
    marginLeft: 8,
    padding: 0,
    fontWeight: '500',
  },
  // Filter chips
  chipsContainer: {
    marginBottom: 20,
  },
  chipsContent: {
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#7C5CFF',
    borderColor: '#7C5CFF',
  },
  chipText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  // List Heading
  listHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  // Card
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 12,
  },
  cardCompleted: {
    borderColor: '#10B98155',
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMetaText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 3,
  },
  subjectTag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
  },
  subjectTagText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F1F5F9',
    lineHeight: 18,
    marginBottom: 6,
  },
  cardExcerpt: {
    fontSize: 10,
    color: '#94A3B8',
    lineHeight: 15,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#33415550',
    paddingTop: 10,
  },
  difficultyLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 10,
    color: '#7C5CFF',
    fontWeight: '700',
    marginRight: 4,
  },
  // Reader View Content
  readerContent: {
    padding: 16,
  },
  coverCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 20,
    marginBottom: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F1F5F9',
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 8,
  },
  noteExcerpt: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginLeft: 3,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B15',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    marginLeft: 10,
  },
  difficultyText: {
    fontSize: 8,
    color: '#F59E0B',
    fontWeight: '700',
    marginLeft: 2,
  },
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7C5CFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 17.5,
    textAlign: 'justify',
  },
  completedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#10B981',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 30,
  },
  completedBtnActive: {
    backgroundColor: '#10B981',
  },
  completedBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    marginLeft: 8,
  },
  completedBtnTextActive: {
    color: '#0F172A',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});

export default NotesScreen;
