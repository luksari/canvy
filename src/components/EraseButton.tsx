import React from 'react';
import { connect } from 'react-redux';
import { selectErase } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';

const mapDispatchToProps = {
  selectErase,
};
type Props = typeof mapDispatchToProps;

const EraseButtonRaw: React.FunctionComponent<Props> = ({ selectErase }) => {
  return <StyledButton onClick={() => selectErase()}>ERASE</StyledButton>;
};

export const EraseButton = connect(
  null,
  mapDispatchToProps
)(EraseButtonRaw);
