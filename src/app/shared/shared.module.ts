import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { MenuButtonComponent } from './menu-button/menu-button.component';
import { DialogComponent } from './dialog/dialog.component'


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [
    MenuButtonComponent,
    DialogComponent,
  ],
  exports: [
    MenuButtonComponent,
    DialogComponent
  ]
})
export class SharedModule { }
