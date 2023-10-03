import { IProduct } from "../Type";

const initialState: IProduct[] = [];
export const SearchReducer = (
  state: IProduct[] = initialState,
  action: any
) => {
  switch (action.type) {
    case "ADD":
      state = [...action.payload];
      return state;
  }
  return state;
};
