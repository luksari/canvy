import React, { createRef, MouseEvent } from 'react'
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { Point } from 'MyModels';
import { startDrawing, drawing, endDrawing, createLine, addLine } from './duck/actions';
import styled from 'styled-components';

const mapDispatchToProps = {
  startDrawing,
  drawing,
  endDrawing,
  createLine,
  addLine
}

const mapStateToProps = ( { canvasReducer, toolbarReducer} : RootState) => ({
  prevPoint: canvasReducer.prevPoint,
  isDrawing: canvasReducer.isDrawing,
  currentLine: canvasReducer.currentLine,
  thickness: toolbarReducer.thickness,
  color: toolbarReducer.color
})

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const StyledCanvas = styled.canvas`
  border: 1px solid black;
  width: 100vw;
  height: 80vh;
`

const CanvasComponentRaw : React.FunctionComponent<Props> = ( {isDrawing, prevPoint, currentLine, startDrawing, drawing, endDrawing, createLine, addLine, thickness, color} : Props) => {
  let canvasRef = createRef<HTMLCanvasElement>();

  const canvas = () : HTMLCanvasElement => canvasRef.current!;
  const context = () : CanvasRenderingContext2D => canvas().getContext('2d')!;
  
  const handleStartDrawing = (event: MouseEvent | TouchEvent) => {
    const { offsetX, offsetY } = event.nativeEvent
    startDrawing({x: offsetX, y: offsetY});
    // Part of config current drawn line    
    const ctx = context()
    ctx.strokeStyle = color ? color : '#BADA55' ;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = thickness ? thickness : 2;
  }
  const handleStopDrawing = (event:  MouseEvent | TouchEvent) : void => {
    const {offsetX, offsetY} = event.nativeEvent
    endDrawing({x: offsetX, y: offsetY})
    if(currentLine.length > 0)
      addLine(currentLine)
  }
   // Drawing function
  const draw = (event: MouseEvent | TouchEvent) : void => {
    let ctx = context();
    let [offsetX, offsetY] : Array<any> = [undefined, undefined]
    if(event instanceof MouseEvent){
      const mEvent = event as MouseEvent
      [offsetX, offsetY] = [mEvent.nativeEvent.offsetX, mEvent.nativeEvent.offsetY]
    }
    else if(event instanceof TouchEvent){
      const tEvent = event as TouchEvent
      [offsetX, offsetY] = [tEvent.touches[0].clientX, tEvent.touches[0].clientY]
    }
    if(isDrawing && offsetX !== undefined && offsetY !== undefined){
      ctx.beginPath()
      ctx.moveTo(prevPoint.x, prevPoint.y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke();
      // Dispatch store actions with data 
      let newPoint : Point = {x: offsetX, y: offsetY}
      drawing(newPoint)
      createLine(newPoint)
    } 
  }
 
  return (
    <StyledCanvas
    height={window.innerHeight}
    width={window.innerWidth} 
    ref={canvasRef} 
    onMouseDown={handleStartDrawing}
    onMouseMove={draw}
    onMouseUp={handleStopDrawing}
    onMouseLeave={handleStopDrawing}
    // onTouchStart={handleStartDrawing}
    // onTouchMove={draw}
    // onTouchEnd={handleStopDrawing}
    // onTouchCancel={handleStopDrawing}

  />
  )
}

export const CanvasComponent = connect(mapStateToProps, mapDispatchToProps)(CanvasComponentRaw)
