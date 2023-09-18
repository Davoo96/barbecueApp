import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#FFD836',
        secondary: 'rgba(255, 216, 54, 0.0)',
        tertiary: '#FAFAFA',
        quaternary: '#F1F1F1',
        quintenary: '#E5C231',
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        xs: '0px 0px 16px 0px rgba(0, 0, 0, 0.06)',
      },
      width: {
        'full-p-12': 'calc(100% - 3rem)',
      },
    },
  },
  plugins: [],
};
export default config;
