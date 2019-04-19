import React, { Component, RefObject } from 'react'

type Props = {
  width?: number,
  height?: number
}

type State = {

}

export default class CanvasComponent extends Component<Props, State> {
  private canvasRef : RefObject<HTMLCanvasElement>

    constructor(props : Props){
      super(props);
      this.canvasRef = React.createRef();
    }
  componentDidMount() {
      this.updateCanvas();
  }
  componentDidUpdate() {
      this.updateCanvas();
  }
  updateCanvas() {
      const canvas = this.canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      ctx!.clearRect(0,0, 300, 300);
  }
    render() {
      return (
        <canvas ref={this.canvasRef} width={300} height={300}></canvas>
      )
    }
}
