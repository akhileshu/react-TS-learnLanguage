import { createTheme } from '@mui/material/styles';

// Define your custom theme
export const theme = createTheme({
  palette: {
    primary: {
      main: "#6499E9", // Main primary color
      contrastText: "#fff", // Text color on primary background
    },
    secondary: {
      main: "#9EDDFF", // Main secondary color
      contrastText: "#000", // Text color on secondary background
    },
    // You can add more custom colors here
    // For example, error: { main: "#FF0000" }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Define the default font family
    fontSize: 16, // Define the default font size
    // You can customize heading styles, button styles, etc. here
  },
  spacing: 8, // Define the spacing unit, used for margin and padding
  // You can customize other theme properties like shadows, breakpoints, etc.
});

// You can further extend and customize your theme as needed.
