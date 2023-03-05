import { Container, createTheme, CssBaseline } from '@mui/material';

import { ThemeProvider } from '@emotion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import MainList from './components/MainList';

const themeDark = createTheme({
  palette: {
    background: {
      //   default: '#222222',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Header />
      <Hero />
      <Container>
        <MainList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
