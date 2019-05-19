import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ColorPicker } from '../../components/ColorPicker';
import { ThicknessPicker } from '../../components/ThicknessPicker';
import { selectColor, selectThickness } from './duck/actions';
import { RootState } from 'MyTypes';
import { ResetButton } from '../../components/ResetButton';
import { PencilButton } from '../../components/PencilButton';
import { EraseButton } from '../../components/EraseButton';

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

const ToolbarContainer = styled.div<ComponentProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: ${props =>
    props.alternative === true
      ? props.theme.colors.primary
      : props.theme.colors.gray};
  z-index: 2;
  box-shadow: 0 0 5px black;
`;

const ToolbarRaw: React.FunctionComponent<Props> = ({ alternative }) => (
  <>
    {alternative ? (
      <ToolbarContainer alternative>
        <PencilButton />
        <EraseButton />
      </ToolbarContainer>
    ) : (
      <ToolbarContainer>
        <ColorPicker />
        <ThicknessPicker />
        <ResetButton />
      </ToolbarContainer>
    )}
  </>
);

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarRaw);
