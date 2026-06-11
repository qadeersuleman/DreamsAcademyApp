import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import Svg, { Rect, Line, Text as SvgText, G } from "react-native-svg";
import { AppCard, StatCard } from "../../shared/widgets/Widgets";
import { ClockIcon, CheckIcon, ProgressIcon } from "../../shared/widgets/Icons";
import Colors from "../../theme/Colors";
import { FadeInUp } from "../../shared/components/AnimatedComponents";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface ChartBarProps {
  percentage: number;
  color: string;
  xOffset: number;
  label: string;
  delay: number;
}

const ChartBar: React.FC<ChartBarProps> = ({ percentage, color, xOffset, label, delay }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: percentage,
      duration: 1000,
      delay,
      useNativeDriver: false, // SVG layouts do not support native driver
    }).start();
  }, [percentage, delay]);

  const barHeight = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0.1, 90], // max height is 90
  });

  const yOffset = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [110, 20], // 110 baseline - 90 max = 20
  });

  return (
    <G>
      {/* Background track bar */}
      <Rect
        x={xOffset}
        y="20"
        width="16"
        height="90"
        fill={Colors.textLight + "08"}
        rx="4"
      />
      {/* Animated active bar */}
      <AnimatedRect
        x={xOffset}
        y={yOffset}
        width="16"
        height={barHeight}
        fill={color}
        rx="4"
      />
      {/* Label under bar */}
      <SvgText
        x={xOffset + 8}
        y="126"
        fill={Colors.textDark}
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
      >
        {label}
      </SvgText>
    </G>
  );
};

export const ProgressScreen: React.FC = () => {
  const chartData = [
    { label: "Maths", percentage: 45, color: "#7C5CFF" },
    { label: "Phys", percentage: 70, color: "#3DBE7A" },
    { label: "Chem", percentage: 20, color: "#FFB020" },
    { label: "Comp", percentage: 85, color: "#FF6B6B" },
  ];

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-8 pb-3">
        <FadeInUp delay={50}>
          <Text className="text-sm font-black text-textDark tracking-tight uppercase">Analytics & Progress</Text>
          <Text className="text-[10px] text-textLight mt-0.5 mb-5 font-semibold">
            Monitor subject stats, test evaluation records and unlock badges.
          </Text>
        </FadeInUp>

        {/* Custom SVG Bar Chart */}
        <FadeInUp delay={150}>
          <AppCard className="mb-6 p-5 items-center bg-white border border-primary/20 shadow-md shadow-primary/5 rounded-3xl">
            <Text className="text-[10px] font-extrabold text-textDark mb-4.5 self-start uppercase tracking-wider pl-1">
              Subject Mastery Analytics
            </Text>
            
            <View className="w-full items-center">
              <Svg width="260" height="140" viewBox="0 0 260 140">
                {/* Horizontal Grid Lines */}
                <Line x1="40" y1="20" x2="240" y2="20" stroke={Colors.textLight + "10"} strokeWidth="1" strokeDasharray="3,3" />
                <Line x1="40" y1="65" x2="240" y2="65" stroke={Colors.textLight + "10"} strokeWidth="1" strokeDasharray="3,3" />
                <Line x1="40" y1="110" x2="240" y2="110" stroke={Colors.textDark + "20"} strokeWidth="1.5" />

                {/* Y Axis Labels */}
                <SvgText x="30" y="23" fill={Colors.textLight} fontSize="7" fontWeight="bold" textAnchor="end">100%</SvgText>
                <SvgText x="30" y="68" fill={Colors.textLight} fontSize="7" fontWeight="bold" textAnchor="end">50%</SvgText>
                <SvgText x="30" y="113" fill={Colors.textLight} fontSize="7" fontWeight="bold" textAnchor="end">0%</SvgText>

                {/* Animated Bars */}
                {chartData.map((data, index) => {
                  const xOffset = 58 + index * 48;
                  return (
                    <ChartBar
                      key={index}
                      percentage={data.percentage}
                      color={data.color}
                      xOffset={xOffset}
                      label={data.label}
                      delay={200 + index * 100}
                    />
                  );
                })}
              </Svg>
            </View>
          </AppCard>
        </FadeInUp>

        {/* Statistics panel */}
        <FadeInUp delay={250}>
          <View className="flex-row mb-6">
            <StatCard
              label="Study Volume"
              value="5.6 hrs"
              subtitle="Spent reading chapters"
              icon={<ClockIcon color={Colors.accent} size={14} />}
            />
            <StatCard
              label="Quiz Accuracy"
              value="88%"
              subtitle="Average accuracy rate"
              icon={<ProgressIcon color={Colors.success} size={14} />}
            />
          </View>
        </FadeInUp>

        {/* Achievements list */}
        <FadeInUp delay={350}>
          <Text className="text-xs font-extrabold text-textDark mb-4 px-1 uppercase tracking-tight">Unlocked Badges</Text>
        </FadeInUp>
        
        <View className="mb-4">
          <FadeInUp delay={420}>
            <View className="bg-white border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5">
              <View className="w-11 h-11 rounded-2xl bg-success/15 items-center justify-center mr-4 border border-success/20">
                <CheckIcon size={18} color={Colors.success} />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-extrabold text-textDark mb-0.5 uppercase tracking-wide">Quick Starter</Text>
                <Text className="text-[9px] text-textLight font-semibold">Completed the first lesson in record time.</Text>
              </View>
            </View>
          </FadeInUp>

          <FadeInUp delay={520}>
            <View className="bg-white border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5">
              <View className="w-11 h-11 rounded-2xl bg-accent/15 items-center justify-center mr-4 border border-accent/20">
                <ProgressIcon size={18} color={Colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-extrabold text-textDark mb-0.5 uppercase tracking-wide">Perfect Evaluator</Text>
                <Text className="text-[9px] text-textLight font-semibold">Scored 100% on a diagnostic test module.</Text>
              </View>
            </View>
          </FadeInUp>

          <FadeInUp delay={620}>
            <View className="bg-white border border-primary/20 rounded-3xl p-4.5 mb-4 flex-row items-center shadow-sm shadow-primary/5 opacity-50">
              <View className="w-11 h-11 rounded-2xl bg-textLight/10 items-center justify-center mr-4">
                <ClockIcon size={18} color={Colors.textLight} />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-extrabold text-textDark mb-0.5 uppercase tracking-wide">Grandmaster (Locked)</Text>
                <Text className="text-[9px] text-textLight font-semibold">Complete all available subjects and assessments.</Text>
              </View>
            </View>
          </FadeInUp>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;
