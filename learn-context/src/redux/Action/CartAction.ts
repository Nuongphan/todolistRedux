import { IProduct } from "../Type";

export const increaseCart = () => {
  return { type: "INCREASE"};
};
export const decreaseCart = () => {
  return { type: "DECREASE" };
};
