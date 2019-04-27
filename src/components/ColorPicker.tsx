import React, { useState } from 'react'
import { SketchPicker, Color, ColorResult } from 'react-color'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { selectColor } from '../containers/Toolbar/duck/actions';


const Swatch = styled.div`
    width: 30%;
    padding: 10px;
    height: 30px;
    background: #F4F4F4;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 4px 5px 0px rgba(173,173,173,0.59);
    cursor: pointer;
`

const ColorDiv = styled.div`
    width: 80%;
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

    return <>
        <Swatch onClick={handleClick}>
            <ColorDiv color={color}/>
        </Swatch>
        { isOpened ? 
            <Popup>
                <Close onClick={( ) => setisOpened(false)} />
                <SketchPicker color={color} onChange={handleChange}/>
            </Popup> : null
        }
    </>;
}

export const ColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPickerRaw)


export default ColorPicker
