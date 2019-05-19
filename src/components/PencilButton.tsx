import React from 'react';
import { connect } from 'react-redux';
import { selectPencil } from '../containers/Toolbar/duck/actions';
import { StyledButton } from '../assets/styled';

const mapDispatchToProps = {
  selectPencil,
};
type Props = typeof mapDispatchToProps;

const PencilButtonRaw: React.FunctionComponent<Props> = ({ selectPencil }) => {
  return <StyledButton onClick={() => selectPencil()}>PENCIL</StyledButton>;
};

export const PencilButton = connect(
  null,
  mapDispatchToProps
)(PencilButtonRaw);
