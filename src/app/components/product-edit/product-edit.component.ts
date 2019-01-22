import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<Product>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      id: null,
      name: null,
    });
  }

  submit() {
    this.submitEvent.emit(this.productForm.getRawValue());
  }

  resetForm() {
    this.productForm.reset();
  }
}
