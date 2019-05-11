import { Point } from 'MyModels';
import { RootState } from 'MyTypes';
import React, { createRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { coordProvider } from '../../utils/coordProvider';
import {
  addLine,
  createLine,
  drawing,
  endDrawing,
  startDrawing,
  setDims,
} from './duck/actions';

const mapDispatchToProps = {
  startDrawing,
  drawing,
  endDrawing,
  createLine,
  addLine,
  setDims,
};

const mapStateToProps = ({ canvasReducer, toolbarReducer }: RootState) => ({
  prevPoint: canvasReducer.prevPoint,
  isDrawing: canvasReducer.isDrawing,
  currentLine: canvasReducer.currentLine,
  thickness: toolbarReducer.thickness,
  color: toolbarReducer.color,
  dims: canvasReducer.dims,
  lines: canvasReducer.lines,
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const StyledCanvas = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
`;

const CanvasComponentRaw: React.FunctionComponent<Props> = ({
  isDrawing,
  prevPoint,
  currentLine,
  startDrawing,
  drawing,
  endDrawing,
  createLine,
  addLine,
  thickness,
  color,
  setDims,
  dims,
  lines,
}: Props) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  const canvas = (): HTMLCanvasElement => canvasRef.current!;
  const context = (): CanvasRenderingContext2D => canvas().getContext('2d')!;
  const rect = (): ClientRect => canvas().getBoundingClientRect();

  useEffect(() => {
    const restoreCanvas = () => {
      if (lines.length > 0) {
        lines.forEach((line: Point[]) => {
          line.forEach((point: Point, index: number) => {
            const prevPoint = index > 0 ? line[index - 1] : undefined;
            if (typeof prevPoint !== 'undefined') {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(point.x, point.y);
              ctx.stroke();
            }
          });
        });
      }
    };

    const ctx = context();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas().width, canvas().height);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    restoreCanvas();
  }, [dims]);

  useEffect(() => {
    const handleResize = () =>
      setDims({ width: window.innerWidth, height: window.innerHeight * 0.8 });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStartDrawing = (event: MouseEvent | TouchEvent) => {
    const [offsetX, offsetY] = coordProvider(event, rect());
    const ctx = context();
    ctx.strokeStyle = color ? color : '#BADA55';
    ctx.lineWidth = thickness ? thickness : 2;
    startDrawing({ x: offsetX, y: offsetY });
  };
  const handleStopDrawing = (event: MouseEvent | TouchEvent): void => {
    const [offsetX, offsetY] = coordProvider(event, rect());
    endDrawing({ x: offsetX, y: offsetY });
    if (currentLine.length > 0) {
      addLine(currentLine);
    }
  };
  // Drawing function
  const draw = (event: MouseEvent | TouchEvent): void => {
    const ctx = context();
    if (isDrawing) {
      const [offsetX, offsetY] = coordProvider(event, rect());
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      // Dispatch store actions with data
      const newPoint: Point = { x: offsetX, y: offsetY };
      drawing(newPoint);
      createLine(newPoint);
    }
  };

  return (
    <StyledCanvas
      height={dims.height}
      width={dims.width}
      ref={canvasRef}
      onMouseDown={handleStartDrawing}
      onMouseMove={draw}
      onMouseUp={handleStopDrawing}
      onMouseLeave={handleStopDrawing}
      onTouchStart={handleStartDrawing}
      onTouchMove={draw}
      onTouchEnd={handleStopDrawing}
      onTouchCancel={handleStopDrawing}
    />
  );
};

export const CanvasComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasComponentRaw);
