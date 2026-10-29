import React from "react";
import Svg, { Path, Rect, Circle, Polyline, Line, Polygon } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BatchesIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 12v5c3 3 9 3 12 0v-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TestsIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="3" width="16" height="18" rx="3" stroke={color} strokeWidth="1.8" />
    <Path d="M8 8H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M8 12H13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M8 16L10 17.5L14 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5V15M4 10V4.5C4 3.67 4.67 3 5.5 3H20V17H5.5C4.67 17 4 17.67 4 18.5C4 19.33 4.67 20 5.5 20H20" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 7H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M8 11H14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const VideosIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="15" rx="3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 9L15 11.5L10 14V9Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 20H17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
  </Svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 20, color = "#25D366" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z"
      fill={color}
    />
  </Svg>
);

export const BotIcon: React.FC<IconProps> = ({ size = 20, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="10" rx="2" stroke={color} strokeWidth="1.8" />
    <Circle cx="12" cy="5" r="2" stroke={color} strokeWidth="1.8" />
    <Path d="M12 7V11" stroke={color} strokeWidth="1.8" />
    <Circle cx="8.5" cy="16" r="1.5" fill={color} />
    <Circle cx="15.5" cy="16" r="1.5" fill={color} />
  </Svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 20, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 16L20 18.5L22.5 19.5L20 20.5L19 23L18 20.5L15.5 19.5L18 18.5L19 16Z" fill={color} />
  </Svg>
);

export const FlameIcon: React.FC<IconProps> = ({ size = 20, color = "#FF7A00" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.25" />
  </Svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 20, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 3h12v6a6 6 0 1 1-12 0V3z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 15v5M8 20h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 18, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
    <Path d="M8 12L11 15L16 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 14, color = "#736B63" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
    <Path d="M12 6V12L16 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 18, color = "#736B63" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="1.8" />
    <Path d="M21 21L16.5 16.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 18, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 4L19 12L6 20V4Z" fill={color} />
  </Svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ size = 18, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11 18L5 12L11 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, color = "#736B63" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 18, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="7 10 12 15 17 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 18, color = "#736B63" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="1.8" />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1.8" />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="1.8" />
    <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="1.8" />
    <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="1.8" />
  </Svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ size = 20, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 16, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 16, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13 6L19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const UsersGroupIcon: React.FC<IconProps> = ({ size = 20, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.8" />
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GraduationCapIcon: React.FC<IconProps> = ({ size = 20, color = "#10B981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 12v5c3 3 9 3 12 0v-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BeakerIcon: React.FC<IconProps> = ({ size = 20, color = "#7C5CFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4.5 3H19.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M6 3V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V3" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <Path d="M6 14H18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="10" cy="17" r="1" fill={color} />
    <Circle cx="14" cy="17" r="1" fill={color} />
  </Svg>
);

export const AtomIcon: React.FC<IconProps> = ({ size = 20, color = "#0EA5E9" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="2.5" fill={color} />
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
    <Path d="M4.93 4.93C9.28.58 16.32 2.1 19.07 7.86c2.75 5.76.71 12.8-4.14 14.21" stroke={color} strokeWidth="1.5" />
    <Path d="M19.07 4.93C14.72.58 7.68 2.1 4.93 7.86c-2.75 5.76-.71 12.8 4.14 14.21" stroke={color} strokeWidth="1.5" />
  </Svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="2" width="16" height="20" rx="3" stroke={color} strokeWidth="1.8" />
    <Path d="M8 6H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M8 10H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="8" cy="15" r="1" fill={color} />
    <Circle cx="12" cy="15" r="1" fill={color} />
    <Circle cx="16" cy="15" r="1" fill={color} />
    <Circle cx="8" cy="19" r="1" fill={color} />
    <Circle cx="12" cy="19" r="1" fill={color} />
    <Circle cx="16" cy="19" r="1" fill={color} />
  </Svg>
);

export const FlashIcon: React.FC<IconProps> = ({ size = 20, color = "#F59E0B" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
  </Svg>
);

export const DesktopIcon: React.FC<IconProps> = ({ size = 20, color = "#1E1A16" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
    <Path d="M8 21H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M12 17V21" stroke={color} strokeWidth="1.8" />
  </Svg>
);

