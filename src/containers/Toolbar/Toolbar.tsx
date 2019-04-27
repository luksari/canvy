import React from 'react';
import { connect } from 'react-redux';
import { selectColor, selectThickness } from './duck/actions'
import { ToolbarState } from './duck/reducer';
import styled from 'styled-components';
import ColorPicker from '../../components/ColorPicker';

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
    margin: 10px 0 10px 0;
`

const ToolbarRaw : React.FunctionComponent<Props> = () => (
    <ToolbarContainer>
       <ColorPicker/>
    </ToolbarContainer>
)

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarRaw)
