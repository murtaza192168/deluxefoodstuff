import { createTheme } from "@mui/material/styles";

// Brand palette, drawn from the Delux Enterprise logo (gold + maroon) and the
// existing deep green. Gold is an accent only — never for body text on light.
export const brand = {
  ink: "#1C2621", // deep green, primary surfaces and headings
  inkSoft: "#2A342E",
  gold: "#B8913F", // accent: rules, active states, small highlights
  goldLight: "#D9BE7C", // gold on dark backgrounds
  maroon: "#6B2A2E", // used sparingly
  ivory: "#FAF8F3", // page background
  paper: "#FFFFFF",
  line: "#E7E1D4", // hairline borders
  text: "#1F2421",
  muted: "#5E655F",
};

export const fonts = {
  serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};

const theme = createTheme({
  palette: {
    primary: { main: brand.ink, contrastText: "#FFFFFF" },
    secondary: { main: brand.gold, contrastText: "#FFFFFF" },
    background: { default: brand.ivory, paper: brand.paper },
    text: { primary: brand.text, secondary: brand.muted },
    divider: brand.line,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: fonts.sans,
    h1: { fontFamily: fonts.serif, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 },
    h2: { fontFamily: fonts.serif, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.15 },
    h3: { fontFamily: fonts.serif, fontWeight: 600, lineHeight: 1.2 },
    h4: { fontFamily: fonts.serif, fontWeight: 600, lineHeight: 1.25 },
    h5: { fontFamily: fonts.serif, fontWeight: 600 },
    h6: { fontFamily: fonts.sans, fontWeight: 600, fontSize: "1rem" },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    overline: { fontWeight: 600, letterSpacing: "0.16em", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  components: {
    // Cormorant defaults to old-style figures (137 reads as "I37"); use lining figures site-wide.
    MuiCssBaseline: { styleOverrides: { body: { fontVariantNumeric: "lining-nums" } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 2, paddingInline: 20 } },
    },
    MuiLink: { defaultProps: { underline: "none" } },
  },
});

export default theme;
