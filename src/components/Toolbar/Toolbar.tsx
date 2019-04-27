import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { selectThickness } from './duck/actions';

type stateFromProps = {
    color: string,
    thickness: number
}
type dispatchFromProps = {
    selectColor: (color: string) => void,
    selectThickness: (thickness: number) => void
}

type Props = stateFromProps & dispatchFromProps

const mapStateToProps = ({ toolbarReducer } : RootState) => ({
    color: toolbarReducer.color,
    thickness: toolbarReducer.thickness
})
const mapDispatchToProps = {

}

const ToolbarRaw : React.FunctionComponent<Props> = () => (
    <>
        <p>TOOLBAR</p>
    </>
)

export const Toolbar = connect<stateFromProps, dispachFromProps, void>(mapStateToProps, mapDispatchToProps)(ToolbarRaw)
