export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#6366F1",
        },
        background: {
          dark: "#0A0F1E",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f0f1a",
        },
        card: {
          light: "#f8fafc",
          dark: "#111827",
        },
        accent: {
          DEFAULT: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
