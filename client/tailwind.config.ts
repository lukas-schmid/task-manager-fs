import type { Config } from "tailwindcss";

const mix = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(100% * <alpha-value>), transparent)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: mix("--background"),
        foreground: mix("--foreground"),
        muted: mix("--muted"),
        "muted-foreground": mix("--muted-foreground"),
        popover: mix("--popover"),
        "popover-foreground": mix("--popover-foreground"),
        card: mix("--card"),
        "card-foreground": mix("--card-foreground"),
        border: mix("--border"),
        input: mix("--input"),
        primary: mix("--primary"),
        "primary-foreground": mix("--primary-foreground"),
        secondary: mix("--secondary"),
        "secondary-foreground": mix("--secondary-foreground"),
        accent: mix("--accent"),
        "accent-foreground": mix("--accent-foreground"),
        destructive: mix("--destructive"),
        "destructive-foreground": mix("--destructive-foreground"),
        ring: mix("--ring"),
      },
      background: {
        gradient: "var(--gradient)",
      },
    },
  },
  plugins: [],
};

export default config;
