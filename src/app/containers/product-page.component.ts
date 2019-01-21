import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="row">
      <div class="col-12"><app-products-message></app-products-message></div>
    </div>
    <div class="row">
      <div class="col-6"><app-products-table></app-products-table></div>
      <div class="col-6"><app-product-edit></app-product-edit></div>
    </div>
  `,
  styles: [``],
})
export class ProductPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
