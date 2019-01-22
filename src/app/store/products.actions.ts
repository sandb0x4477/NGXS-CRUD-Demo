import { Product } from '../models/product.model';

export class LoadProducts {
  static readonly type = '[PRODUCTS] Load Products';
  constructor() {}
}

export class SelectProduct {
  static readonly type = '[PRODUCTS] Select Product';
  constructor(public payload: Product) {}
}

export class UpdateProduct {
  static readonly type = '[PRODUCTS] Update Product';
  constructor(public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = '[PRODUCTS] Delete Product';
  constructor(public payload: Product) {}
}

export class CreateProduct {
  static readonly type = '[PRODUCTS] Create Product';
  constructor(public payload: Product) {}
}
