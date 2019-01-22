import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ProductState } from '../store/products.state';
import { Product } from '../models/product.model';
import { LoadProducts, SelectProduct, UpdateProduct, DeleteProduct, CreateProduct } from '../store/products.actions';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="row">
      <div class="col-12">
        <app-products-message [message]="message$ | async"></app-products-message>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <app-products-table [products]="products$ | async" (edit)="onEdit($event)" (delete)="onDelete($event)">
        </app-products-table>
      </div>
      <div class="col-6">
        <app-product-edit (submitEvent)="onSubmit($event)"></app-product-edit>
      </div>
    </div>
  `,
  styles: [``],
})
export class ProductPageComponent implements OnInit {
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  @Select(ProductState.loading) loading$: Observable<boolean>;
  @Select(ProductState.selectedProduct) selectedProduct$: Observable<Product>;
  @Select(ProductState.message) message$: Observable<Product>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadProducts());
  }

  onEdit(payload: Product) {
    this.store.dispatch(new SelectProduct(payload));
  }

  onSubmit(payload: Product) {
    if (payload.id === null) {
      this.store.dispatch(new CreateProduct(payload));
    } else {
      this.store.dispatch(new UpdateProduct(payload));
    }
  }

  onDelete(payload: Product) {
    this.store.dispatch(new DeleteProduct(payload));
  }
}
