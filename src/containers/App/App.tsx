import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../assets/GlobalStyle';
import { CanvasComponent } from '../Canvas/Canvas';
import { Toolbar } from '../Toolbar/Toolbar';
import { theme } from '../../assets/theme';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  touch-action: none;
`;

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <Toolbar />
        <CanvasComponent />
        <Toolbar alternative />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
