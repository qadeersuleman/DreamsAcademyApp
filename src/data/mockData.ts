// mockData.ts
export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'note' | 'quiz';
  content: string;
  duration?: string;
  completed: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: 'play' | 'note' | 'quiz';
  color: string;
  lessons: Lesson[];
  thumbnail?: string;
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "1",
    title: "Web Development Mastery",
    description: "Learn HTML, CSS, JavaScript & React",
    icon: "play",
    color: "#3B82F6",
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Web Development",
        type: "video",
        content: "Complete guide to web development basics",
        duration: "45 mins",
        completed: true,
        videoUrl: "https://youtube.com/..."
      },
      {
        id: "1-2",
        title: "HTML & CSS Fundamentals",
        type: "note",
        content: "Comprehensive notes on HTML5 and CSS3",
        completed: false,
        pdfUrl: "https://..."
      },
      {
        id: "1-3",
        title: "JavaScript Quiz",
        type: "quiz",
        content: "Test your JavaScript knowledge",
        completed: false
      }
    ]
  },
  {
    id: "2",
    title: "Digital Marketing",
    description: "SEO, Social Media & Content Marketing",
    icon: "play",
    color: "#10B981",
    lessons: [
      {
        id: "2-1",
        title: "SEO Fundamentals",
        type: "video",
        content: "Complete SEO guide for beginners",
        duration: "60 mins",
        completed: true,
        videoUrl: "https://youtube.com/..."
      },
      {
        id: "2-2",
        title: "Social Media Strategy",
        type: "note",
        content: "Instagram, Facebook, LinkedIn strategies",
        completed: false,
        pdfUrl: "https://..."
      }
    ]
  },
  {
    id: "3",
    title: "Data Science Basics",
    description: "Python, Pandas & Data Visualization",
    icon: "quiz",
    color: "#F59E0B",
    lessons: [
      {
        id: "3-1",
        title: "Python for Data Science",
        type: "video",
        content: "Python programming basics",
        duration: "90 mins",
        completed: false,
        videoUrl: "https://youtube.com/..."
      },
      {
        id: "3-2",
        title: "Data Analysis Quiz",
        type: "quiz",
        content: "Test your data analysis skills",
        completed: false
      }
    ]
  }
];

export const MOCK_USER = {
  id: "1",
  name: "Ahmed Raza",
  email: "ahmed@example.com",
  avatar: "https://ui-avatars.com/api/?background=7C5CFF&color=fff&name=Ahmed+Raza",
  enrolledCourses: ["1", "2", "3"],
  completedLessons: 2,
  totalPoints: 450,
};