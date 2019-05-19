import React from 'react';
import { RootAction } from 'MyTypes';
import { connect } from 'react-redux';

const mapDispatchToProps = (action: RootAction) => {};
type Props = ReturnType<typeof mapDispatchToProps>;

const PencilButtonRaw: React.FunctionComponent<Props> = ({}) => {
  return <button />;
};

export const PencilButton = connect(
  null,
  mapDispatchToProps
)(PencilButtonRaw);
