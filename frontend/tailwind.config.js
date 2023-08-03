/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
      rem: ["REM", "sans-serif"],
      meri: ["Merriweather", "serif"],
      lum: ["Lumanosimo", "cursive"],
      gara: ["EB Garamond", "serif"],
      raj: ["Rajdhani", "sans-serif"],
      noto: ["Noto Serif", "serif"],
      ysb: ["Ysabeau SC", "sans-serif"],
      spec: ["Spectral", "serif"],
      paci: ["Pacifico", "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
