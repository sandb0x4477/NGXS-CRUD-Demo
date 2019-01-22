import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  @Input() products: Product[];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {}

  editProduct(product: Product) {
    this.edit.emit(product);
  }

  deleteProduct(product: Product) {
    this.delete.emit(product);
  }
}
