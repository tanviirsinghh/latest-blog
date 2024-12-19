

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html',
     './src/**/*.{js,ts,jsx,tsx}',
     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        animation: {
          shimmer: "shimmer 2s linear infinite",
        },
        keyframes: {
          shimmer: {
            from: {
              backgroundPosition: "0 0",
            },
            to: {
              backgroundPosition: "-200% 0",
            },
          },
        },
      },
    },
    plugins: [addVariablesForColors],

  }


  function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );
   
    addBase({
      ":root": newVars,
    });
  }