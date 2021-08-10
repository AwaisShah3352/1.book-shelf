import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerChatPage } from './owner-chat.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerChatPageRoutingModule {}
