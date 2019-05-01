import React, { useState } from 'react'
import { SketchPicker, Color, ColorResult } from 'react-color'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { selectColor } from '../containers/Toolbar/duck/actions';

const Wrapper = styled.div`
    position: relative;
`

const Swatch = styled.div`
    width: 150px;
    padding: 10px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 2px;
    display: inline-block;
    box-shadow: 0px 4px 5px 0px rgba(173,173,173,0.59);
    cursor: pointer;
`

const ColorDiv = styled.div`
    width: 100%;
    border-radius: 2px;
    height: 100%;
    background: ${ props => props.color };
`

const Popup = styled.div`
    position: absolute;
    z-index: 2;
`

const Close = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const mapStateToProps = ( {toolbarReducer} : RootState ) => ({
    color: toolbarReducer.color
})

const mapDispatchToProps = {
    selectColor
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
const ColorPickerRaw : React.FC<Props> = ({color, selectColor}) => {
    const [isOpened, setisOpened] = useState(false)

    const handleClick = () => {
        setisOpened(isOpened => !isOpened)
    }
    const handleChange = (color: ColorResult) => {
        selectColor(color.hex)
    }

    return (
        <Wrapper>
            <Swatch onClick={handleClick}>
                <ColorDiv color={color}/>
            </Swatch>
            { isOpened ? 
                <Popup>
                    <Close onClick={( ) => setisOpened(false)} />
                    <SketchPicker color={color} onChange={handleChange}/>
                </Popup> : null
            }
        </Wrapper>
    )
    
}

export const ColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPickerRaw)

