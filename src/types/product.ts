export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  decreaseItem: (id: number) => void
  removeItem: (id: number) => void
  clear: () => void
  total: () => number
}
