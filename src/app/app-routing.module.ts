import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        data: {
          meta: {
            title: 'Authorize YourSelf',
            description: 'AF Kart'
          }
        }
      },
      {
        path: 'product',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        data: {
          meta: {
            title: 'Product Details',
            description: 'AF Kart'
          }
        }
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
