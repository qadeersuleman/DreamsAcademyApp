import React, { useState } from "react";
import { View, Text, ScrollView, Image, Switch } from "react-native";
import { AppCard, AppButton } from "../../shared/widgets/Widgets";
import { MOCK_USER } from "../../data/mockData";
import Colors from "../../theme/Colors";
import { FadeInUp } from "../../shared/components/AnimatedComponents";

interface ProfileProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-8 pb-3">
        <FadeInUp delay={50}>
          <Text className="text-sm font-black text-textDark tracking-tight uppercase">Student Profile</Text>
          <Text className="text-[10px] text-textLight mt-0.5 mb-5 font-semibold">
            Manage your personal settings, app notifications, and offline data cache.
          </Text>
        </FadeInUp>

        {/* User Card */}
        <FadeInUp delay={150}>
          <AppCard className="mb-6 p-5 flex-row items-center bg-white border border-primary/25 shadow-md shadow-primary/5">
            <View className="w-14 h-14 rounded-full border-2 border-primary overflow-hidden mr-4 shadow-sm shadow-primary/20 bg-white">
              <Image source={{ uri: MOCK_USER.avatar }} className="w-full h-full" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-black text-textDark tracking-tight">{MOCK_USER.name}</Text>
              <Text className="text-[9px] text-textLight font-semibold mt-0.5">{MOCK_USER.email}</Text>
              <View className="bg-accent/10 self-start px-2 py-0.5 rounded-md border border-accent/15 mt-2">
                <Text className="text-[8px] font-extrabold text-accent uppercase tracking-wider">
                  Joined since {MOCK_USER.enrolledDate}
                </Text>
              </View>
            </View>
          </AppCard>
        </FadeInUp>

        {/* Preferences / Toggles */}
        <FadeInUp delay={250}>
          <Text className="text-xs font-extrabold text-textDark mb-4 px-1 uppercase tracking-tight">Preferences</Text>
          <AppCard className="mb-6 py-4 px-4 bg-white border border-primary/20 shadow-sm shadow-primary/5">
            <View className="flex-row justify-between items-center pb-3.5 border-b border-primary/10">
              <View className="flex-1 mr-4">
                <Text className="text-[10px] font-extrabold text-textDark uppercase tracking-wide">Dark Display Theme</Text>
                <Text className="text-[8px] text-textLight font-semibold mt-0.5">Toggle dark user interface styles</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#7A6A5C20", true: Colors.accent }}
                thumbColor={darkMode ? Colors.primary : "#f4f3f4"}
              />
            </View>

            <View className="flex-row justify-between items-center py-3.5 border-b border-primary/10">
              <View className="flex-1 mr-4">
                <Text className="text-[10px] font-extrabold text-textDark uppercase tracking-wide">Push Notifications</Text>
                <Text className="text-[8px] text-textLight font-semibold mt-0.5">Receive reminders for lessons and study tasks</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#7A6A5C20", true: Colors.accent }}
                thumbColor={notifications ? Colors.primary : "#f4f3f4"}
              />
            </View>

            <View className="flex-row justify-between items-center pt-3.5">
              <View className="flex-1 mr-4">
                <Text className="text-[10px] font-extrabold text-textDark uppercase tracking-wide">Offline Study Cache</Text>
                <Text className="text-[8px] text-textLight font-semibold mt-0.5">Access downloaded lesson texts offline</Text>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: "#7A6A5C20", true: Colors.accent }}
                thumbColor={offlineMode ? Colors.primary : "#f4f3f4"}
              />
            </View>
          </AppCard>
        </FadeInUp>

        {/* App Version Info */}
        <FadeInUp delay={350}>
          <AppCard className="mb-8 p-4 items-center bg-white border border-primary/10 shadow-sm shadow-primary/5">
            <Text className="text-[10px] font-extrabold text-textDark uppercase tracking-wider">Dreams Virtual Academy</Text>
            <Text className="text-[8px] text-textLight font-semibold mt-0.5">Version 1.0.0 (Production Build)</Text>
            <Text className="text-[8px] text-accent font-extrabold mt-1.5 uppercase tracking-wide">www.dreamsvirtualacademy.com</Text>
          </AppCard>
        </FadeInUp>

        {/* Log Out Button */}
        <FadeInUp delay={450}>
          <AppButton title="Sign Out Profile Account" onPress={onLogout} variant="outline" className="py-3.5 border-error/20" />
        </FadeInUp>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
