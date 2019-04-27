import React, { Component } from 'react';
import styled  from 'styled-components'
import { CanvasComponent } from '../Canvas/Canvas'
import { Toolbar } from '../Toolbar/Toolbar';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const App = () => (
    <AppContainer>
      <Toolbar />
      <CanvasComponent />
    </AppContainer>
  )


export default App;
