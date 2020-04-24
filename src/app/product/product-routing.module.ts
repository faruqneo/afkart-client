import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductComponent} from './product/product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        data: {
            meta: {
                title: 'Product',
                description: 'AF Kart'
            }
        }
    },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProductRoutingModule {}