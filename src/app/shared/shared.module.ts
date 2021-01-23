import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { MenuButtonComponent } from './menu-button/menu-button.component'


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [
    MenuButtonComponent,
  ],
  exports: [
    MenuButtonComponent,
  ]
})
export class SharedModule { }
