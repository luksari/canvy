import React, { Component, RefObject, createRef, MouseEvent } from 'react'
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { Point } from 'MyModels';
import { startDrawing, drawing, endDrawing, createLine, addLine } from './duck/actions';

interface stateFromProps {
  prevPoint: Point,
  isDrawing: boolean,
  currentLine: Array<Point>,
  lines: Array<Array<Point>>
}
interface dispachFromProps {
  startDrawing: (point: Point) => void
  drawing: (point: Point) => void,
  endDrawing: (point: Point) => void,
  createLine: (point: Point) => void,
  addLine: (line: Array<Point>) => void,
}

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


type Props = stateFromProps & dispachFromProps;

class CanvasComponentRaw extends Component<Props, {}> {
  private canvasRef : RefObject<HTMLCanvasElement>

  constructor(props : Props){
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
  }

  canvas = () : HTMLCanvasElement => this.canvasRef.current!
  ctx = () : CanvasRenderingContext2D => this.canvas().getContext('2d')!
  
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  // Function responsible for rendering current state of Canvas
  renderCanvas = (event: MouseEvent) : void => {
    const { lines } = this.props

    const ctx = this.ctx();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FFF"
    ctx.fillRect(0, 0, this.canvasRef.current!.width, this.canvasRef.current!.height);
    // lines.forEach((line : Array<Point>) => {
    //   ctx.beginPath();
    //   line.forEach((point: Point, index: number) => {
    //     let nextPoint = (index < line.length-1) ? line[index+1] : undefined
    //     if(typeof nextPoint !== 'undefined'){
    //       ctx.moveTo(point.x, point.y)
    //       console.log('MOVE TO: ',JSON.stringify(point));
    //       ctx.lineTo(nextPoint.x, nextPoint.y)
    //       console.log('LINE TO: ',JSON.stringify(nextPoint));
    //     }
    //   })
    //   console.log("NEW LINE")
    //   ctx.stroke()
    // })

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(25, 25)
    ctx.moveTo(100, 100)
    ctx.lineTo(125, 125)
    ctx.stroke()
  }
  // Drawing function
  draw = (event: MouseEvent) : void => {
    let ctx = this.ctx();
    const { prevPoint, drawing, createLine, isDrawing } = this.props
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
  handleStopDrawing = (event: MouseEvent) : void => {
    const {offsetX, offsetY} = event.nativeEvent
    const {endDrawing, addLine, currentLine, isDrawing} = this.props
    endDrawing({x: offsetX, y: offsetY})
    if(currentLine.length > 0)
      addLine(currentLine)
  }
  handleStartDrawing = (event: MouseEvent) : void => {
    const { offsetX, offsetY } = event.nativeEvent
    const { startDrawing } = this.props
    startDrawing({x: offsetX, y: offsetY});
    // Part of config current drawn line    
    const ctx = this.ctx()
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

  }
  render() {
    const {canvasRef, handleStartDrawing, handleStopDrawing, draw, renderCanvas} = this
    return (
      <>
        <canvas 
          ref={canvasRef} 
          width={window.innerWidth - 50} 
          height={window.innerHeight - 50}
          onMouseDown={handleStartDrawing}
          onMouseMove={draw}
          onMouseUp={handleStopDrawing}
          // onMouseLeave={handleStopDrawing}
        />
        <button onClick={renderCanvas}>REFRESH</button>
      </>
    )
  }
}

export const CanvasComponent = connect<stateFromProps, dispachFromProps, void>(mapStateToProps, mapDispatchToProps)(CanvasComponentRaw)
