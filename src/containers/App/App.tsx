import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../assets/GlobalStyle';
import { CanvasComponent } from '../Canvas/Canvas';
import { Toolbar } from '../Toolbar/Toolbar';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  touch-action: none;
`;

const App: React.FC<{}> = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Toolbar />
      <CanvasComponent />
      <Toolbar alternative />
    </AppContainer>
  );
};

export default App;
