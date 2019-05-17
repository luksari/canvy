import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ColorPicker } from '../../components/ColorPicker';
import { ThicknessPicker } from '../../components/ThicknessPicker';
import { selectColor, selectThickness } from './duck/actions';
import { RootState } from 'MyTypes';
import { ResetButton } from '../../components/ResetButton';

const mapStateToProps = ({ toolbarReducer }: RootState) => ({
  color: toolbarReducer.color,
  thickness: toolbarReducer.thickness,
});

const mapDispatchToProps = {
  selectColor,
  selectThickness,
};

type ComponentProps = {
  alternative?: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ComponentProps;

const ToolbarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #f3f3f3;
  z-index: 2;
  box-shadow: 0 0 5px black;
`;

const ToolbarRaw: React.FunctionComponent<Props> = ({ alternative }) => (
  <ToolbarContainer>
    {alternative ? (
      <>
        <p>Dupa Wolowa</p>
      </>
    ) : (
      <>
        <ColorPicker />
        <ThicknessPicker />
        <ResetButton />
      </>
    )}
  </ToolbarContainer>
);

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarRaw);
