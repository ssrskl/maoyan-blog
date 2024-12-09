/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        light: {
          primary: '#096B5A',
          surfaceTint: '#096B5A',
          onPrimary: '#FFFFFF',
          primaryContainer: '#A1F2DC',
          onPrimaryContainer: '#00201A',
          onSurface: "#171D1B",
          onSurfaceVariant: '#3F4945',
          surfaceContainerLowest: '#FFFFFF',
          surfaceContainerLow: '#EFF5F1',
          surfaceContainer: '#E9EFEC',
          surfaceContainerHigh: '#E3EAE6',
          surfaceContainerHighest: '#DEE4E0',
        },
      },
      fontSize: {
        displayLarge: [
          "57px",
          {
            fontWeight: "400",
            lineHeight: "64px",
            letterSpacing: "-0.25px",
          },
        ],
        displayMedium: [
          "45px",
          {
            fontWeight: "400",
            lineHeight: "52px",
            letterSpacing: "0",
          },
        ],
        displaySmall: [
          "36px",
          {
            fontWeight: "400",
            lineHeight: "44px",
            letterSpacing: "0",
          },
        ],
        headlineLarge: [
          "32px",
          {
            fontWeight: "400",
            lineHeight: "40px",
            letterSpacing: "0",
          },
        ],
        headlineMedium: [
          "28px",
          {
            fontWeight: "400",
            lineHeight: "36px",
            letterSpacing: "0",
          },
        ],
        headlineSmall: [
          "24px",
          {
            fontWeight: "400",
            lineHeight: "32px",
            letterSpacing: "0",
          },
        ],
        titleLarge: [
          "22px",
          {
            fontWeight: "400",
            lineHeight: "28px",
            letterSpacing: "0",
          },
        ],
        titleMedium: [
          "16px",
          {
            fontWeight: "500",
            lineHeight: "24px",
            letterSpacing: "0.15px",
          },
        ],
        titleSmall: [
          "14px",
          {
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.1px",
          },
        ],
        bodyLarge: [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
          },
        ],
        bodyMedium: [
          "14px",
          {
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "0.25px",
          },
        ],
        bodySmall: [
          "12px",
          {
            fontWeight: "400",
            lineHeight: "16px",
            letterSpacing: "0.4px",
          },
        ],
        labelLarge: [
          "14px",
          {
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.1px",
          },
        ],
        labelMedium: [
          "12px",
          {
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "0.5px",
          },
        ],
        labelSmall: [
          "11px",
          {
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "0.5px",
          },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};
