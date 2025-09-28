import { defineConfig } from "@tailwindcss/vite";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        10: "10px",
      },
      colors: {
        brand: "#FF4000",
      },
    },
  },
});
