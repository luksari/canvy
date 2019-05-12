import React from 'react';
import { RootState } from 'MyTypes';
import { connect } from 'react-redux';
import { resetCanvas } from '../containers/Toolbar/duck/actions';

const mapDispatchToProps = {
  resetCanvas,
};

type Props = typeof mapDispatchToProps;

const ResetButtonRaw: React.FunctionComponent<Props> = ({ resetCanvas }) => {
  return (
    <button
      onClick={() => {
        resetCanvas(true);
      }}
    >
      Reset
    </button>
  );
};

export const ResetButton = connect(
  null,
  mapDispatchToProps
)(ResetButtonRaw);
