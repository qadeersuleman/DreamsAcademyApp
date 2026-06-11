module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F4C47F",
        primaryDark: "#D9A461",
        textDark: "#4A3B2F",
        textLight: "#7A6A5C",
        background: "#FFF7ED",
        cardBackground: "#FFE8C7",
        accent: "#7C5CFF",
        accentLight: "#A892FF",
        success: "#3DBE7A",
        warning: "#FFB020",
        error: "#FF6B6B",
      },
    },
  },
  plugins: [],
}
