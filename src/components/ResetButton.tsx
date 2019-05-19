import React from 'react';
import { connect } from 'react-redux';
import { resetCanvas } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';

const mapDispatchToProps = {
  resetCanvas,
};

type Props = typeof mapDispatchToProps;

const ResetButtonRaw: React.FunctionComponent<Props> = ({ resetCanvas }) => {
  return (
    <StyledButton
      onClick={() => {
        resetCanvas(true);
      }}
    >
      Reset
    </StyledButton>
  );
};

export const ResetButton = connect(
  null,
  mapDispatchToProps
)(ResetButtonRaw);
