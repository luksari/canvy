import React, { Component } from 'react';
import styled  from 'styled-components'
import { CanvasComponent } from '../Canvas/Canvas'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const App = () => (
    <AppContainer>
      
      <CanvasComponent />
    </AppContainer>
  )


export default App;
