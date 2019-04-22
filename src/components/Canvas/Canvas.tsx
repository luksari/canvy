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
    
    const ctx = this.ctx()
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
  }
  componentDidUpdate() {
   
  }
  // Function responsible for rendering current state of Canvas
  renderCanvas = ({ lines } : Props) : void => {
    const ctx = this.ctx();
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, this.canvasRef.current!.width, this.canvasRef.current!.height);
  }
  // Drawing function
  draw = (event: MouseEvent) : void => {
    let ctx = this.ctx();
    const { prevPoint, drawing, createLine, isDrawing, currentLine } = this.props
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
    if(!isDrawing && currentLine.length > 0)
      addLine(currentLine)
  }
  render() {
    return (
      <canvas 
        ref={this.canvasRef} 
        width={300} 
        height={300}
        onMouseDown={(event: MouseEvent) => {this.props.startDrawing({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY})}}
        onMouseMove={(event: MouseEvent) => {this.draw(event)}}
        onMouseUp={this.handleStopDrawing}
        onMouseLeave={this.handleStopDrawing}
          
        ></canvas>
    )
  }
}

export const CanvasComponent = connect<stateFromProps, dispachFromProps, void>(mapStateToProps, mapDispatchToProps)(CanvasComponentRaw)
