import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailPageRoutingModule } from './book-detail-routing.module';
import {RatingComponent} from './rating/rating.component';
import { BookDetailPage } from './book-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookDetailPageRoutingModule
  ],
  entryComponents: [RatingComponent],
  declarations: [BookDetailPage, RatingComponent]
})
export class BookDetailPageModule {}
