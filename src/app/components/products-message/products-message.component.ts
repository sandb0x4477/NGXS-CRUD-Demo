import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-message',
  templateUrl: './products-message.component.html',
  styleUrls: ['./products-message.component.css']
})
export class ProductsMessageComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
