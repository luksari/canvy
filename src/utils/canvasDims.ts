import { Dimensions } from 'MyModels';

export const calculateDefaultDims = (): Dimensions => ({
  width: window.innerWidth,
  height: window.innerHeight * 0.8,
});
