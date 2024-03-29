import {MenuItem} from "./interface/menu-item";

export interface CartItem extends MenuItem {
  quantity: number;
};
