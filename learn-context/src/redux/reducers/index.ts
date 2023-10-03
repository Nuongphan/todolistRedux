import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { CartReducer } from "./CartReducer";
import { SearchReducer } from "./searchReducer";

export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  search: SearchReducer
});
