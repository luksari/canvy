import { RootState } from 'MyTypes';
import react, { SyntheticEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectThickness } from '../containers/Toolbar/duck/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const StyledInput = styled.input`
  -webkit-appearance: none;
  background-color: #bdc3c7;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  outline: 0;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #e74c3c;
    width: ${props => ((props.value as number) < 2 ? (props.value as number) * 25 : 40)}px;
    height: ${props => ((props.value as number) < 2 ? (props.value as number) * 25 : 40)}px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: white;
      border: 2px solid #e74c3c;
    }
    &:active {
      transform: scale(1.6);
    }
  }
`;

const mapDispatchToProps = {
  selectThickness,
};

const mapStateToProps = ({ toolbarReducer }: RootState) => ({
  thickness: toolbarReducer.thickness,
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ThicknessPickerRaw: React.FC<Props> = ({ thickness, selectThickness }: Props) => {
  const [getThickness, setThickness] = useState(thickness);

  const handleChange = (event: SyntheticEvent) => {
    const value = parseInt((event.target as HTMLInputElement).value, 2);
    // Needed it because of React Controlled Inputs
    setThickness(value);
    selectThickness(value);
  };

  return (
    <Wrapper>
      <StyledInput
        type="range"
        min="1"
        max="25"
        step="1"
        value={getThickness}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export const ThicknessPicker = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThicknessPickerRaw);
