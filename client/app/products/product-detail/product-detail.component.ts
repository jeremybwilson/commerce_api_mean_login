import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css', '../product.css']
})
export class ProductDetailComponent implements OnInit {

  @Input()
  product: Product;

  products: Product[] = [];
  selectedProduct: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.productService.getProduct(id))
    ).subscribe(product => (this.product = product));
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
