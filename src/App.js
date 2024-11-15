import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/inter';  // Import the font

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourAppComponents />
    </ThemeProvider>
  );
}

export default App;
