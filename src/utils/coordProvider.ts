import { MouseEvent, TouchEvent } from 'react'

export const coordProvider = (event : MouseEvent | TouchEvent, rect: ClientRect) : Array<number> => {
    if(event.type === 'mousedown' || event.type === 'mouseup' || event.type === 'mousemove' || event.type === 'mouseleave'){
      const mEvent = event as MouseEvent
      return [mEvent.nativeEvent.clientX - rect.left, mEvent.nativeEvent.clientY - rect.top]
    }
    else if(event.type === 'touchstart' || event.type === 'touchmove' || event.type === 'touchmove'){
      const tEvent = event as TouchEvent
      return [tEvent.touches[0].clientX - rect.left, tEvent.touches[0].clientY - rect.top]
    }
    return [0,0]
}