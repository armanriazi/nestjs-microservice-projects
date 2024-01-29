export enum AvailableStock {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not_available',
}
export class CartsFromExternal {
  cart_id: string;

  product_variant_id: number;

  quantity: number;

  price: number;

  date_add: Date;

  available_stock: AvailableStock;

  user_id: number;
}

export class CartIdsQuery {
  cart_ids: string;
}
