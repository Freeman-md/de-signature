import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: "#bd4f32",
        wine: "#82252a",
        ink: "#110d0b",
        ivory: "#f7f0e4",
        sand: "#d9c5ac",
      },
      boxShadow: {
        ember: "0 18px 65px rgba(210, 78, 39, 0.27)",
      },
    },
  },
  plugins: [],
};

export default config;
