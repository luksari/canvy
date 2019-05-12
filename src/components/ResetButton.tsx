import React from 'react';
import { RootState } from 'MyTypes';
import { connect } from 'react-redux';
import { resetCanvas } from '../containers/Toolbar/duck/actions';
import styled from 'styled-components';

const mapDispatchToProps = {
  resetCanvas,
};

type Props = typeof mapDispatchToProps;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.button`
  border: none;
  width: 80px;
  max-width: 150px;
  padding: 10px;
  height: 45px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 4px 5px 0 rgba(173, 173, 173, 0.59);
  cursor: pointer;
`;
const ResetButtonRaw: React.FunctionComponent<Props> = ({ resetCanvas }) => {
  return (
    <Wrapper>
      <StyledButton
        onClick={() => {
          resetCanvas(true);
        }}
        onTouchStart={() => {
          resetCanvas(true);
        }}
      >
        Reset
      </StyledButton>
    </Wrapper>
  );
};

export const ResetButton = connect(
  null,
  mapDispatchToProps
)(ResetButtonRaw);
