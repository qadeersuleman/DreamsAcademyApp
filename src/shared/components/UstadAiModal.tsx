import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { BotIcon, SparklesIcon } from '../widgets/Icons';
import Svg, { Path, Line } from 'react-native-svg';
import Colors from '../../theme/Colors';
import { askUstadAI, AIMessage } from '../../services/ustadAiService';

const { width, height } = Dimensions.get('window');

const SendIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} />
  </Svg>
);

const CloseIcon = ({ size = 20, color = '#7A6A5C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

const TrashIcon = ({ size = 18, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PRESET_CHIPS = [
  { label: '🌿 Photosynthesis سنڌي ۾', prompt: 'Photosynthesis process ke aasan Sindhi aur Urdu mein daily-life example ke saath samjhao.' },
  { label: '⚡ Newton’s 3rd Law', prompt: 'Newton third law of motion ke practical examples (STBB Physics) explain karein.' },
  { label: '📚 STS Pedagogy Tips', prompt: 'STS IBA Sukkur aur JST test ke liye Pedagogy & Teaching Methodology ki tayyari kaise karein?' },
  { label: '🧪 Acid vs Base', prompt: 'Sindh Board Chemistry: Acid aur Base mein main farq kya hai?' },
];

interface UstadAiModalProps {
  visible: boolean;
  onClose: () => void;
}

export const UstadAiModal: React.FC<UstadAiModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Salam! I am Ustad AI (استاد اي آءِ), your 24/7 science tutor and STS/JST exam mentor at Dreams Virtual Academy.\n\nپنهنجو ڪو به سائنس يا ٽيسٽ بابت سوال سنڌي، اردو يا انگلش ۾ پڇو!',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [visible, messages]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askUstadAI(textToSend);
      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Maaf kijiye, abhi server se rabta nahi ho pa raha. Baraye meherbani internet connection check karein ya thori der baad koshish karein.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Salam! I am Ustad AI (استاد اي آءِ), your 24/7 science tutor and STS/JST exam mentor at Dreams Virtual Academy.\n\nپنهنجو ڪو به سائنس يا ٽيسٽ بابت سوال سنڌي، اردو يا انگلش ۾ پڇو!',
        time: 'Just now',
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.botIconWrapper}>
              <BotIcon size={22} color={Colors.accent} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.headerTitle}>Ustad AI</Text>
                <Text style={styles.headerSindhiTitle}> (استاد اي آءِ)</Text>
              </View>
              <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.headerSubtitle}>24/7 Science & STS Mentor</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleClearChat} style={styles.iconBtn}>
              <TrashIcon size={18} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
              <CloseIcon size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preset Chips */}
        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {PRESET_CHIPS.map((chip, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.chip}
                activeOpacity={0.7}
                onPress={() => handleSendMessage(chip.prompt)}
              >
                <Text style={styles.chipText}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages List */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  isAI ? styles.aiBubble : styles.userBubble,
                ]}
              >
                {isAI && (
                  <View style={styles.aiTagRow}>
                    <SparklesIcon size={14} color={Colors.accent} />
                    <Text style={styles.aiTagText}>Ustad AI Tutor</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.messageText,
                    isAI ? styles.aiText : styles.userText,
                  ]}
                  selectable
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    isAI ? styles.aiTimestamp : styles.userTimestamp,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            );
          })}

          {isLoading && (
            <View style={[styles.messageBubble, styles.aiBubble, styles.loadingBubble]}>
              <ActivityIndicator size="small" color={Colors.accent} />
              <Text style={styles.loadingText}>Ustad AI is generating explanation...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything in Sindhi, Urdu, or English..."
            placeholderTextColor={Colors.textLight}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={600}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.8}
          >
            <SendIcon size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'ios' ? 48 : 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(124, 92, 255, 0.25)',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textDark,
  },
  headerSindhiTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  chipsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  chipsScroll: {
    paddingHorizontal: 12,
    gap: 6,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.accentLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 92, 255, 0.2)',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accent,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messagesContent: {
    paddingVertical: 12,
    gap: 10,
  },
  messageBubble: {
    maxWidth: width * 0.85,
    borderRadius: 16,
    padding: 12,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.accent,
  },
  aiTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 19,
  },
  aiText: {
    color: Colors.textDark,
  },
  userText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  aiTimestamp: {
    color: Colors.textMuted,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 90,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 13,
    color: Colors.textDark,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginRight: 8,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
});
