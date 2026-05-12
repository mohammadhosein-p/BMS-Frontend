import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                vazirmatn: ["Vazirmatn", "Roboto"],
            },

            colors: {
                hover: "hsl(var(--hover))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                // primary: {
                //     DEFAULT: "hsl(var(--primary))",
                //     foreground: "hsl(var(--primary-foreground))",
                //     hover: "hsl(var(--hover))",
                // },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },

                neutral: {
                    1: "hsl(var(--neutral-1))",
                    2: "hsl(var(--neutral-2))",
                    3: "hsl(var(--neutral-3))",
                    4: "hsl(var(--neutral-4))",
                    5: "hsl(var(--neutral-5))",
                },
                primary: {
                    1: "hsl(var(--primary-1))",
                    2: "hsl(var(--primary-2))",
                    3: "hsl(var(--primary-3))",
                    4: "hsl(var(--primary-4))",
                    5: "hsl(var(--primary-5))",
                },
                "secondary-blue": {
                    1: "hsl(var(--secondary-blue-1))",
                    2: "hsl(var(--secondary-blue-2))",
                    3: "hsl(var(--secondary-blue-3))",
                    4: "hsl(var(--secondary-blue-4))",
                    5: "hsl(var(--secondary-blue-5))",
                },
                "secondary-green": {
                    1: "hsl(var(--secondary-green-1))",
                    2: "hsl(var(--secondary-green-2))",
                    3: "hsl(var(--secondary-green-3))",
                    4: "hsl(var(--secondary-green-4))",
                    5: "hsl(var(--secondary-green-5))",
                },
                "success-op1": {
                    1: "hsl(var(--success-op1-1))",
                    2: "hsl(var(--success-op1-2))",
                    3: "hsl(var(--success-op1-3))",
                    4: "hsl(var(--success-op1-4))",
                    5: "hsl(var(--success-op1-5))",
                },
                "success-op2": {
                    1: "hsl(var(--success-op2-1))",
                    2: "hsl(var(--success-op2-2))",
                    3: "hsl(var(--success-op2-3))",
                    4: "hsl(var(--success-op2-4))",
                    5: "hsl(var(--success-op2-5))",
                },
                danger: {
                    1: "hsl(var(--danger-1))",
                    2: "hsl(var(--danger-2))",
                    3: "hsl(var(--danger-3))",
                    4: "hsl(var(--danger-4))",
                    5: "hsl(var(--danger-5))",
                },
            },
            borderRadius: {
                sm: "calc(var(--radius) - 4px)",
                md: "calc(var(--radius) - 2px)",
                lg: "var(--radius)",
                xl: "calc(var(--radius) + 4px)",
            },
        },
    },
    plugins: [tailwindcssAnimate],
};

export default config;
