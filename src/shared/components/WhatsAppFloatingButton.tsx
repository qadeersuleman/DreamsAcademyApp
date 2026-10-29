import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, View, Text, Platform } from 'react-native';
import { WhatsAppIcon } from '../widgets/Icons';

interface WhatsAppFloatingButtonProps {
  customMessage?: string;
  bottomOffset?: number;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  customMessage = "Salam Dreams Virtual Academy! I need information regarding online batches & tests.",
  bottomOffset = 85,
}) => {
  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/923018183624?text=${encodeURIComponent(customMessage)}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleOpenWhatsApp}
      style={[styles.floatingBtn, { bottom: bottomOffset }]}
    >
      <View style={styles.iconContainer}>
        <WhatsAppIcon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.btnText}>WhatsApp</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
  },
  iconContainer: {
    marginRight: 6,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

