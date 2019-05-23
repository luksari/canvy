import React from 'react';
import { connect } from 'react-redux';
import { selectPencil } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';
import Pencil from '../assets/icons/Pencil.svg';
import styled from 'styled-components';

const mapDispatchToProps = {
  selectPencil,
};
type Props = typeof mapDispatchToProps;

const StyledPencilButton = styled(StyledButton)`
  background: url(${Pencil}) center center no-repeat;
`;

const PencilButtonRaw: React.FunctionComponent<Props> = ({ selectPencil }) => {
  return <StyledPencilButton onClick={() => selectPencil()} />;
};

export const PencilButton = connect(
  null,
  mapDispatchToProps
)(PencilButtonRaw);
