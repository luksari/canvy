import { RootState } from 'MyTypes';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectColor } from '../containers/Toolbar/duck/actions';

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  height: 100%;
  align-items: center;
  position: relative;
`;

const Swatch = styled.div`
  width: 80px;
  max-width: 150px;
  padding: 10px;
  height: 45px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 4px 5px 0 rgba(173, 173, 173, 0.59);
  cursor: pointer;
`;

const ColorDiv = styled.div`
  width: 100%;
  border-radius: 2px;
  height: 100%;
  background: ${props => props.color};
`;

const Popup = styled.div`
  position: absolute;
  z-index: 3;
  left: 35%;
  top: 50%;
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
    <Wrapper>
      <Swatch onClick={handleClick}>
        <ColorDiv color={color} />
      </Swatch>
      {isOpened ? (
        <Popup>
          <Close onClick={() => setisOpened(false)} />
          <SketchPicker color={color} onChange={handleChange} />
        </Popup>
      ) : null}
    </Wrapper>
  );
};

export const ColorPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPickerRaw);
