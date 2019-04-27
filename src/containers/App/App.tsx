import React from 'react';
import styled  from 'styled-components'
import { CanvasComponent } from '../Canvas/Canvas'
import { Toolbar } from '../Toolbar/Toolbar';
import { GlobalStyle } from '../../assets/GlobalStyle';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const App : React.FC<{}> = () => (
    <AppContainer>
      <GlobalStyle/>
      <Toolbar />
      <CanvasComponent />
    </AppContainer>
  )


export default App;
