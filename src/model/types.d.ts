declare module 'MyModels' {
   export interface Point {
       x: number,
       y: number
   }

   export interface Line {
        points: Array<Point>
   }
}
