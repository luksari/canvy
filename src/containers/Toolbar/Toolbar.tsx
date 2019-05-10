import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColorPicker } from '../../components/ColorPicker'
import { ThicknessPicker } from '../../components/ThicknessPicker'
import { selectColor, selectThickness } from './duck/actions'
import { ToolbarState } from './duck/reducer'

const mapStateToProps = (toolbarReducer: ToolbarState) => ({
  color: toolbarReducer.color,
  thickness: toolbarReducer.thickness,
})

const mapDispatchToProps = {
  selectColor,
  selectThickness,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const ToolbarContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  background: #f5f5f5;
  z-index: 2;
  box-shadow: 0 0 5px black;
`

const ToolbarRaw: React.FunctionComponent<Props> = () => (
  <ToolbarContainer>
    <ColorPicker />
    <ThicknessPicker />
  </ToolbarContainer>
)

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarRaw)
