import { useTheme } from '@mui/material/styles';

export const LogoSvg = ({ width }) => {
  const theme = useTheme();
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 34}
      viewBox="0 0 300 300"
    >
      <path
        d="M135 4.25c-16.55 9.95-12.65 35.3 6.2 39.8 13.65 3.3 26.85-7.2 26.8-21.25-.1-17.4-18.1-27.5-33-18.55zM68 30.7c-14.5 2.6-30.4 18.15-34.45 33.85-11.95 45.75 45.05 78.1 78.45 44.6 33-33.1 2.9-86.75-44-78.45zm135 0c-14.6 2.6-30.35 18.05-34.45 33.85-12 46 45 78.1 78.6 44.3C279.9 75.9 249.7 22.45 203 30.7zm-66.7 84.1c-18.65 6.65-27.05 25.95-19 43.55 11.3 24.7 47 24.45 58.15-.4 11.2-25.05-13.5-52.3-39.15-43.15zM12.15 125.1c-17.8 9.05-14.75 35.65 4.7 40.85C35.5 171 51.2 149 40.55 132.9c-6.05-9.1-18.85-12.65-28.4-7.8zm256.1 0c-13.4 6.65-16.35 25.05-5.65 35.1 14.25 13.35 36.15 5 37.25-14.2.95-17.05-16.3-28.45-31.6-20.9zM71 167.1c-37.25 6.45-51.95 52.4-25.4 79.2 22.75 22.9 61.6 16.4 75.45-12.65C137.3 199.7 107.95 160.7 71 167.1zm135 0c-37.45 6.45-52.05 52.65-25.15 79.5 22.65 22.7 61 16.05 75.15-13 16.4-33.7-13.05-72.9-50-66.5zm-65 86.8c-12.15 3.9-18.9 15.1-15.95 26.35 6.6 25.15 42.85 20.75 42.9-5.25.05-13.6-14.6-25.1-26.95-21.1z"
        fill={theme.palette.primary.main}
      />
    </svg>
  );
};
