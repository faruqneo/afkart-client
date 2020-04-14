import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatToolbarModule, 
    MatMenuModule, 
    MatGridListModule, 
    MatIconModule, 
    MatTooltipModule
  ]
})
export class MetarialModule { }
