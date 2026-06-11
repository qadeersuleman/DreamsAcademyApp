import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { CalculatorIcon, FlashIcon, BeakerIcon, DesktopIcon, ArrowRightIcon } from "./Icons";
import Colors from "../../theme/Colors";
import { BouncyPressable, AnimatedProgressBar } from "../components/AnimatedComponents";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "accent" | "outline";
  className?: string;
  disabled?: boolean;
}

export const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  let btnStyle = "bg-primary border border-primaryDark/35 shadow-md shadow-primary/20";
  let textStyle = "text-textDark font-bold";

  if (variant === "accent") {
    btnStyle = "bg-accent border border-accentLight/25 shadow-lg shadow-accent/20";
    textStyle = "text-white font-bold";
  } else if (variant === "outline") {
    btnStyle = "bg-white/40 border border-textLight/15";
    textStyle = "text-textDark font-semibold";
  }

  return (
    <BouncyPressable
      onPress={onPress}
      disabled={disabled}
      style={{ width: "100%" }}
    >
      <View
        className={`py-3 px-5 rounded-2xl flex-row items-center justify-center ${btnStyle} ${className} ${disabled ? "opacity-45" : ""}`}
      >
        <Text className={`text-xs text-center tracking-wide ${textStyle}`}>{title}</Text>
      </View>
    </BouncyPressable>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const AppCard: React.FC<CardProps> = ({ children, className = "", style }) => {
  return (
    <View
      style={style}
      className={`bg-white/85 border border-primary/15 rounded-2xl p-4 shadow-sm shadow-textDark/5 ${className}`}
    >
      {children}
    </View>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
}) => {
  return (
    <AppCard className="flex-1 m-1.5 py-4 px-3.5 border-primary/10">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-[9px] uppercase font-extrabold tracking-widest text-textLight">{label}</Text>
        <View className="p-1 rounded-lg bg-white shadow-sm shadow-textDark/5">
          {icon}
        </View>
      </View>
      <Text className="text-xl font-extrabold text-textDark tracking-tight">{value}</Text>
      {subtitle && <Text className="text-[8px] text-textLight mt-1 font-medium leading-3">{subtitle}</Text>}
    </AppCard>
  );
};

interface SubjectCardProps {
  title: string;
  description: string;
  iconName: string;
  color: string;
  progress: number;
  onPress: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  iconName,
  color,
  progress,
  onPress,
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case "calculator":
        return <CalculatorIcon size={20} color={color} />;
      case "flash":
        return <FlashIcon size={20} color={color} />;
      case "beaker":
        return <BeakerIcon size={20} color={color} />;
      case "desktop":
        return <DesktopIcon size={20} color={color} />;
      default:
        return null;
    }
  };

  return (
    <BouncyPressable onPress={onPress}>
      <View className="bg-white/90 border border-primary/20 rounded-3xl p-4 mb-4 flex-row items-center shadow-sm shadow-primary/10">
        {/* Icon container with double ring effect */}
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mr-4 border border-white"
          style={{ backgroundColor: `${color}15`, shadowColor: color, shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          {renderIcon()}
        </View>
        
        <View className="flex-1 mr-2.5">
          <Text className="text-xs font-extrabold text-textDark mb-0.5 tracking-tight">{title}</Text>
          <Text className="text-[10px] text-textLight leading-4" numberOfLines={2}>{description}</Text>
          
          <View className="flex-row items-center mt-3">
            <View className="flex-1 mr-2.5">
              <AnimatedProgressBar progress={progress} color={color} height={4.5} />
            </View>
            <Text className="text-[9px] font-extrabold" style={{ color }}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>

        {/* Bouncy arrow wrapper */}
        <View className="w-7 h-7 rounded-full bg-primary/20 items-center justify-center border border-primary/30">
          <ArrowRightIcon size={12} color={Colors.textDark} />
        </View>
      </View>
    </BouncyPressable>
  );
};
