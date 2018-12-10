import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromProducts from '../products';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // redirectTo: 'products',
    // pathMatch: 'full'
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: fromProducts.ProductListComponent,
      },
      {
        path: 'new',
        component: fromProducts.ProductNewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: fromProducts.ProductDetailComponent,
      },
      {
        path: ':id/edit',
        component: fromProducts.ProductEditComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
