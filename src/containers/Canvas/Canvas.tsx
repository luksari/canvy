import { Point } from 'MyModels'
import { RootState } from 'MyTypes'
import React, { createRef, MouseEvent, TouchEvent, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { coordProvider } from '../../utils/coordProvider'
import {
  addLine,
  createLine,
  drawing,
  endDrawing,
  startDrawing,
} from './duck/actions'

const mapDispatchToProps = {
  startDrawing,
  drawing,
  endDrawing,
  createLine,
  addLine,
}

const mapStateToProps = ({ canvasReducer, toolbarReducer }: RootState) => ({
  prevPoint: canvasReducer.prevPoint,
  isDrawing: canvasReducer.isDrawing,
  currentLine: canvasReducer.currentLine,
  thickness: toolbarReducer.thickness,
  color: toolbarReducer.color,
})

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 80vh;
  position: relative;
`

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
}: Props) => {
  const canvasRef = createRef<HTMLCanvasElement>()

  const canvas = (): HTMLCanvasElement => canvasRef.current!
  const context = (): CanvasRenderingContext2D => canvas().getContext('2d')!
  const rect = (): ClientRect => canvas().getBoundingClientRect()

  useEffect(() => {
    context().fillStyle = '#FFFFFF'
    context().fillRect(0, 0, canvas().width, canvas().height)
  }, [])
  const handleStartDrawing = (event: MouseEvent | TouchEvent) => {
    const [offsetX, offsetY] = coordProvider(event, rect())
    startDrawing({ x: offsetX, y: offsetY })
    // Part of config current drawn line
    const ctx = context()
    ctx.strokeStyle = color ? color : '#BADA55'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = thickness ? thickness : 2
  }
  const handleStopDrawing = (event: MouseEvent | TouchEvent): void => {
    const [offsetX, offsetY] = coordProvider(event, rect())
    endDrawing({ x: offsetX, y: offsetY })
    if (currentLine.length > 0) {
      addLine(currentLine)
    }
  }
  // Drawing function
  const draw = (event: MouseEvent | TouchEvent): void => {
    const ctx = context()
    if (isDrawing) {
      const [offsetX, offsetY] = coordProvider(event, rect())
      ctx.beginPath()
      ctx.moveTo(prevPoint.x, prevPoint.y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
      // Dispatch store actions with data
      const newPoint: Point = { x: offsetX, y: offsetY }
      drawing(newPoint)
      createLine(newPoint)
    }
  }

  return (
    <StyledCanvas
      height={window.innerHeight * 0.8}
      width={window.innerWidth}
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
  )
}

export const CanvasComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasComponentRaw)
