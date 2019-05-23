import React from 'react';
import { connect } from 'react-redux';
import { selectErase } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';
import Rubber from '../assets/icons/Rubber.svg';
import styled from 'styled-components';

const mapDispatchToProps = {
  selectErase,
};
type Props = typeof mapDispatchToProps;

const StyledEraseButton = styled(StyledButton)`
  background: url(${Rubber}) center center no-repeat;
`;

const EraseButtonRaw: React.FunctionComponent<Props> = ({ selectErase }) => {
  return <StyledEraseButton onClick={() => selectErase()} />;
};

export const EraseButton = connect(
  null,
  mapDispatchToProps
)(EraseButtonRaw);
