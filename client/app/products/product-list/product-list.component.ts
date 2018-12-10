import { Component, OnInit } from '@angular/core';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../product.css']
})
export class ProductListComponent implements OnInit {
  title = 'Product List';

  products: Product[] = [];
  selectedProduct: Product;
  filter: Product = new Product();

  constructor(private productService: ProductService ) { }

  ngOnInit() {
    this.getProducts();
    console.log(`getting the products`, this.productService);
  }

  onSelect(product: Product): void {
    console.log('selected', product);
    this.selectedProduct = this.selectedProduct === product ? null : product;

  }

  clearFilter(): void {
    this.filter = new Product();
  }

  onCreate(product: Product): void {
    this.productService.createProduct(product)
    .subscribe(data => {
      console.log(data);
      this.products = [...this.products, data];
    });
  }

  onDelete(_id: number): void {
    console.log(`deleting the id: ${_id}`);
    this.productService.deleteProduct(_id)
    .subscribe(data => {
      console.log('removed product', data);
      this.products = this.products.filter(product => product._id !== data._id);
    });
  }

  onEvent(event: Event): void {
    console.log('eventing');
    event.stopPropagation();
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => {
      this.products = products;
      console.log('these products are back from subscription', products);
    });
  }

  getProduct(product: Product): void {
    this.selectedProduct = this.selectedProduct === product ? null : product;
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

}
