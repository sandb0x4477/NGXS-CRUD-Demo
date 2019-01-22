import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import {
  LoadProducts,
  SelectProduct,
  UpdateProduct,
  DeleteProduct,
  CreateProduct,
} from './products.actions';
import { Product } from '../models/product.model';
import { ApiService } from '../services/api.service';

export interface ProductsStateModel {
  loading: boolean;
  products: Product[];
  selectedProduct: Product;
  message: string;
  productForm: {};
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    loading: false,
    products: [],
    selectedProduct: {
      id: 0,
      name: '',
    },
    message: 'No messages',
    productForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
export class ProductState {
  constructor(private apiService: ApiService) {}

  @Selector()
  public static getState(state: ProductsStateModel) {
    return state;
  }

  @Selector()
  public static loading(state: ProductsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  public static getProducts(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector()
  public static selectedProduct(state: ProductsStateModel): Product {
    return state.selectedProduct;
  }

  @Selector()
  public static message(state: ProductsStateModel): string {
    return state.message;
  }

  @Action(LoadProducts)
  public loadProducts({ setState, patchState }: StateContext<ProductsStateModel>) {
    patchState({ loading: true });
    return this.apiService.getProducts().pipe(
      tap((result: Product[]) => {
        patchState({
          products: result,
          loading: false,
          message: 'Products loaded succesfully',
        });
      })
    );
  }

  @Action(SelectProduct)
  public selectProduct(
    { setState, patchState, getState }: StateContext<ProductsStateModel>,
    { payload }: SelectProduct
  ) {
    const state = getState();
    patchState({
      selectedProduct: payload,
      message: `Product #${payload.id} selected`,
      productForm: { ...state.productForm, model: payload, dirty: false },
    });
  }

  @Action(UpdateProduct)
  public updateProduct(
    { setState, patchState, getState }: StateContext<ProductsStateModel>,
    { payload }: UpdateProduct
  ) {
    const state = getState();
    patchState({ loading: true });
    return this.apiService.updateProduct(payload).pipe(
      tap((result: Product) => {
        const productArray = state.products.map(p => {
          if (p.id === payload.id) {
            return payload;
          }
          return p;
        });
        patchState({
          loading: false,
          message: 'Product updated succesfully',
          products: productArray,
          productForm: { ...state.productForm, dirty: false },
        });
      })
    );
  }

  @Action(CreateProduct)
  public createProduct(
    { setState, patchState, getState }: StateContext<ProductsStateModel>,
    { payload }: CreateProduct
  ) {
    const state = getState();
    patchState({ loading: true });
    return this.apiService.createProduct(payload).pipe(
      tap((result: Product) => {
        patchState({
          loading: false,
          message: 'Product created succesfully',
          products: [...state.products, result],
          productForm: { ...state.productForm, dirty: false },
        });
      })
    );
  }

  @Action(DeleteProduct)
  public deleteProduct(
    { setState, patchState, getState }: StateContext<ProductsStateModel>,
    { payload }: DeleteProduct
  ) {
    const state = getState();
    patchState({ loading: true });
    return this.apiService.deleteProduct(payload).pipe(
      tap((result: Product) => {
        const productArray = state.products.filter(p => p.id !== payload.id);
        patchState({
          loading: false,
          message: `Product #${payload.id} deleted`,
          products: productArray,
          selectedProduct: null,
          productForm: { ...state.productForm, dirty: false, model: { id: null, name: null } },
        });
      })
    );
  }
}
