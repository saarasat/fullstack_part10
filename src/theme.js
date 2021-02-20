import { Platform } from "react-native";

const theme = {
  colors: {
    backgroundPrimary: "#eff0f1", // light grey
    backgroundSecondary: "#ffffff", // white
    primary: "#020218", // dark blue
    secondary: "#0066ff", // light blue
    tertiary: "grey", // grey
    textPrimary: "#020218", // dark blue
    textSecondary: "#0066ff", // light blue
    textTertiary: "grey", // grey
    error: "#b51d02"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;