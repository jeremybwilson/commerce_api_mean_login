import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../../models';
import { ProductService, MessageService } from '../../services';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css', '../product.css']
})
export class ProductEditComponent implements OnInit {

  @Input()
  product: Product;
  products: Product[] = [];
  selectedProduct: Product;
  errors: string[] = [];

  @Output()
  updateProduct = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
    this.getProduct();
  }

  onEvent(event: Event): void {
    event.stopPropagation();
  }

  onReset(event: Event, form: NgForm) {
    event.preventDefault();
    this.errors = [];
    form.reset();
  }

  getProduct(): void {
    this.route.paramMap
      .subscribe((params) => {
        const id = params.get('id');
        this.productService.getProduct(id)
          .subscribe(product => this.product = product);
      });
  }

  editProduct(product: Product): void {
    console.log(`got a request to update a product`, product);
    this.productService.updateProduct(product)
      .subscribe(data => {
        this.messageService.clear();
        this.router.navigateByUrl('products');
        console.log(`updateProduct() subscription got edited author`, data);
      }, error => {
        this.messageService.add(error.error);
        console.log('updateProduct() at product-edit.component.ts received error from DB: ', error);
      }
      );
  }

  onDelete(_id: number): void {
    console.log(`deleting the id: ${_id}`);
    this.productService.deleteProduct(_id)
    .subscribe(data => {
      console.log('removed product', data);
      this.products = this.products.filter(product => product._id !== data._id);
    });
  }

  deleteProduct(_id: number): void {
    this.selectedProduct = null;
    this.productService.deleteProduct(_id)
      .subscribe(data => {
      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index]._id === data._id) {
        this.products.splice(index, 1);
        }
      }
    });
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('form submitted', this.product);
    console.log('form submitted', form.value);
    this.updateProduct.emit(form.value);  // can either do form.value or this.product
    form.reset();
  }

}
