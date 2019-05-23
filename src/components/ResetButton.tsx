import React from 'react';
import { connect } from 'react-redux';
import { resetCanvas } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';
import Paper from '../assets/icons/Paper.svg';
import styled from 'styled-components';

const mapDispatchToProps = {
  resetCanvas,
};

type Props = typeof mapDispatchToProps;

const StyledResetButton = styled(StyledButton)`
  background: url(${Paper}) center center no-repeat;
`;

const ResetButtonRaw: React.FunctionComponent<Props> = ({ resetCanvas }) => {
  return (
    <StyledResetButton
      onClick={() => {
        resetCanvas(true);
      }}
    />
  );
};

export const ResetButton = connect(
  null,
  mapDispatchToProps
)(ResetButtonRaw);
