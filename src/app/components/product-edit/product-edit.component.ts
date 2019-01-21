import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
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
    console.log(this.productForm.value);
  }
}
