import React from 'react'
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { selectThickness } from '../containers/Toolbar/duck/actions'

const mapDispatchToProps = {
    selectThickness
}

const mapStateToProps = ( { toolbarReducer } : RootState) => ({
    thickness: toolbarReducer.thickness
})

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const ThicknessPickerRaw : React.FC<Props> = () => {
  return (
    <div>
      
    </div>
  )
}

export const ThicknessPicker = connect(mapStateToProps, mapDispatchToProps)(ThicknessPickerRaw)
