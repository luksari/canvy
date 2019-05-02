export const eventParser = (event : T) => {
    let [offsetX, offsetY] : Array<any> = [undefined, undefined]
    if(event instanceof MouseEvent){
      const mEvent = event as MouseEvent
      [offsetX, offsetY] = [mEvent.nativeEvent.offsetX, mEvent.nativeEvent.offsetY]
    }
    else if(event instanceof TouchEvent){
      const tEvent = event as TouchEvent
      [offsetX, offsetY] = [tEvent.touches[0].clientX, tEvent.touches[0].clientY]
    }
}