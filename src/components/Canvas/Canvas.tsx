import React, { Component, RefObject, createRef, MouseEvent } from 'react'
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import { canvasActions } from './duck';
import { Point } from 'MyModels';


const mapDispatchToProps = {
  startDrawing: canvasActions.startDrawing,
  drawing: canvasActions.drawing,
  endDrawing: canvasActions.endDrawing
}

const mapStateToProps = (state: RootState) => ({
  prevPoint: state.canvasReducer.prevPoint,
  isDrawing: state.canvasReducer.isDrawing
})


type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type State = {

}


class CanvasComponentRaw extends Component<Props, State> {
  private canvasRef : RefObject<HTMLCanvasElement>

  constructor(props : Props){
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
  }

  canvas = () : HTMLCanvasElement => this.canvasRef.current!
  ctx = () : CanvasRenderingContext2D => this.canvas().getContext('2d')!
  
  componentDidMount() {
    this.updateCanvas();
    const ctx = this.ctx()
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas = () : void => {
    
  }
  draw = (event: MouseEvent) : void => {
    let ctx = this.ctx();
    if(this.props.isDrawing){
      const {offsetX, offsetY} = event.nativeEvent
      const {prevPoint} = this.props
      ctx.beginPath()
      ctx.moveTo(prevPoint.x, prevPoint.y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke();
      let newPoint : Point = {x: offsetX, y: offsetY}
      this.props.drawing(newPoint)
    }


  }
  render() {
    return (
      <canvas 
        ref={this.canvasRef} 
        width={300} 
        height={300}
        onMouseDown={(event: MouseEvent) => {this.props.startDrawing()}}
        onMouseMove={(event: MouseEvent) => {this.draw(event)}}
        onMouseUp={(event: MouseEvent) => {this.props.endDrawing()}}         
        onMouseLeave={(event: MouseEvent) => {this.props.endDrawing()}}
        ></canvas>
    )
  }
}

export const CanvasComponent = connect(mapStateToProps, mapDispatchToProps)(CanvasComponentRaw)
