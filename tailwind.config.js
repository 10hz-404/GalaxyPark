const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // 确保包含src目录下的所有文件
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1280px", // 添加1280px的自定义断点
      },
      fontFamily: {
        // 添加自定义字体
        "bon-voyage": ["var(--font-made-bon-voyage)", "sans-serif"],
        "bon-voyage-thin": ["var(--font-made-bon-voyage-thin)", "sans-serif"],
        smiley: ["var(--font-smiley-sans)", "sans-serif"],
        ibm: ["var(--font-ibm-plex-sans-condensed)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
