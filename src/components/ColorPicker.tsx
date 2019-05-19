import { RootState } from 'MyTypes';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectColor } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';

const ColorDiv = styled.div`
  width: 100%;
  border-radius: 2px;
  height: 100%;
  background: ${props => props.color};
`;

const Popup = styled.div`
  position: absolute;
  z-index: 3;
  left: 15%;
  top: 10%;
`;

const Close = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const mapStateToProps = ({ toolbarReducer }: RootState) => ({
  color: toolbarReducer.color,
});

const mapDispatchToProps = {
  selectColor,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const ColorPickerRaw: React.FC<Props> = ({ color, selectColor }) => {
  const [isOpened, setisOpened] = useState(false);

  const handleClick = () => {
    setisOpened(isOpened => !isOpened);
  };
  const handleChange = (color: ColorResult) => {
    selectColor(color.hex);
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        <ColorDiv color={color} />
      </StyledButton>
      {isOpened ? (
        <Popup>
          <Close onClick={() => setisOpened(false)} />
          <SketchPicker color={color} onChange={handleChange} />
        </Popup>
      ) : null}
    </>
  );
};

export const ColorPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPickerRaw);
