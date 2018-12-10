import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from '../../models';
import { ProductService, MessageService } from '../../services';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css', '../product.css']
})
export class ProductNewComponent implements OnInit {

  product = new Product();

  @Output()
  createProduct = new EventEmitter<Product>();

  // constructor(private _httpService: HttpService) {}
  constructor(
    private productService: ProductService,
    private readonly router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('form submitted', this.product);
    console.log('form submitted', form.value);
    this.productService.createProduct(this.product)
      .subscribe(newProduct => {
        this.messageService.clear();
        this.createProduct.emit(this.product);  // can either do form.value or this.product
        this.product = new Product();
        form.reset();
        console.log('new product created', newProduct);
        this.router.navigateByUrl('/');
      }, error => {
        this.messageService.add(error.error);
        console.log('onSubmit() at product-new.component.ts received an error from the DB: ', error);
      });
  }

}
