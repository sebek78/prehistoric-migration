import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomepageRoutingModule } from './homepage-routing.module';

import { HomepageComponent } from './homepage.component';
import { TribeButtonComponent } from './tribe-button/tribe-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManualComponent } from './manual/manual.component';



@NgModule({
  declarations: [
    HomepageComponent,
    TribeButtonComponent,
    NotFoundComponent,
    ManualComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomepageRoutingModule
  ],
  exports:[
    HomepageComponent,
  ],
})
export class HomepageModule { }
