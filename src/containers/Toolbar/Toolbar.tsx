import React from 'react';
import { connect } from 'react-redux';
import { selectColor, selectThickness } from './duck/actions'
import { ToolbarState } from './duck/reducer';
import styled from 'styled-components';
import {ColorPicker} from '../../components/ColorPicker';
import { ThicknessPicker } from '../../components/ThicknessPicker';

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
    height: 20%;
    display: flex;
    justify-content: space-between;
`

const ToolbarRaw : React.FunctionComponent<Props> = () => (
    <ToolbarContainer>
       <ColorPicker/>
       <ThicknessPicker/>
    </ToolbarContainer>
)

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarRaw)
