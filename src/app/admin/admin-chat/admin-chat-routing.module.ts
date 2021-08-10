import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminChatPage } from './admin-chat.page';

const routes: Routes = [
  {
    path: '',
    component: AdminChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminChatPageRoutingModule {}
