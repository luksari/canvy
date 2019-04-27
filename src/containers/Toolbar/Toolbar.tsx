import React from 'react';
import { connect } from 'react-redux';
import { selectColor, selectThickness } from './duck/actions'
import { ToolbarState } from './duck/reducer';
import { SketchPicker } from 'react-color'
import styled from 'styled-components';



const mapStateToProps = ( toolbarReducer : ToolbarState) => ({
    color: toolbarReducer.color,
    thickness: toolbarReducer.thickness
})

const mapDispatchToProps = {
    selectColor,
    selectThickness
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const ToolbarContainer = styled.div`
    width: 100%;
    display: flex;
`

const ToolbarRaw : React.FunctionComponent<Props> = () => (
    <ToolbarContainer>
       <SketchPicker />
    </ToolbarContainer>
)

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarRaw)
