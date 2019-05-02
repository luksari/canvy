import { MouseEvent, TouchEvent } from 'react'

export const eventParser = (event : MouseEvent | TouchEvent) : Array<number> => {
    if(event instanceof MouseEvent){
      const mEvent = event as MouseEvent
      return [mEvent.nativeEvent.offsetX, mEvent.nativeEvent.offsetY]
    }
    else if(event instanceof TouchEvent){
      const tEvent = event as TouchEvent
      return [tEvent.touches[0].clientX, tEvent.touches[0].clientY]
    }
    return [0,0]
}