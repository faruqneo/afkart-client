import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MetarialModule } from '../metarial.module';
import {ProductComponent} from './product/product.component';
import {ProductRoutingModule} from './product-routing.module';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MetarialModule,
        ProductRoutingModule
    ]
})
export class ProductModule {}