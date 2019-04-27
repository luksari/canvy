import React from 'react';
import { connect } from 'react-redux';
import { selectColor, selectThickness } from './duck/actions'
import { ToolbarState } from './duck/reducer';



const mapStateToProps = ( toolbarReducer : ToolbarState) => ({
    color: toolbarReducer.color,
    thickness: toolbarReducer.thickness
})

const mapDispatchToProps = {
    selectColor,
    selectThickness
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const ToolbarRaw : React.FunctionComponent<Props> = () => (
    <>
        <p>TOOLBAR</p>
    </>
)

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarRaw)
