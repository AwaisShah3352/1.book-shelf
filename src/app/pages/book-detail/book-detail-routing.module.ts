import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {AppLauncher} from "@ionic-native/app-launcher/ngx";
import { BookDetailPage } from './book-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BookDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [AppLauncher]
})
export class BookDetailPageRoutingModule {}
