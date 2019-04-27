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

const mapStateToProps = ( { canvasReducer } : RootState) => ({
  prevPoint: canvasReducer.prevPoint,
  isDrawing: canvasReducer.isDrawing,
  currentLine: canvasReducer.currentLine,
  lines: canvasReducer.lines
})

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const StyledCanvas = styled.canvas`
  border: 1px solid black;
`

const CanvasComponentRaw : React.FunctionComponent<Props> = ( {isDrawing, prevPoint, currentLine, lines, startDrawing, drawing, endDrawing, createLine, addLine} : Props) => {
  let canvasRef = createRef<HTMLCanvasElement>();

  const canvas = () : HTMLCanvasElement => canvasRef.current!;
  const context = () : CanvasRenderingContext2D => canvas().getContext('2d')!;
  
  const handleStartDrawing = (event: MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent
    startDrawing({x: offsetX, y: offsetY});
    // Part of config current drawn line    
    const ctx = context()
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
  }
  const handleStopDrawing = (event: MouseEvent) : void => {
    const {offsetX, offsetY} = event.nativeEvent
    endDrawing({x: offsetX, y: offsetY})
    if(currentLine.length > 0)
      addLine(currentLine)
  }
   // Drawing function
  const draw = (event: MouseEvent) : void => {
    let ctx = context();
    if(isDrawing){
      const { offsetX, offsetY } = event.nativeEvent
      // Drawing on 2d context @TODO export it to function with @params { color: String, thickness: number }
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
  const renderCanvas = (event: MouseEvent) : void => {
    const ctx = context();
    ctx.fillStyle = "#FFF"
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    lines.forEach((line : Array<Point>) => {
      line.forEach((point: Point, index: number) => {
        let prevPoint = index > 0 ? line[index-1] : undefined
        if(typeof prevPoint !== 'undefined'){
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
        }
      })
    })
  }
  

  return (
    <StyledCanvas 
    ref={canvasRef} 
    width={window.innerWidth - 50} 
    height={window.innerHeight - 50}
    onMouseDown={handleStartDrawing}
    onMouseMove={draw}
    onMouseUp={handleStopDrawing}
    onMouseLeave={handleStopDrawing}
  />
  )
}

export const CanvasComponent = connect(mapStateToProps, mapDispatchToProps)(CanvasComponentRaw)
