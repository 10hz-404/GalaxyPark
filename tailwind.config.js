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
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
