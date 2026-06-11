import React from "react";
import Svg, { Path, Rect, Circle, G } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 21V12H15V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SubjectsIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ProgressIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M8 6H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 10H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="15" r="1" fill={color} />
    <Circle cx="12" cy="15" r="1" fill={color} />
    <Circle cx="16" cy="15" r="1" fill={color} />
    <Circle cx="8" cy="19" r="1" fill={color} />
    <Circle cx="12" cy="19" r="1" fill={color} />
    <Circle cx="16" cy="19" r="1" fill={color} />
  </Svg>
);

export const FlashIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
  </Svg>
);

export const BeakerIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4.5 3H19.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 3V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V3" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M6 14H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8.5 8.5L12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DesktopIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M8 21H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 17V21" stroke={color} strokeWidth="2" />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 16, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 5L19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 18, color = "#7A6A5C" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 6L12 13L2 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 18, color = "#7A6A5C" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = "#3DBE7A" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 14, color = "#7A6A5C" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TestsIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 11L11 13L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 17H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5V15M4 10V4.5C4 3.67 4.67 3 5.5 3H20V17H5.5C4.67 17 4 17.67 4 18.5C4 19.33 4.67 20 5.5 20H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 7H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 11H14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const VideosIcon: React.FC<IconProps> = ({ size = 20, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="15" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 9L15 11.5L10 14V9Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 20H18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 18, color = "#7A6A5C" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 18, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 3L19 12L5 21V3Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ size = 18, color = "#4A3B2F" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

